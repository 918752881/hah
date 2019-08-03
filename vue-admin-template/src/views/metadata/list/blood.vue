<template lang="pug">
  <DagreGraph :nodes="nodes" :edges="edges" :tableId="tableId"/>
</template>
<script>
/**
 * 流程图
 */
import DagreGraph from '@/components/Blood/DagreGraph'
import * as api from '@/api/list'
export default {
  name: 'FlowDiagram',
  components: {
    DagreGraph
  },
  data() {
    return {
      nodes: [],
      edges: [],
      tableId: null
    }
  },
  created() {
    this.tableId = this.$route.params.id
    api.getBloodSourceForTable(this.tableId).then(res => {
      this.nodes = res.datas.tables
      this.edges = res.datas.tableRelations
    }).catch(() => {
      this.$message({
        message: '请求血缘表关系失败',
        type: 'error'
      })
    })
  },
  methods: {
  }
}
</script>
<style lang='scss' scoped>
.dagre-graph-container {
    width: 100%;
    height: 600px;
}
</style>
