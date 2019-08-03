<template>
  <imp-panel>
    <div slot="header" class="box-header" style="width: 100%;">
      <el-row :gutter="15">
        <el-col :sm="24" :md="4">
          <el-input v-model="dsName" placeholder="数据源名称" @keyup.enter.native="codeSearch" />
        </el-col>
        <el-col :sm="24" :md="4">
          <el-select v-model="dsType" placeholder="数据源类型" @change="dsTypeChange">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.engineName"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :sm="24" :md="4">
          <el-select v-model="isShard" placeholder="是否分区" @change="isShardChange">
            <el-option
              v-for="(item,index) in optionsDbTable"
              :key="index"
              :label="item.name"
              :value="item.status"
            />
          </el-select>
        </el-col>
        <el-col :sm="24" :md="8">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-col>
        <el-col :sm="24" :md="2">
          <el-button type="primary" icon="el-icon-plus" @click="formAddVisible=true">新建</el-button>
        </el-col>
        <el-col :sm="24" :md="2">
          <el-button type="danger" icon="el-icon-delete" @click="deleteRows">删除</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row slot="body" style="margin-bottom: 0px;">
      <el-col :span="24">
        <el-table
          v-loading="loading"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;height:100%;text-align:center;"
          max-height="500"
          border
          fit
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
          />
          <el-table-column
            label="数据源名称"
            prop="dsName"
            width="100"
          />
          <el-table-column
            prop="engineName"
            label="数据源类型"
            width="100"
          />
          <el-table-column
            prop="isShard"
            label="分库分表"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{ scope.row.isShard===1?'是':'否' }}</template>
          </el-table-column>
          <el-table-column
            prop="dsDesc"
            label="数据源描述"
            width="100"
            show-overflow-tooltip
          />
          <el-table-column
            prop="updateTime"
            label="创建时间"
            sortable
            width="180"
            show-overflow-tooltip
          />
          <el-table-column
            prop="createUserName"
            label="创建者"
          />
          <el-table-column
            prop="connStatus"
            label="连通状态"
          >
            <template slot-scope="scope">{{ scope.row.connStatus?'打开':'关闭' }}</template>
          </el-table-column>
          <el-table-column
            prop="sysName"
            label="所属系统"
            width="120"
          />
          <el-table-column label="操作" width="240" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="lookUpDataSource(scope.$index, scope.row)"
              >查看数据源</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" style="text-align:left;">
        <el-pagination
          v-if="total"
          :current-page="currentPage"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <!--新建数据源-->
        <el-dialog title="新建数据源" :visible.sync="formAddVisible" width="1000px">
          <el-form ref="addForm" :model="formAdd" :rules="rules">
            <div ref="addBox" class="Box">
              <el-form-item label="数据源名称" :label-width="formLabelWidth" prop="dsName">
                <el-input v-model="formAdd.dsName" placeholder="请输入数据源名称" />
              </el-form-item>
              <el-form-item label="数据源类型" :label-width="formLabelWidth" prop="engineId">
                <el-select v-model="formAdd.engineId" placeholder="请选择数据源类型">
                  <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item.engineName"
                    :value="item.id/1"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="分库分表" :label-width="formLabelWidth" prop="isShard">
                <el-select v-model="formAdd.isShard" placeholder="是否是分库分表" @change="shardAddChange">
                  <el-option
                    v-for="(item,index) in optionsDbTable"
                    :key="index"
                    :label="item.name"
                    :value="item.status"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="Box">
              <el-form-item label="归属系统" :label-width="formLabelWidth" prop="sysId">
                <el-select v-model="formAdd.sysId" placeholder="请输入归属系统">
                  <el-option
                    v-for="(item,index) in sysList"
                    :key="index"
                    :label="item.sysName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="数据源描述" :label-width="formLabelWidth">
                <el-input v-model="formAdd.dsDesc" placeholder="请输入数据源描述" />
              </el-form-item>
            </div>
            <div v-for="(item,index) in formAdd.connInfo" :key="index" class="connInfo">
              <el-form-item label="链接信息" label-width="100px">
                <el-input v-model="item.connUrl" type="textarea" :rows="2" placeholder="请输入链接信息" />
              </el-form-item>
              <el-form-item label="元数据" label-width="70px">
                <el-select v-model="item.metaDbId" placeholder="请选择元数据">
                  <el-option
                    v-for="(item1,index1) in dbsList"
                    :key="index1"
                    :label="item1.dbName"
                    :value="item1.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="用户名" label-width="70px">
                <el-input v-model="item.connUser" placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item label="密码" label-width="70px">
                <el-input v-model="item.connPwd" show-password placeholder="请输入密码" />
              </el-form-item>
              <el-form-item>
                <div v-if="shardAdd" class="icon">
                  <i class="el-icon-circle-plus" @click="plusBtnAdd(index)" />
                  <i class="el-icon-error" @click="removeBtnAdd(index)" />
                </div>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="connectCheck('addForm')">连通性检测</el-button>
            <el-button @click="addFormCancel('addForm')">取 消</el-button>
            <el-button type="primary" @click="addFormYes('addForm')">确 定</el-button>
          </div>
        </el-dialog>
        <!--修改数据源-->
        <el-dialog title="修改数据源" :visible.sync="formEditVisible" width="1000px">
          <el-form ref="editForm" :model="formEdit" :rules="rules">
            <div ref="editBox" class="Box">
              <el-form-item label="数据源名称" :label-width="formLabelWidth" prop="dsName">
                <el-input v-model="formEdit.dsName" />
              </el-form-item>
              <el-form-item label="数据源类型" :label-width="formLabelWidth" prop="engineId">
                <el-select v-model="formEdit.engineId">
                  <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item.engineName"
                    :value="item.id/1"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="分库分表" :label-width="formLabelWidth" prop="isShard">
                <el-select v-model="formEdit.isShard" placeholder="是否是分库分表" @change="shardEditChange">
                  <el-option
                    v-for="(item,index) in optionsDbTable"
                    :key="index"
                    :label="item.name"
                    :value="item.status"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="Box">
              <el-form-item label="归属系统" :label-width="formLabelWidth" prop="sysId">
                <el-select v-model="formEdit.sysId" placeholder="请输入归属系统">
                  <el-option
                    v-for="(item,index) in sysList"
                    :key="index"
                    :label="item.sysName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="数据源描述" :label-width="formLabelWidth">
                <el-input v-model="formEdit.dsDesc" />
              </el-form-item>
            </div>

            <div v-for="(item,index) in formEdit.connInfo" :key="index" class="connInfo">
              <el-form-item label="链接信息" label-width="100px" required>
                <el-input v-model="item.connUrl" type="textarea" :rows="2" placeholder="请输入链接信息" />
              </el-form-item>
              <el-form-item label="元数据" label-width="70px" required>
                <el-select v-model="item.metaDbId" placeholder="请选择元数据">
                  <el-option
                    v-for="(item1,index1) in dbsList"
                    :key="index1"
                    :label="item1.dbName"
                    :value="item1.id"
                  />
                </el-select>              </el-form-item>
              <el-form-item label="用户名" label-width="70px" required>
                <el-input v-model="item.connUser" placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item label="密码" label-width="70px" required>
                <el-input v-model="item.connPwd" show-password placeholder="请输入密码" />
              </el-form-item>
              <el-form-item>
                <div v-if="shardEdit" class="icon">
                  <i class="el-icon-circle-plus" @click="plusBtnEdit(index)" />
                  <i class="el-icon-error" @click="removeBtnEdit(index,item.id)" />
                </div>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="formEditVisible = false">取 消</el-button>
            <el-button type="primary" @click="editFormYes('editForm')">确 定</el-button>
          </div>
        </el-dialog>

        <!--查看数据源-->
        <el-dialog title="查看数据源" :visible.sync="formLookVisible" width="900px">
          <el-form ref="editForm" :model="formLook" :rules="rules">
            <div ref="editBox" class="lookUp">
              <el-form-item label="数据源名称：" :label-width="formLabelWidth">
                <span class="lookUp">{{ formLook.dsName }}</span>
              </el-form-item>
              <el-form-item label="数据源类型：" :label-width="formLabelWidth">
                <span>{{ formLook.engineName }}</span>
              </el-form-item>
              <el-form-item label="分库分表：" :label-width="formLabelWidth">
                <span>{{ formLook.isShard?"是":"否" }}</span>
              </el-form-item>
            </div>
            <div class="lookUp">
              <el-form-item label="归属系统：" :label-width="formLabelWidth">
                <span>{{ formLook.sysName }}</span>
              </el-form-item>
              <el-form-item label="数据源描述：" :label-width="formLabelWidth">
                <span>{{ formLook.dsDesc }}</span>
              </el-form-item>
            </div>

            <div v-if="formLook.connInfo.length>0">
              <div v-for="(item,index) in formLook.connInfo" :key="index" class="connInfo lookUp">
                <el-form-item label="链接信息：" label-width="100px">
                  <span>{{ item.connUrl }}</span>
                </el-form-item>
                <el-form-item label="元数据：" label-width="80px">
                  <span>{{ item.dbName }}</span>
                </el-form-item>
                <el-form-item label="用户名：" label-width="80px">
                  <span>{{ item.connUser }}</span>
                </el-form-item>
                <el-form-item label="密码：" label-width="80px">
                  <span>{{ item.connPwd }}</span>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </el-dialog>
      </el-col>
    </el-row>
  </imp-panel>
</template>
<script>
import * as api from '@/api/manage'
export default {
  data() {
    return {
      loading: false,
      input: '',
      dsName: '',
      dsType: null,
      isShard: null,
      currentPage: 1,
      options: [],
      sysList: [],
      dbsList: [],
      tableData: [],
      total: '',
      page: 1,
      limit: 10,
      flagConnect: false,
      optionsDbTable: [
        { name: '是', status: 1 },
        { name: '否', status: 0 }
      ],
      shardAdd: 1,
      shardEdit: null,
      formAdd: {
        dsName: '',
        engineId: '',
        isShard: 1,
        sysId: '',
        dsDesc: '',
        connInfo: [{
          connUrl: '',
          connPwd: '',
          connUser: '',
          metaDbId: null
        }]
      },
      rules: {
        dsName: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        engineId: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        isShard: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        sysId: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ]
      },
      formEdit: {
        dsName: '',
        engineId: 0,
        isShard: 1,
        sysId: 0,
        dsDesc: '',
        datasourceId: 0,
        connInfo: [{
          connUrl: '',
          connPwd: '',
          connUser: '',
          metaDbId: null
        }]
      },
      formLook: {
        connInfo: []
      },
      formLabelWidth: '100px',
      formAddVisible: false,
      formEditVisible: false,
      formLookVisible: false,
      valueAdd: '',
      multipleSelection: []
    }
  },
  computed: {},
  watch: {
    'formAddVisible': function(newvalue) {
      // console.log(newvalue)
      if (!newvalue) {
        this.$refs['addForm'].resetFields()
      }
    }
  },
  created() {
    this.getSysList()
    this.getdbsList()
    this.getdsTypeList()
    this.getList()
    this.flagConnect = false
  },
  methods: {
    getList() { // 获取页面信息
      api.getList({ page: this.page, limit: this.limit }).then(res => {
        var arr = res.datas
        if (arr.length > 0) {
          arr.map((item, index) => {
            this.sysList.map((item1, index1) => {
              if (item.sysId === item1.id) {
                item.sysName = item1.sysName
              }
            })
            this.options.map((item2, index2) => {
              if (item.engineId === item2.id) {
                item.engineName = item2.engineName
              }
            })
          })
        }
        this.tableData = arr
        this.total = res.count / 1
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    getdbsList() {
      api.getdbsList().then(res => {
        this.dbsList = res.datas
      }).catch(() => {})
    },
    getdsTypeList() {
      api.getdsTypeList().then(res => {
        if (res.datas.length > 0) {
          this.options = res.datas
        }
      }).catch(() => {})
    },
    getSysList() {
      api.getSysList().then(res => {
        if (res.datas.length > 0) {
          this.sysList = res.datas
        }
      }).catch(() => {})
    },
    dsTypeChange(val) {
      this.dsType = val
    },
    isShardChange(val) {
      this.isShard = val
    },
    handleSearch() { // 搜索
      const params = {
        'page': this.page,
        'limit': this.limit,
        'dsType': this.dsType,
        'dsName': this.dsName,
        'isShard': this.isShard
      }
      if (params.dsType === null && params.dsName === '' && params.isShard === null) {
        alert('请至少选择一项')
      } else {
        api.searchDataSource(params).then(res => {
          this.tableData = res.data
          this.total = res.count / 1
        }).catch(() => {})
      }
    },
    codeSearch(e) {
      if (e.keyCode === 13 || e) {
        this.handleSearch()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteRows() {
      var data = []
      if (this.multipleSelection.length < 0 || this.multipleSelection.length === 0) {
        this.$message.error('请选择数据源')
      } else {
        this.multipleSelection.map((value, index) => {
          data.push(value.id)
        })
        api.deleteByIds({ ids: data }).then(res => {
          this.getList()
          this.$message({
            message: res.resp_msg || '删除成功',
            type: 'success'
          })
        }).catch(() => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
      }
    },
    shardAddChange(value) {
      this.shardAdd = value
    },
    plusBtnAdd(index) {
      this.formAdd.connInfo.splice(index + 1, 0, {
        connUrl: '',
        connPwd: '',
        connUser: '',
        metaDbId: null
      })
    },
    removeBtnAdd(index) {
      this.formAdd.connInfo.splice(index, 1)
    },
    addFormClear() {
      this.formAddVisible = false
      this.$message({ message: '添加成功', type: 'success' })
      this.getList()
      this.$refs['addForm'].resetFields()
      this.flagConnect = false
      this.formAdd.dsDesc = ''
      this.formAdd.connInfo = [{
        connUrl: '',
        connPwd: '',
        connUser: '',
        metaDbId: null
      }]
    },
    addFormYes(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.flagConnect) {
            var dataSource = {
              dsName: this.formAdd.dsName,
              engineId: this.formAdd.engineId,
              isShard: this.formAdd.isShard,
              sysId: this.formAdd.sysId,
              dsDesc: this.formAdd.dsDesc
            }
            api.addDataSource(dataSource).then(res => {
              if (!res.datas && res.resp_msg === '数据源重复') {
                this.$message({ message: '数据源名称不能重复', type: 'error' })
              } else if (res.datas) {
                var datasourceId = res.datas
                var arr = []
                this.formAdd.connInfo.map((value, index) => {
                  if (value.connUrl === '' && value.connPwd === '' && value.connUser === '' && value.metaDbId === null) {
                    // console.log(1)
                  } else {
                    value.dbName = this.formAdd.dsName
                    value.dbDesc = this.formAdd.dsDesc
                    value.datasourceId = datasourceId
                    arr.push(value)
                  }
                })
                if (arr.length > 0) {
                  api.addConnInfo(arr).then(res => {
                    this.addFormClear()
                  }).catch(() => {
                    this.$message({ message: '添加失败', type: 'error' })
                  })
                } else {
                  this.addFormClear()
                }
              }
            }).catch(() => {
              this.$message({ message: '添加失败', type: 'error' })
            })
          } else {
            this.$message({
              message: '请进行连通性测试',
              type: 'warning'
            })
          }
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },
    addFormCancel(formName) {
      this.formAddVisible = false
      this.$refs[formName].resetFields()
      this.flagConnect = false
    },
    connectCheck(formName) { // 联通检测
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var sysName = ''
          this.sysList.map((item, index) => {
            if (item.id === this.formAdd.sysId) {
              sysName = item.sysName
            }
          })
          var arr = []
          this.formAdd.connInfo.map(item => {
            if (item.connUrl === '' && item.connUser === '' && item.connPwd === '' && !item.metaDbId) {
              // console.log(1)
            } else {
              arr.push({
                connUrl: item.connUrl,
                connUser: item.connUser,
                connPwd: item.connPwd
              })
            }
          })
          const data = {
            connInfo: arr,
            dsDesc: this.formAdd.dsDesc,
            dsName: this.formAdd.dsName,
            engineId: this.formAdd.engineId,
            isShard: this.formAdd.isShard,
            sysName: sysName
          }
          api.connectCheck(data).then(res => {
            this.flagConnect = true
            this.$message({ message: '连接成功', type: 'success' })
          }).catch(() => {
            this.$message({ message: '连接失败', type: 'error' })
          })
        } else {
          return false
        }
      })
    },
    handleEdit(index, row) { // 编辑
      api.getDBsByDataSourceId(row.id).then(res => {
        if (res) {
          this.formEdit.dsName = row.dsName
          this.formEdit.engineId = row.engineId
          this.formEdit.isShard = row.isShard
          this.formEdit.sysId = row.sysId
          this.formEdit.dsDesc = row.dsDesc
          this.formEdit.datasourceId = row.id
          this.formEdit.connInfo = res.datas
          this.formEditVisible = true
          this.shardEdit = row.isShard
        }
      }).catch(() => {})
    },
    plusBtnEdit(index) {
      var arr = JSON.parse(JSON.stringify(this.formEdit.connInfo))
      arr.splice(index + 1, 0, {
        connUrl: '',
        connPwd: '',
        connUser: '',
        metaDbId: null,
        datasourceId: this.formEdit.datasourceId,
        dbDesc: this.formEdit.dsDesc,
        dbName: this.formEdit.dsName
      })
      this.formEdit.connInfo = arr
    },
    removeBtnEdit(index, id) {
      if (id) {
        api.deleteByDBsId(id).then(res => {
          this.formEdit.connInfo.splice(index, 1)
        }).catch(() => {})
      } else {
        this.formEdit.connInfo.splice(index, 1)
      }
    },
    shardEditChange(val) {
      if (val === 0 && this.formEdit.connInfo.length > 1) {
        alert('链接信息只能为一条,请先删除')
        this.formEdit.isShard = 1
        return false
      } else {
        this.shardEdit = val
      }
    },
    editFormYes(formName) { // 关闭编辑框
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var dataSource = {
            dsName: this.formEdit.dsName,
            engineId: this.formEdit.engineId,
            isShard: this.formEdit.isShard,
            sysId: this.formEdit.sysId,
            dsDesc: this.formEdit.dsDesc,
            id: this.formEdit.datasourceId
          }
          api.addDataSource(dataSource)
            .then(res => {
              if (!res.datas && res.resp_msg === '数据源重复') {
                this.$message({ message: '数据源名称不能重复', type: 'error' })
              } else {
                var arr = []
                this.formEdit.connInfo.map((value, index) => {
                  var connInfo = {}
                  connInfo.connUrl = value.connUrl
                  connInfo.connPwd = value.connPwd
                  connInfo.connUser = value.connUser
                  connInfo.metaDbId = value.metaDbId
                  connInfo.dbName = value.dbName
                  connInfo.dbDesc = value.dbDesc
                  connInfo.datasourceId = value.datasourceId
                  if (value.id) {
                    connInfo.id = value.id
                  }
                  arr.push(connInfo)
                })
                if (arr.length > 0) {
                  api.addConnInfo(arr).then(res => {
                    this.formEditVisible = false
                    this.$message({ message: '修改成功', type: 'success' })
                    this.getList()
                  }).catch(() => {
                    this.$message({ message: '修改失败', type: 'error' })
                  })
                } else {
                  this.$message({ message: '修改成功', type: 'success' })
                }
              }
            }).catch(() => {
              this.$message({ message: '修改失败', type: 'error' })
            })
        } else {
          return false
        }
      })
    },
    handleDelete(index, val) { // 删除一行
      this.$confirm('是否删除数据源' + val.dsName + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        api.deleteDataSource(val.id).then(res => {
          this.$message({ message: '删除成功', type: 'success' })
          this.getList()
        })
      }).catch(() => {})
    },
    lookUpDataSource(index, row) { // 查看数据源
      // console.log(index, row)
      this.formLook = JSON.parse(JSON.stringify(row))
      api.getDBsByDataSourceId(row.id).then(res => {
        this.formLookVisible = true
        if (res.datas.length) {
          const result = res.datas
          result.map(item => {
            this.dbsList.map(item1 => {
              if (item.metaDbId === item1.id) {
                item.dbName = item1.dbName
              }
            })
          })
          this.formLook.connInfo = result
        } else {
          this.formLook.connInfo = []
        }
      }).catch(() => {})
    },
    handleSizeChange(value) {
      this.limit = value
      this.getList()
    },
    handleCurrentChange(value) {
      this.page = value
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button--mini{
  padding:5px 10px;
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
.Box{
  display:flex;
  justify-content: flex-start;
}
.lookUp{
  display:flex;
  .el-form-item{
    width:200px;
  }
}
.connInfo{
  width:100%;
  display:flex;
  justify-content: flex-start;
  .icon{
    width:80px;
    i{
      margin-left:5px;
      font-size:24px;
    }
  }
}
</style>
