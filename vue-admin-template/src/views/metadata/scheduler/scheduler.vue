<template>
  <ImpPanel>
    <div slot="header" class="box-header" style="width: 100%;">
      <el-row :gutter="15">
        <el-col :sm="24" :md="2">
          <div style="font-size:14px;padding-top:10px;text-align:center">选择时间段</div>
        </el-col>
        <el-col :sm="24" :md="8" align="center">
          <el-date-picker
            v-model="valuePicker"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changePicker"
          />
        </el-col>
        <el-col :sm="24" :md="4">{{ taskName }}
          <el-input v-model="taskName" placeholder="任务名称" @keyup.enter.native="codeSearch" />
        </el-col>
        <el-col :sm="24" :md="10">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
            prop="task_name"
            label="任务名称"
          />
          <el-table-column
            prop="db_name"
            label="数据库名称"
          />
          <el-table-column
            prop="task_status"
            label="任务状态"
          />
          <el-table-column
            prop="exec_start_time"
            label="执行开始时间"
            sortable
          />
          <el-table-column
            prop="exec_dur_time"
            label="耗时"
            sortable
          />
          <el-table-column
            prop="exec_result"
            label="采集结果（对比前一次）"
            width="260"
          />
          <el-table-column
            prop="exec_detail"
            label="采集详情"
          />
        </el-table>
      </el-col>
      <el-col v-if="total" :span="24" style="text-align:left;">
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
  </ImpPanel>
</template>
<script>
import * as api from '@/api/scheduler'
import { timeSwitch } from '@/utils/help'
export default {
  data() {
    return {
      valuePicker: '',
      tableData: [],
      page: 1,
      limit: 10,
      total: 0,
      taskName: ''
    }
  },
  computed: {
    beginTime() {
      if (this.valuePicker) {
        return timeSwitch(this.valuePicker[0], false)
      } else {
        return ''
      }
    },
    endTime() {
      if (this.valuePicker) {
        return timeSwitch(this.valuePicker[1], false)
      } else {
        return ''
      }
    }
  },
  created() {
    console.log(this.valuePicker, this.beginTime, this.endTime, this.taskName)
    this.getScheduleTask()
  },
  mounted() {
  },
  methods: {
    getScheduleTask() {
      var params = {}
      if (this.taskName || this.valuePicker) {
        params.page = this.page
        params.limit = this.limit
        params.taskName = this.taskName
        params.beginTime = this.beginTime
        params.endTime = this.endTime
      } else {
        params.page = this.page
        params.limit = this.limit
      }
      //  console.log(params)
      api.getScheduleTask(params).then(res => {
        this.tableData = res.data
        this.total = res.count
      })
    },
    handleSizeChange(value) {
      this.limit = value
      this.getScheduleTask()
    },
    handleCurrentChange(value) {
      this.page = value
      this.getScheduleTask()
    },
    handleSelectionChange() {
    },
    codeSearch(e) {
      if (e.keyCode === 13) {
        // this.handleSearch()
      }
    },
    handleSearch() {
      this.getScheduleTask()
    },
    changePicker(val) {
      this.valuePicker = val
    }
  }
}
</script>
