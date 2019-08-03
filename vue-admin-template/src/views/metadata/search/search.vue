<template>
  <div>
    <imp-panel>
      <div slot="header" class="box-header" style="width: 100%;">
        <el-row :gutter="10">
          <el-col :sm="24" :md="4">
            <el-select v-model="searchType" filterable placeholder="请选择搜索类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :sm="24" :md="10">
            <el-input v-model="keyWord" placeholder="请输入表中文名或描述" @keyup.enter.native="codeSearch" />
          </el-col>
          <el-col :sm="24" :md="2">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
          </el-col>
          <el-col :sm="24" :md="8" style="padding-top:15px;">
            <el-link @click="changeSearchStatus">{{ searchStatus?"取消":"高级检索" }}</el-link>
          </el-col>
          <!--<el-col :sm="24" :md="24">
            <div class="count">已为你选中{{ total }}条记录</div>
          </el-col>-->
        </el-row>
      </div>
      <el-row slot="body" style="margin-bottom: 0px;">
        <el-col v-if="searchStatus" :span="24" style="margin-bottom:10px;">
          <el-card class="box-card">
            <el-form ref="formSearch" :inline="true" :model="formSearch" class="demo-form-inline">
              <el-row>
                <el-col>
                  <el-form-item label="所属部门" prop="dep">
                    <el-select v-model="formSearch.dep" multiple collapse-tags filterable placeholder="所属部门">
                      <el-option
                        v-for="item in depList"
                        :key="item.id"
                        :label="item.deptName"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="元数据类型" prop="type">
                    <el-select v-model="formSearch.type" placeholder="元数据类型">
                      <el-option
                        v-for="item in typeList"
                        :key="item.id"
                        :label="item.engineName"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="创建时间">
                    <el-form-item prop="createTime">
                      <el-date-picker
                        v-model="formSearch.createTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                      />
                    </el-form-item>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="所属系统" prop="sys">
                    <el-select v-model="formSearch.sys" multiple collapse-tags filterable placeholder="所属系统">
                      <el-option
                        v-for="item in sysList"
                        :key="item.id"
                        :label="item.sysName"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="所属库" prop="db" label-width="83px">
                    <el-select v-model="formSearch.db" placeholder="所属库">
                      <el-option
                        v-for="item in dbList"
                        :key="item.id"
                        :label="item.dbName"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="变更时间">
                    <el-form-item prop="updateTime">
                      <el-date-picker
                        v-model="formSearch.updateTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                      />
                    </el-form-item>
                  </el-form-item>
                </el-col>
                <el-col style="text-align:center">
                  <el-form-item>
                    <el-button @click="resetForm('formSearch')">清空</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </el-col>
        <el-col v-if="searchType==='1'&&filedData.length > 0" :span="24">
          <el-table
            v-loading="loading"
            :data="filedData"
            tooltip-effect="dark"
            style="width: 100%;height:100%;text-align:center;"
            max-height="500"
            border
          >
            <el-table-column
              width="50"
              label="序号"
              type="index"
              :index="indexMethod"
            />
            <el-table-column
              label="字段英文名"
              prop="columnName"
              width="180"
              show-overflow-tooltip
            />
            <el-table-column
              prop="filedType"
              label="字段类型"
              width="180"
              show-overflow-tooltip
            />
            <el-table-column
              prop="columnComment"
              width="180"
              label="字段描述"
              show-overflow-tooltip
            />
            <el-table-column
              prop="belongTableName"
              width="180"
              label="所属表"
              show-overflow-tooltip
            />
            <el-table-column
              prop="dbName"
              label="所属库"
              width="140"
            />
            <el-table-column
              prop="belongSysName"
              label="所属系统"
            />

            <el-table-column label="操作" width="130" align="center">
              <template slot-scope="scope">
                <a
                  href="#"
                  size="mini"
                  @click="handleJump(scope.row.belongTableId)"
                >点击查看详情</a>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col v-if="searchType==='2'&&tableData.length > 0" :span="24">
          <el-table
            v-loading="loading"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;height:100%;text-align:center;"
            max-height="500"
            border
          >
            <el-table-column
              width="50"
              label="序号"
              type="index"
              :index="indexMethod"
            />
            <el-table-column
              prop="tableName"
              width="180"
              label="表英文名"
              show-overflow-tooltip
            />
            <el-table-column
              prop="tableComment"
              width="180"
              label="表描述"
              show-overflow-tooltip
            />
            <el-table-column
              label="变更时间"
              width="200"
              sortable
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{ timeSwitch(scope.row.createTime, true) }}</template>
            </el-table-column>
            <el-table-column
              prop="dbName"
              label="所属库"
              show-overflow-tooltip
            />
            <el-table-column
              prop="belongSysName"
              label="所属系统"
            />
            <el-table-column
              prop="useTime"
              label="使用次数"
            />
            <el-table-column
              prop="useScope"
              label="应用广度"
            />
            <el-table-column label="操作" width="130" align="center">
              <template slot-scope="scope">
                <a
                  href="#"
                  size="mini"
                  @click="handleJump(scope.row.tableId)"
                >点击查看详情</a>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col v-if="total" :span="24">
          <el-pagination
            :current-page="page"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-col>
      </el-row>
    </imp-panel>
  </div>
</template>
<script>
import * as api from '@/api/search'
import { timeSwitch } from '@/utils/help'
export default {
  data() {
    return {
      options: [{
        value: '1',
        label: '字段'
      }, {
        value: '2',
        label: '表'
      }],
      searchType: '2',
      depList: [],
      typeList: [],
      sysList: [],
      dbList: [],
      formSearch: {
        dep: [],
        type: null,
        sys: [],
        db: null,
        createTime: [],
        updateTime: []
      },
      searchStatus: false,
      total: 0,
      keyWord: '',
      filedData: [],
      tableData: [],
      page: 1,
      limit: 10,
      loading: false
    }
  },
  computed: {
    timeSwitch() {
      return timeSwitch
    }
  },
  created() {
    this.getdepList()
    this.gettypeList()
    this.getsysList()
    this.getdbList()
  },
  methods: {
    handleSearch() {
      var data = {}
      var obj = {}
      var myReg = /^[\u4e00-\u9fa5]+$/
      if (this.searchStatus) {
        var createStart = this.formSearch.createTime[0] ? this.formSearch.createTime[0] : ''
        var createEnd = this.formSearch.createTime[1] ? this.formSearch.createTime[1] : ''
        var updateStart = this.formSearch.updateTime[0] ? this.formSearch.updateTime[0] : ''
        var updateEnd = this.formSearch.updateTime[1] ? this.formSearch.updateTime[1] : ''
        obj = {
          createStart: createStart,
          createEnd: createEnd,
          db: this.formSearch.db,
          dep: this.formSearch.dep,
          sys: this.formSearch.sys,
          type: this.formSearch.type,
          updateStart: updateStart,
          updateEnd: updateEnd
        }
      }
      if (this.searchType && this.keyWord) {
        if (this.searchType === '1') { // 字段级别
          var columnName = ''
          var columnComment = ''
          if (myReg.test(this.keyWord)) {
            columnComment = this.keyWord
          } else {
            columnName = this.keyWord
          }
          data = {
            columnName: columnName,
            columnComment: columnComment,
            page: this.page,
            limit: this.limit,
            formdata: {}
          }
          if (this.searchStatus) {
            data.formdata = obj
          }
          this.loading = true
          this.metaFiledSearch(data)
        } else if (this.searchType === '2') { // 表级别
          var tableName = ''
          var tableComment = ''
          if (myReg.test(this.keyWord)) {
            tableComment = this.keyWord
          } else {
            tableName = this.keyWord
          }
          data = {
            tableName: tableName,
            tableComment: tableComment,
            page: this.page,
            limit: this.limit,
            formdata: {}
          }
          if (this.searchStatus) {
            data.formdata = obj
          }
          this.loading = true
          this.metaTableSearch(data)
        }
      } else {
        this.$message({ message: '请输入搜索条件', type: 'warning' })
      }
    },
    changeSearchStatus() {
      this.searchStatus = !this.searchStatus
    },
    getdepList() {
      api.getdepList().then(res => {
        this.depList = res.datas
      })
    },
    gettypeList() {
      api.gettypeList().then(res => {
        this.typeList = res.datas
      })
    },
    getsysList() {
      api.getsysList().then(res => {
        this.sysList = res.datas
      })
    },
    getdbList() {
      api.getdbList().then(res => {
        this.dbList = res.datas
      })
    },
    metaFiledSearch(data) {
      api.metaFiledSearch(data).then(res => {
        this.loading = false
        if (res.data.length > 0) {
          this.filedData = res.data
          this.total = res.count
          if (this.searchStatus) {
            this.keyWord = ''
            this.resetForm('formSearch')
            this.searchStatus = !this.searchStatus
          }
        }
      }).catch(() => {
        this.loading = false
        this.$message.error('资源加载失败')
      })
    },
    metaTableSearch(data) {
      api.metaTableSearch(data).then(res => {
        this.loading = false
        if (res.data.length > 0) {
          this.tableData = res.data
          this.total = res.count
          this.keyWord = ''
          if (this.searchStatus) {
            this.resetForm('formSearch')
            this.searchStatus = !this.searchStatus
          }
        }
      }).catch(() => {
        this.loading = false
        this.$message.error('资源加载失败')
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange(val) {
      this.limit = val
      this.handleSearch()
    },
    handleCurrentChange(val) {
      this.page = val
      this.handleSearch()
    },
    codeSearch(e) {
      if (e.keyCode === 13) {
        this.handleSearch()
      }
    },
    handleJump(tableId) {
      this.$router.push('/meta/list/' + tableId)
    },
    indexMethod(index) {
      return (this.page - 1) * this.limit + index + 1
    }
  }
}
</script>
<style lang='scss' scoped>
.count{
  color:#909399;
  font-size:14px;
  margin-top:15px;
}
a{
  text-decoration:underline;
}
.el-link.el-link--default{
  font-size:18px;
}
</style>
