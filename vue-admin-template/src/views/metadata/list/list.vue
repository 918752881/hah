<template>
  <div class="box">
    <el-row :gutter="10">
      <el-col :xs="24" :md="6">
        <el-card class="box-card" style="min-height:1000px;">
          <el-row :gutter="15">
            <el-col :xs="24" :md="14">
              <el-input v-model="tableName" placeholder="请输入表名搜索" />
            </el-col>
            <el-col :xs="24" :md="8">
              <el-button type="primary" icon="el-icon-search" @click="searchMenuList">搜索</el-button>
            </el-col>
            <el-col :span="24" style="margin-top:20px;">
              <el-tree
                ref="tree"
                :data="treeData"
                :props="defaultProps"
                @node-click="handleNodeClick"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="18">
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-card class="box-card">
                <!--<div slot="header" class="clearfix">
                  <h3>基本信息</h3>
                </div>-->
                <el-col :span="20">
                  <el-row>
                    <el-col :span="12"><div class="baseInfo"><span class="baseInfoAttrs">表英文名:</span><span>{{ baseInfo.enTableName }}</span></div></el-col>
                    <el-col :span="12"><div class="baseInfo"><span class="baseInfoAttrs">表中文名:</span><span>{{ baseInfo.chTableName }}</span></div></el-col>
                    <el-col :span="12"><div class="baseInfo"><span class="baseInfoAttrs">所属层级:</span><span>{{ baseInfo.belongLevel }}</span></div></el-col>
                    <el-col :span="12"><div class="baseInfo"><span class="baseInfoAttrs">所属主题域:</span><span>{{ baseInfo.belongTheme }}</span></div></el-col>
                    <el-col :span="12"><div class="baseInfo"><span class="baseInfoAttrs">类型:</span><span>{{ baseInfo.tableType }}</span></div></el-col>
                    <el-col :span="12"><div class="baseInfo"><span class="baseInfoAttrs">表创建时间:</span><span>{{ baseInfo.createTableTime }}</span></div></el-col>
                    <el-col :span="12"><div class="baseInfo"><span class="baseInfoAttrs">DDL最后变更时间:</span><span>{{ baseInfo.transientLastDdlTime }}</span></div></el-col>
                    <el-col :span="12"><div class="baseInfo"><span class="baseInfoAttrs">占用空间:</span><span>{{ baseInfo.countSpace }}</span></div></el-col>
                    <div v-if="attrsInfo.length > 0">
                      <el-col v-for="(item,index) in attrsInfo" :key="index" :span="12">
                        <div class="baseInfo">
                          <span class="baseInfoAttrs">{{ item.paramKey }}:</span><span>{{ item.paramValue }}</span>
                        </div>
                      </el-col>
                    </div>
                    <el-col>
                      <el-dialog title="编辑属性" :visible.sync="editDialogVisible" width="500px">
                        <el-table
                          :data="attrsInfo"
                          style="width: 100%"
                        >
                          <el-table-column
                            label="属性"
                          >
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.paramKey" />
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="属性值"
                            prop="paramValue"
                          >
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.paramValue" />
                            </template>
                          </el-table-column>
                        </el-table>
                        <div slot="footer" class="dialog-footer">
                          <el-button @click="editDialogNo">取 消</el-button>
                          <el-button type="primary" @click="editDialogYes">确 定</el-button>
                        </div>
                      </el-dialog>
                      <!--<div v-for="(item,index) in attrsInfo" :key="index" class="editAttrs">
                            <div>
                              <input v-model="item.paramKey"></input>
                            </div>
                            <span>:</span>
                            <div>
                              <input v-model="item.paramValue"></input>
                            </div>
                         </div>-->
                      <el-dialog title="添加属性" :visible.sync="addDialogVisible" width="500px">
                        <div class="addAttrs">
                          <div>
                            <el-input v-model="paramKey" placeholder="请输入属性" />
                          </div>
                          <span>:</span>
                          <div>
                            <el-input v-model="paramValue" placeholder="请输入属性值" />
                          </div>
                        </div>
                        <div slot="footer" class="dialog-footer">
                          <el-button @click="addDialogVisible = false">取 消</el-button>
                          <el-button type="primary" @click="addDialogYes">确 定</el-button>
                        </div>
                      </el-dialog>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="4">
                  <el-row>
                    <el-col :span="24"><el-button type="primary" size="small" style="margin-bottom:8px;" @click="wholeChain">全链分析</el-button></el-col>
                    <el-col :span="24"><el-button type="primary" size="small" style="margin-bottom:8px;" @click="editAttrs">编辑属性</el-button></el-col>
                    <el-col :span="24"><el-button type="primary" size="small" style="margin-bottom:8px;" @click="addAttrs">添加属性</el-button></el-col>
                  </el-row>
                </el-col>
              </el-card>
            </el-row>
          </el-col>
          <el-col :span="24" style="margin-top:10px;padding-left:10px;">
            <el-tabs v-model="activeName" @tab-click="handleClickTabs">
              <el-tab-pane label="字段信息" name="first">
                <div class="tabContent">
                  <el-table
                    :data="columnInfoData"
                    style="width: 100%;"
                  >
                    <el-table-column
                      type="index"
                      :index="indexMethodColumn"
                    />
                    <el-table-column
                      prop="columnName"
                      label="字段英文名称"
                    />
                    <el-table-column
                      prop="colComment"
                      label="字段中文名称"
                    />
                    <el-table-column
                      prop="columnType"
                      label="字段类型"
                    />
                    <el-table-column
                      label="是否分区"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.isPartition === "0" ? "否" : "是" }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="udfName"
                      label="脱敏算法"
                    />
                  </el-table>
                  <el-pagination
                    v-if="columnInfoTotal"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-size="columnInfoLimit"
                    :current-page="columnInfoPage"
                    :total="columnInfoTotal"
                    @size-change="columnInfoSizeChange"
                    @current-change="columnInfoPageChange"
                  />
                </div>
              </el-tab-pane>
              <el-tab-pane label="存储信息" name="second">
                <div class="second">
                  <div>
                    <h4>存储情况</h4>
                  </div>
                  <el-table
                    :data="storeInfoData"
                    border
                    style="width: 100%"
                  >
                    <el-table-column
                      prop="dbName"
                      label="存储库"
                    />
                    <el-table-column
                      label="总存储大小(M)"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.totalSize ? StorageSwitch(scope.row.totalSize) : "" }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="numFiles"
                      label="总文件数"
                    />
                    <el-table-column
                      prop="numRows"
                      label="总存储条数"
                    />
                    <el-table-column
                      label="数据最后变更时间"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.transientLastDdlTime ? timeSwitch((scope.row.transientLastDdlTime + "000")/1, true) : "" }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div>
                    <h4>分区情况</h4>
                  </div>
                  <el-table
                    :data="partionData"
                    border
                    style="width: 100%"
                  >
                    <el-table-column
                      prop="partitionName"
                      label="分区值"
                    />
                    <el-table-column
                      prop="numFiles"
                      label="文件数"
                    />
                    <el-table-column
                      label="存储量(M)"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.totalSize ? StorageSwitch(scope.row.totalSize) : "" }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="numRows"
                      label="记录条数"
                    />
                  </el-table>
                  <div>
                    <h4>存储格式</h4>
                  </div>
                  <el-form label-width="130px" :model="storeFormateData">
                    <el-form-item label="表所在HDFS地址:">
                      <el-input v-model="storeFormateData.location" />
                    </el-form-item>
                    <el-form-item label="数据存储格式:">
                      <el-input v-model="storeFormateData.formate" />
                    </el-form-item>
                    <el-form-item label="存储类型:">
                      <el-input v-model="storeFormateData.tlbType" />
                    </el-form-item>
                    <el-form-item label="列分隔符:">
                      <el-input v-model="storeFormateData.separatorCharacter" />
                    </el-form-item>
                    <el-form-item label="列转义符:">
                      <el-input v-model="storeFormateData.transferCharacter" />
                    </el-form-item>
                    <el-form-item label="collection分割符:">
                      <el-input v-model="storeFormateData.collectionSeparatorCharacter" />
                    </el-form-item>
                    <el-form-item label="map-kv分割符:">
                      <el-input v-model="storeFormateData.mapKvSeparatorCharacter" />
                    </el-form-item>
                  </el-form>
                </div>
              </el-tab-pane>
              <el-tab-pane label="变更历史" name="third">
                <div>
                  <el-table
                    :data="changeHistoryData"
                    border
                    style="width: 100%"
                  >
                    <el-table-column
                      label="变更项"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.changeType === 0?"插入":scope.row.changeType === -1? "更新" : "删除" }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="modifyTime"
                      label="变更时间"
                    />
                    <el-table-column
                      prop="changeDescription"
                      label="变更信息"
                    />
                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="血缘影响表" name="fourth">
                <el-row :gutter="10">
                  <el-col :span="5">
                    <el-select v-model="tableType" placeholder="请选择" @change="tableTypeChange">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-col>
                  <el-col :span="19">
                    <el-button type="primary" icon="el-icon-search" @click="searchRelationTable">搜索</el-button>
                  </el-col>
                </el-row>
                <div style="margin-top: 10px;">
                  <el-table
                    :data="RelationFluencetableData"
                    border
                    style="width: 100%"
                  >
                    <el-table-column
                      prop="tableName"
                      label="表名"
                    />
                    <el-table-column
                      prop="dbName"
                      label="所属数据库"
                    />
                    <el-table-column
                      prop="source"
                      label="分析来源"
                    />
                    <el-table-column
                      prop="type"
                      label="类型"
                    />
                    <el-table-column
                      prop="lifeCycle"
                      label="生命周期"
                    />
                    <el-table-column
                      prop="responseName"
                      label="责任人"
                    />
                    <el-table-column
                      prop="modifyTime"
                      label="最近更新时间"
                    />
                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="质量情况" name="five">
                <div>
                  <el-table
                    :data="qualityData"
                    border
                    style="width: 100%"
                  >
                    <el-table-column
                      prop="check_class"
                      label="质量检测分类"
                    />
                    <el-table-column
                      prop="check_type"
                      label="质量检测类型"
                    />
                    <el-table-column
                      prop="column_name"
                      label="检测字段"
                    />
                    <el-table-column
                      prop="valid_count"
                      label="有效记录数"
                    />
                    <el-table-column
                      prop="except_count"
                      label="异常记录数"
                    />
                    <el-table-column
                      prop="time"
                      label="检测时间"
                    />
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as api from '@/api/list'
import { timeSwitch } from '@/utils/help'
export default {
  data() {
    return {
      tableName: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'isLeaf'
      },
      editDialogVisible: false,
      addDialogVisible: false,
      paramValue: '',
      paramKey: '',
      tableId: 0,
      activeName: 'first',
      baseInfo: {},
      attrsInfoOld: [],
      attrsInfo: [],
      columnInfoTotal: 0,
      columnInfoPage: 1,
      columnInfoLimit: 10,
      columnInfoData: [],
      storeInfoData: [],
      partionData: [],
      storeFormateData: {},
      changeHistoryData: [],
      RelationtableData: [],
      fluenceTableData: [],
      RelationFluencetableData: [],
      qualityData: [],
      tableType: 1,
      options: [{ label: '血缘表', value: 1 }, { label: '影响表', value: 2 }]
    }
  },
  computed: {
    dbName() {
      return this.baseInfo.dbName
    },
    enTableName() {
      return this.baseInfo.enTableName
    },
    roleId() {
      return window.localStorage.getItem('roleId')
    }
  },
  created() {
    this.getMenuList()
    this.tableId = this.$route.params.id
    // this.tableId = 2036
    // this.tableId = 3567
    // console.log(this.tableId)
    if (this.tableId !== null && this.tableId !== '' && this.tableId !== undefined && this.tableId !== '0') {
      // 加载各种信息页面部分
      this.loadPage(this.tableId)
    }
  },
  methods: {
    handleNodeClick(treeNode) {
      // console.log(treeNode)
      if (treeNode.id.indexOf('db') !== -1) { // 判断为数据库层级
        if (treeNode.children.length === 0) {
          api.getTableMenu(treeNode.originId)
            .then(res => {
              var data = res.datas
              var arr = []
              if (data.length > 0) {
                data.map(value => {
                  var obj = {
                    label: value.menuName,
                    id: value.id,
                    children: [],
                    originId: value.orginId,
                    isLeaf: false
                  }
                  arr.push(obj)
                })
                this.append(arr, treeNode)
              } else {
                this.$message({
                  message: '无表级数据',
                  type: 'warning'
                })
              }
            })
        }
      } else if (treeNode.id.indexOf('table') !== -1) {
        // console.log(treeNode.originId)
        this.tableId = treeNode.originId
        this.loadPage(this.tableId)
      }
    },
    getMenuList() {
      api.getMenuList().then(res => {
        this.treeData = this.toTreeData(res.datas, 'id', 'parentId', 'menuName', 'orginId')
      })
    },
    append(data, treeNode) {
      if (treeNode.children.length === 0) {
        treeNode.children = data
      }
    },
    searchMenuList() {
      if (this.tableName) {
        api.searchMenuList(this.tableName)
          .then(res => {
            this.treeData = this.toTreeData(res.datas, 'id', 'parentId', 'menuName', 'orginId')
            console.log(this.treeData)
          })
      } else {
        this.$message({
          message: '请输入表名',
          type: 'warning'
        })
      }
    },
    toTreeData(data, id, pid, name, orginId) {
      // 建立个树形结构,需要定义个最顶层的父节点，pId是1
      const parent = []
      for (let i = 0; i < data.length; i++) {
        if (data[i][pid] !== '0') {
          // console.log(1)
        } else {
          const obj = {
            label: data[i][name],
            id: data[i][id],
            children: [],
            originId: data[i][orginId],
            isLeaf: false
          }
          // console.log(obj);
          parent.push(obj) // 数组加数组值
        }
      //  console.log(parent,"bnm");
      }
      children(parent)
      // 调用子节点方法,参数为父节点的数组
      function children(parent) {
        // console.log(parent)
        if (data.length !== 0) {
          for (let i = 0; i < parent.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if (parent[i].id === data[j][pid]) {
                const obj = {
                  label: data[j][name],
                  id: data[j][id],
                  children: [],
                  originId: data[j][orginId],
                  isLeaf: false
                }
                parent[i].children.push(obj)
              }
            }
            children(parent[i].children)
          }
        }
      }
      // console.log(parent, 'bjil')
      return parent
    },
    handleClickTabs(tab, event) {
      // console.log(tab, event)
    },
    loadPage() {
      // 加载基础信息
      this.loadInfo(this.tableId)
      // 加载属性信息
      this.loadAttrs(this.tableId)
      // 获取字段信息
      this.loadColumnInfo(this.tableId)
      // 加载存储情况和格式
      this.loadStore(this.tableId)
      // 分区
      this.loadPartion(this.tableId)
      // 变更历史
      this.loadChangeHistory(this.tableId)
      // 血缘表
      this.loadRelationtable(this.tableId)
      // 影响表
      this.loadInfluenceTable(this.tableId)
      // 质量情况
      this.loadQuality(this.tableId)
    },
    loadInfo(tableId) {
      api.loadInfo(tableId).then(res => {
        this.baseInfo = res.datas
      })
    },
    loadAttrs(tableId) {
      api.loadAttrs(tableId).then(res => {
        // console.log(res)
        if (res.datas.length > 0) {
          this.attrsInfo = res.datas
        }
        // this.attrsInfo = [{paramKey:1,paramValue:1,id:1},{paramKey:2,paramValue:2,id:2},{paramKey:3,paramValue:3,id:3}]
      })
    },
    loadColumnInfo() {
      var params = {
        tableId: this.tableId,
        page: this.columnInfoPage,
        limit: this.columnInfoLimit
      }
      api.loadColumnInfo(params).then(res => {
        // console.log(res)
        this.columnInfoData = res.data
        this.columnInfoTotal = res.count / 1
      })
    },
    columnInfoSizeChange(val) {
      this.columnInfoLimit = val
      this.loadColumnInfo()
    },
    columnInfoPageChange(val) {
      this.columnInfoPage = val
      this.loadColumnInfo()
    },
    indexMethodColumn(index) {
      return (this.columnInfoPage - 1) * this.columnInfoLimit + index + 1
    },
    loadStore(tableId) {
      api.loadStoreInfo(tableId)
        .then(res => {
          if (res.datas) {
            this.storeInfoData = res.datas
          }
        })
      api.loadStoreFormate(tableId)
        .then(res => {
          this.storeFormateData = res.datas
        })
    },
    loadPartion(tableId) {
      api.loadPartion(tableId)
        .then(res => {
          this.partionData = res.datas
        })
    },
    loadChangeHistory(tableId) {
      api.loadChangeHistory(tableId)
        .then(res => {
          this.changeHistoryData = res.datas
        })
    },
    loadRelationtable(tableId) {
      api.loadRelationtable({ tableId: tableId })
        .then(res => {
          this.RelationtableData = res.data
          // this.RelationtableData = [{ tableName : 1} ,{ tableName : 2},{ tableName : 3}]
          this.RelationFluencetableData = this.RelationtableData.concat(this.fluenceTableData)
        })
    },
    loadInfluenceTable(tableId) {
      api.loadInfluenceTable(tableId)
        .then(res => {
          this.fluenceTableData = res.datas
          // this.fluenceTableData = [{ tableName: 4 }, { tableName: 5 }, { tableName: 6 }]
          this.RelationFluencetableData = (this.RelationtableData).concat(this.fluenceTableData)
        })
    },
    loadQuality(tableId) {
      api.loadQuality({ tableId: tableId })
        .then(res => {
          this.qualityData = res
        })
    },
    searchRelationTable() {
      // console.log(this.tableType)
      if (this.tableType === 1) {
        this.RelationFluencetableData = this.RelationtableData
      } else if (this.tableType === 2) {
        this.RelationFluencetableData = this.fluenceTableData
      }
    },
    tableTypeChange(val) {
      this.tableType = val
    },
    StorageSwitch(data) {
      const newdata = (data / Math.pow(1000, 2)).toFixed(3)
      return newdata
    },
    editAttrs() {
      if (this.attrsInfo.length > 0) {
        this.editDialogVisible = true
        this.attrsInfoOld = JSON.parse(JSON.stringify(this.attrsInfo))
      } else {
        this.$message({ type: 'warning', message: '无属性信息' })
      }
    },
    editDialogYes() {
      var data = this.attrsInfoOld
      var arr = this.attrsInfo
      var changeArr = []
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (data[i].id === arr[j].id) {
            if (data[i].paramValue !== arr[j].paramValue || data[i].paramKey !== arr[j].paramKey) {
              changeArr.push({
                id: arr[j].id,
                paramKey: arr[j].paramKey,
                paramValue: arr[j].paramValue
              })
            }
          }
        }
      }
      if (changeArr.length > 0) {
        this.saveTableParamList(changeArr, 'edit')
      }
    },
    editDialogNo() {
      this.editDialogVisible = false
      this.loadAttrs(this.tableId)
    },
    addAttrs() {
      if (this.tableId !== '0') {
        this.addDialogVisible = true
      } else {
        this.$message({ type: 'warning', message: '请选择左侧的表' })
      }
    },
    addDialogYes() {
      var addAttr = {}
      if (this.paramKey) {
        if (this.paramValue) {
          addAttr.tableId = this.tableId
          addAttr.paramKey = this.paramKey
          addAttr.paramValue = this.paramValue
          if (addAttr) {
            this.saveTableParamList([addAttr], 'add')
          }
        } else {
          alert('属性值不能为空')
        }
      } else {
        alert('属性值不能为空')
      }
    },
    saveTableParamList(data, actions) {
      var text = ''
      if (actions === 'edit') {
        text = '编辑'
      } else if (actions === 'add') {
        text = '添加'
      }
      api.saveTableParamList(data)
        .then(res => {
          this.loadAttrs(this.tableId)
          this.editDialogVisible = false
          this.addDialogVisible = false
          this.$message({
            message: text + '成功',
            type: 'success'
          })
          this.paramKey = ''
          this.paramValue = ''
        })
    },
    wholeChain() { 
      this.$router.push('/meta/blood/1')
      if (this.tableId === null || this.tableId === '' || this.tableId === undefined || this.tableId === '0') {
        this.$message({ type: 'warning', message: '请选择左侧的表' })
        return
      } else {
        this.$router.push('/meta/blood/1')
      }
      api.getBloodSourceForTable(this.tableId).then(res => {
        // if (res.data.tables.length === 0 ) {
        // alert('当前表没有血缘关系')
        // } else {
        this.$router.push('/meta/blood/1')
        // }
      }).catch(() => {
        this.$message({
          message: '请求血缘表关系失败',
          type: 'error'
        })
      })
    }
  }
}
</script>
<style lang='scss' scoped>
  .el-row{
    // min-height: calc(100vh - 50px);
    overflow:auto;
      .box-card{
        padding:20px 5px;
        height:100%;
      }
  }
  .baseInfo{
    height:20px;
    margin:5px 0;
    font-size:14px;
    .baseInfoAttrs{
      padding-right:8px;
    }
  }
  .second{
    div{
      margin:5px 0;
    }
  }
  .addAttrs{
    display:flex;
    margin-bottom:10px;
    span{
      padding:10px;
      display:block;
    }
  }
</style>
