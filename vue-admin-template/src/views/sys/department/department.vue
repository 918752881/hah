<template>
  <imp-panel>
    <div slot="header" class="box-header" style="width: 100%;">
      <el-row :gutter="20">
        <el-col :sm="24" :md="24" align="right" style="padding-right:50px;">
          <el-button type="primary" icon="el-icon-plus" @click="formAddVisible=true">新建部门</el-button>
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
            prop="deptName"
            label="部门名称"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="updateTime"
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

      <el-dialog title="添加部门" :visible.sync="formAddVisible" width="500px">
        <el-form ref="formAdd" :model="formAdd">
          <el-form-item
            label="部门名称"
            :label-width="formLabelWidth"
            prop="deptName"
          >
            <el-input v-model="formAdd.deptName" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="formAddCancel">取 消</el-button>
          <el-button type="primary" @click="formAddYes">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑部门" :visible.sync="formEditVisible" width="500px">
        <el-form ref="formEdit" :model="formEdit">
          <el-form-item
            label="部门名称"
            :label-width="formLabelWidth"
            prop="deptName"
          >
            <el-input v-model="formEdit.deptName" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="formEditVisible=false">取 消</el-button>
          <el-button type="primary" @click="formEditYes">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
  </imp-panel>
</template>
<script>
import * as api from '@/api/deparment'
export default {
  data() {
    return {
      tableData: [],
      formAddVisible: false,
      formEditVisible: false,
      formLabelWidth: '100px',
      total: 0,
      page: 1,
      limit: 10,
      formAdd: {
        id: null,
        deptName: null,
        updateTime: null,
        status: null,
        deptDesc: null
      },
      formEdit: {}
    }
  },
  created() {
    this.getDeparmentList()
  },
  methods: {
    getDeparmentList() {
      var params = {
        page: this.page,
        limit: this.limit
      }
      api.getDeparmentList(params).then(res => {
        this.tableData = res.datas
        this.total = res.count
      }).catch(() => {})
    },
    handleSizeChange(val) {
      this.limit = val
      this.getDeparmentList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getDeparmentList()
    },
    formAddYes() {
      if (this.formAdd.deptName) {
        api.addDeparment(this.formAdd).then(res => {
          this.$message({ message: '添加成功', type: 'success' })
          this.$refs['formAdd'].resetFields()
          this.formAddVisible = false
          this.getDeparmentList()
        }).catch(() => {
          this.$message({ message: '添加失败', type: 'error' })
        })
      } else {
        alert('部门名称不能为空')
      }
    },
    formAddCancel() {
      this.$refs['formAdd'].resetFields()
      this.formAddVisible = false
    },
    handleEdit(index, row) {
      // console.log(index,id)
      this.formEdit = JSON.parse(JSON.stringify(row))
      this.formEditVisible = true
    },
    handleDelete(index, row) {
      this.$confirm('是否删除?', '删除部门', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteDeparment({ id: row.id }).then(() => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getDeparmentList()
        }).catch(() => {
          this.$message({ type: 'error', message: '删除失败' })
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    formEditYes() {
      this.formEdit.modifyTime = new Date()
      api.updateDeparment(this.formEdit).then(res => {
        this.$message({ message: '修改成功', type: 'success' })
        this.formEditVisible = false
      }).catch(() => {
        this.$message({ message: '添加失败', type: 'error' })
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
