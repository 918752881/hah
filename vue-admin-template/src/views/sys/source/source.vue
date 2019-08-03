<template>
  <imp-panel>
    <div slot="header" class="box-header" style="width: 100%;">
      <el-row :gutter="20">
        <el-col :sm="24" :md="12">
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新建源系统</el-button>
        </el-col>
        <el-col :sm="24" :md="9">
          <el-input v-model="keyWord" placeholder="请输入系统名称或名称缩写" @keyup.enter.native="codeSearch" />
        </el-col>
        <el-col :sm="24" :md="3">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row slot="body" style="margin-bottom: 0px;">
      <el-col :span="24">
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;height:100%;text-align:center;"
          max-height="500"
          border
        >
          <el-table-column
            prop="name"
            label="源系统名称"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="abbreviation"
            label="系统缩写"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="deparment"
            label="所属部门"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="modifyTime"
            label="更新时间"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column label="操作" align="center">
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
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" style="text-align:left;">
        <el-pagination
          v-if="total"
          :current-page="page"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>

      <el-dialog title="添加源系统" :visible.sync="formAddVisible" width="500px">
        <el-form ref="formAdd" :model="formAdd">
          <el-form-item label="源系统名称" :label-width="formLabelWidth" prop="name" 
          :rules="{required: true, message: '输入内容不能为空', trigger: 'blur'}"
          >
            <el-input v-model="formAdd.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="系统缩写" :label-width="formLabelWidth" prop="abbreviation">
            <el-input v-model="formAdd.abbreviation" autocomplete="off" />
          </el-form-item>
          <el-form-item label="所属部门" :label-width="formLabelWidth" prop="deparment">
            <el-input v-model="formAdd.deparment" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="formAddCancel('formAdd')">取 消</el-button>
          <el-button type="primary" @click="formAddYes('formAdd')">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改源系统" :visible.sync="formEditVisible" width="500px">
        <el-form ref="formEdit" :model="formEdit">
          <el-form-item label="源系统名称" :label-width="formLabelWidth" prop="name" 
          :rules="{required: true, message: '输入内容不能为空', trigger: 'blur'}"
          >
            <el-input v-model="formEdit.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="系统缩写" :label-width="formLabelWidth" prop="abbreviation">
            <el-input v-model="formEdit.abbreviation" autocomplete="off" />
          </el-form-item>
          <el-form-item label="所属部门" :label-width="formLabelWidth" prop="deparment">
            <el-input v-model="formEdit.deparment" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="formEditVisible=false">取 消</el-button>
          <el-button type="primary" @click="formEditYes('formEdit')">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
  </imp-panel>
</template>
<script>
import * as api from '@/api/sourcesys'
export default {
  data() {
    return {
      tableData: [{}],
      formAddVisible: false,
      formEditVisible: false,
      formLabelWidth: '100px',
      total: 0,
      page: 1,
      limit: 10,
      keyWord: '',
      formAdd: {
        name: '',
        abbreviation: '',
        deparment: '',
        modifyTime: new Date()
      },
      formEdit:{}
    }
  },
  created() {
    this.getSourceSysList()
  },
  methods: {
    getSourceSysList() {
      api.getSourceSysList({ page : this.page, limit: this.limit }).then(res => {
        this.tableData = res.data
        this.total = res.count
      }).catch(() => {
        this.$message({ message: '资源加载失败', type: 'error' })
      })
    },
    handleSizeChange(val) {
      this.limit = val
      this.getSourceSysList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getSourceSysList()
    },
    handleAdd() {
      this.formAddVisible = true
    },
    formAddYes(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            api.addRourceSys(this.formAdd).then(res => {
              this.$message({ message: '添加成功', type: 'success'})
              this.$refs[formName].resetFields()
              this.formAddVisible = false
              this.getSourceSysList()
            }).catch(() => {
              this.$message({ message: '添加失败', type: 'error' })
            })
          } else {
            return false
          }
      })
    },
    formAddCancel(formName) {
      this.$refs[formName].resetFields()
      this.formAddVisible = false
    },
    handleSearch() {
      if(this.keyWord){
        api.searchRourceSys({ page: this.page, limit: this.limit, keyWord: this.keyWord})
        .then(res => {
          this.tableData = res.data
          this.total = res.count
        })
      } else {
        alert('输入内容不能为空')
      } 
    },
    codeSearch(e) {
      if (e.keyCode === 13) {
        this.handleSearch()
      }
    },
    handleEdit(index, row) {
      this.formEditVisible = true
      this.formEdit = JSON.parse(JSON.stringify(row))
    },
    formEditYes(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.formEdit.modifyTime = new Date()
            api.updateRourceSys(this.formEdit).then(res => {
              this.$message({ message: '修改成功', type: 'success'})
              this.formEditVisible = false
              this.getSourceSysList()
            }).catch(() => {
              this.$message({ message: '修改失败', type: 'error' })
            })
          } else {
            return false
          }
      })
    },
    handleDelete(index, row) {
      this.$confirm('是否删除?', '删除源系统', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        api.deleteRourceSys({ id: row.id }).then(() => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getSourceSysList()
        }).catch(() => {
          this.$message({ type: 'error', message: '删除失败' })
        })
      }).catch(() => {})
    }  
  }
}
</script>
<style lang="scss" scoped>

</style>
