<template>
  <imp-panel>
    <div slot="header" class="box-header" style="width: 100%;">
      <el-row :gutter="10">
        <el-col :sm="24" :md="6">
          <el-input v-model="input" placeholder="任务名称" @keyup.enter.native="codeSearch" />
        </el-col>
        <el-col :sm="24" :md="9">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </el-col>
        <el-col :sm="24" :md="9">
          <el-button @click="HiveMetaStore">全量采集HIVE</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addTaskBtn">新建</el-button>
          <el-button type="primary" @click="btnBatchEnable">启用</el-button>
          <el-button type="primary" @click="btnBatchEnable">禁用</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row slot="body" style="margin-bottom: 0px;">
      <el-col :span="24">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          max-height="500"
          style="width: 100%;height:100%"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          />
          <el-table-column
            prop="taskName"
            label="任务名称"
            width="150"
            align="center"
          />
          <el-table-column
            prop="dataSourceName"
            label="数据源名称"
            width="150"
            align="center"
          />
          <el-table-column
            prop="taskType"
            label="采集方式"
            width="150"
            align="center"
          >
            <template slot-scope="scope">{{ taskType[scope.row.taskType] }}</template>
          </el-table-column>
          <el-table-column
            prop="lastExcuteTime"
            sortable
            label="最后执行时间"
            align="center"
          />
          <el-table-column
            prop="nextExcuteTime"
            sortable
            label="下次执行时间"
            align="center"
          />
          <el-table-column label="操作" width="280" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="runTask(scope.$index, scope.row)"
              >立即执行</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="enableTaskStatus(scope.$index, scope.row)"
              >{{ scope.row.startUse?"禁用":"启用" }}</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--添加任务-->
        <el-dialog title="添加任务" :visible.sync="formAddTaskVisible" width="600px">
          <el-form ref="addTask" :model="formAddTask" :rules="rules">
            <el-form-item label="数据源名称" :label-width="formLabelWidth" prop="dataSourceName">
              <el-select
                v-model="formAddTask.dataSourceName"
                placeholder="选择数据源"
                filterable
                @change="selectChange"
              >
                <el-option
                  v-for="(item, index) in dataSourceList"
                  :key="index"
                  :value="item.dbAlias"
                  :label="item.dbAlias"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="任务名称" :label-width="formLabelWidth" prop="taskName">
              <el-input v-model="formAddTask.taskName" autocomplete="off" placeholder="请输入任务名称" />
            </el-form-item>
            <el-form-item label="采集方式" :label-width="formLabelWidth" prop="taskType">
              <el-radio-group v-model="taskType[formAddTask.taskType]">
                <el-radio label="全量" />
                <el-radio label="增量" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="开启调度" :label-width="formLabelWidth" prop="schedule">
              <el-switch v-model="formAddTask.schedule" />
            </el-form-item>
            <el-form-item label="cron表达式" label-width="120px" :inline="true">
              <el-input v-model="formAddTask.cronExp" placeholder="请输入cron表达式" />
              <br>
              <el-button size="mini" type="primary">测试</el-button><span>帮助</span>
            </el-form-item>
            <el-form-item label="生效日期" :label-width="formLabelWidth">
              <el-date-picker
                v-model="formAddTask.effectiveDate"
                type="datetime"
                placeholder="生效日期"
                default-time="12:00:00"
              />
            </el-form-item>
            <el-form-item label="失效日期" :label-width="formLabelWidth">
              <el-date-picker
                v-model="formAddTask.expiryDate"
                type="datetime"
                placeholder="失效日期"
                default-time="12:00:00"
              />
            </el-form-item>
            <el-form-item label="重试" :label-width="formLabelWidth">
              <el-switch v-model="formAddTask.retry" />
              <div>(执行任务失败后进行重试操作)</div>
            </el-form-item>
            <el-form-item label="重试次数" :label-width="formLabelWidth">
              <el-input v-model="formAddTask.retryTimes" autocomplete="off" />
            </el-form-item>
            <el-form-item label="间隔时间" :label-width="formLabelWidth">
              <el-input v-model="formAddTask.intervalTime" autocomplete="off">
                <template slot="append">分钟</template>
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submitFormTask('addTask')">确 定</el-button>
          </div>
        </el-dialog>
        <!--编辑-->
        <el-dialog title="修改任务" :visible.sync="formEditVisible" width="600px">
          <el-form ref="formEdit" :model="formEdit" :rules="rules">
            <el-form-item label="数据源名称" :label-width="formLabelWidth" prop="dataSourceName">
              <el-select
                v-model="formEdit.dataSourceName"
                placeholder="选择数据源"
                filterable
                @change="selectChange"
              >
                <el-option
                  v-for="(item, index) in dataSourceList"
                  :key="index"
                  :label="item.dbAlias"
                  :value="item.dbAlias"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="任务名称" :label-width="formLabelWidth" prop="taskName">
              <el-input v-model="formEdit.taskName" autocomplete="off" placeholder="请输入任务名称" />
            </el-form-item>
            <el-form-item label="采集方式" :label-width="formLabelWidth" prop="taskType">
              <el-radio-group v-model="taskType[formEdit.taskType]">
                <el-radio label="全量" />
                <el-radio label="增量" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="开启调度" :label-width="formLabelWidth" prop="schedule">
              <el-switch v-model="formEdit.schedule" />
            </el-form-item>
            <el-form-item abel="cron表达式" label-width="120px" :inline="true">
              <el-input v-model="formEdit.cronExp" placeholder="请输入cron表达式" />
              <br>
              <el-button size="mini" type="primary">测试</el-button><span>帮助</span>
            </el-form-item>
            <el-form-item label="生效日期" :label-width="formLabelWidth">
              <el-date-picker
                v-model="formEdit.effectiveDate"
                type="datetime"
                placeholder="生效日期"
                default-time="12:00:00"
              />
            </el-form-item>
            <el-form-item label="失效日期" :label-width="formLabelWidth">
              <el-date-picker
                v-model="formEdit.expiryDate"
                type="datetime"
                placeholder="失效日期"
                default-time="12:00:00"
              />
            </el-form-item>
            <el-form-item label="重试" :label-width="formLabelWidth">
              <el-switch v-model="formEdit.retry" />
              <div>(执行任务失败后进行重试操作)</div>
            </el-form-item>
            <el-form-item label="重试次数" :label-width="formLabelWidth">
              <el-input v-model="formEdit.retryTimes" autocomplete="off" />
            </el-form-item>
            <el-form-item label="间隔时间" :label-width="formLabelWidth">
              <el-input v-model="formEdit.intervalTime" autocomplete="off"><template slot="append">分钟</template></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="runTaskEdit">立即执行</el-button>
            <el-button @click="formEditVisible=false">取 消</el-button>
            <el-button type="primary" @click="submitFormEdit('formEdit')">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
      <el-col v-if="total" style="text-align:left;" :span="24">
        <el-pagination
          :current-page="page"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
  </imp-panel>
</template>
<script>
import * as api from '@/api/task'
import { GET_DATASOURCELIST, DELETE_METATASK } from '@/api/api'
export default {
  data() {
    return {
      page: 1,
      limit: 10,
      tableData: [],
      multipleSelection: [],
      total: 0,
      input: '',
      value: null,
      value3: '',
      taskType: { 0: '全量', 1: '增量' },
      taskEnabled: { 0: '禁用', 1: '启用' },
      formAddTaskVisible: false,
      formLabelWidth: '120px',
      formAddTask: {
        cronExp: '',
        dataSourceId: '',
        dataSourceName: '',
        effectiveDate: '',
        expiryDate: '',
        intervalTime: '',
        retry: true,
        retryTimes: '',
        schedule: false,
        taskName: '',
        taskType: 0
      },
      dataSourceList: [],
      selectName: '',
      rules: {
        dataSourceName: [
          { required: true, message: '请选择数据源', trigger: 'change' }
        ],
        taskName: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        taskType: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        schedule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      formEdit: [],
      formEditVisible: false,
      selectNameEdit: ''
    }
  },
  created() {
    this.getTaskList()
  },
  mounted() {},
  methods: {
    HiveMetaStore() {
      api.HiveMetaStore().then(() => {
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(value) {
      this.limit = value
      this.getTaskList()
    },
    handleCurrentChange(value) {
      this.page = value
      this.getTaskList()
    },
    getTaskList() {
      var params = { page: this.page, limit: this.limit }
      if (this.input) {
        params.taskName = this.input
      }
      api.getTaskList(params).then(res => {
        this.tableData = res.data
        this.total = res.count / 1
      })
    },
    search() {
      this.getTaskList()
    },
    codeSearch(e) {
      if (e.keyCode === 13) {
        this.search()
      }
    },
    addTaskBtn() {
      // 加载数据源类型
      this.$axios({
        url: GET_DATASOURCELIST,
        method: 'post',
        data: { page: 1, limit: 5000 },
        transformRequest: [function(data) {
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then(res => {
        this.dataSourceList = res.data.data
        this.formAddTaskVisible = true
        // console.log(this.dataSourceList)
      })
    },
    submitFormTask(formName) {
      var name = this.selectName
      var dataSourceId = this.dataSourceList.filter(function(item) {
        return item.dbAlias === name
      })[0]['id']
      var data = JSON.parse(JSON.stringify(this.formEdit))
      data.dataSourceId = dataSourceId
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.addMetaTask(data)
            .then(res => {
              this.formAddTaskVisible = false
              this.$message({ message: '添加成功', type: 'success' })
              this.getTaskList()
              this.$refs[formName].resetFields()
            })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    cancel() {
      this.$refs['addTask'].resetFields()
      this.formAddTaskVisible = false
    },
    selectChange(val) {
      // console.log(val)
      this.selectName = val
    },
    btnBatchEnable(e) { // 启用禁用
      var text = e.target.innerText
      var status = text === '启用' ? '1' : '0'
      var data = []
      if (this.multipleSelection.length < 0 || this.multipleSelection.length === 0) {
        this.$message.error('请选择任务')
      } else {
        this.multipleSelection.map((value) => {
          data.push(value.id)
        })
        api.onBatchUpdateStatus({ ids: data, status: status }).then(res => {
          this.getTaskList()
          this.$message({
            message: text + '成功',
            type: 'success'
          })
        })
      }
    },
    // 表格中的操作
    // 立即执行
    runTask(index, val) {
      // console.log( val)
      api.onImmediatelyExecute(val).then(res => {
        this.$message({ message: '立即执行成功', type: 'success' })
      })
    },
    enableTaskStatus(index, val) {
      var startUse = null
      if (val.startUse === 0) {
        startUse = 1
      } else if (val.startUse === 1) {
        startUse = 0
      }
      api.onBatchUpdateStatus({ id: val.id, startUse: startUse, taskName: val.taskName }).then(() => {
        this.getTaskList()
      })
    },
    handleEdit(index, val) {
      this.formEdit = val
      this.$axios({
        url: GET_DATASOURCELIST,
        method: 'post',
        data: { page: 1, limit: 5000 },
        transformRequest: [function(data) {
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then(res => {
        this.dataSourceList = res.data.data
        this.formEditVisible = true
      })
    },
    handleDelete(index, val) {
      this.$confirm('是否删除任务' + val.taskName + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$axios({
          url: DELETE_METATASK,
          method: 'post',
          data: { id: val.id },
          transformRequest: [function(data) {
            let ret = ''
            for (const it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }).then(res => {
          this.getTaskList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitFormEdit(formName) {
      var name = this.selectNameEdit
      var dataSourceId = this.dataSourceList.filter(function(item) {
        return item.dbAlias === name
      })[0]['id']
      var data = JSON.parse(JSON.stringify(this.formEdit))
      data.dataSourceId = dataSourceId
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.updateMetaTask(data)
            .then(res => {
              this.formEditVisible = false
              this.$message({ message: '修改成功', type: 'success' })
              this.getTaskList()
              this.$refs[formName].resetFields()
            })
        } else {
        // console.log('error submit!!')
          return false
        }
      })
    },
    selectChangeEdit(val) {
      // console.log(val)
      this.selectNameEdit = val
    },
    runTaskEdit() {
      // console.log(this.formEdit)
      var data = JSON.parse(JSON.stringify(this.formEdit))
      data.immediateExcute = 1
      api.onImmediatelyExecute(data).then(res => {
        this.$message({ message: '立即执行成功', type: 'success' })
      })
    }
  }
}
</script>
<style lang='scss' scoped>
  .el-button--mini {
    padding: 5px;
  }
  .el-button+.el-button {
    margin-left: 7px;
  }
  .el-dialog__header{
    background:#409EFF;
    .el-dialog__title{
      color:#FFF;
    }
  }
  .el-dialog{
    margin-top:8vh !important;
    .el-select {
      width: 100%;
    }
  }
  .el-select-dropdown{
    min-width:309px;
  }
</style>
