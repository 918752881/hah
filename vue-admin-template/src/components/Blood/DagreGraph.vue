<template lang="pug">
  div.dagre-graph-container(:id="containerId")
    div.zoom-div
        el-button(@click="comeBack" type="primary" style="margin-left:20px;margin-top:10px;") 返回
    svg.dagre
        g.container
</template>
<script>
/**
 * 流程图
 */
import * as d3 from 'd3'
import dagreD3 from 'dagre-d3'
let container = null
export default {
  name: 'DagreGraph',
  props: {
    'nodes': {
      type: Array,
      default: () => []
    },
    'edges': {
      type: Array,
      default: () => []
    },
    'tableId': {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      id: '',
      renderer: null,
      graph: null,
      svg: null,
      inner: null,
      direction: 'LR',
      zoom: null,
      containerId: '',
      width: 0,
      height: 0
    }
  },
  watch: {
    nodes() {
      this.strokeNodes()
    },
    edges() {
      this.strokeEdges()
    }
  },
  created() {
    this.containerId = this.uuid()
    this.graph = new dagreD3.graphlib.Graph().setGraph({
      rankdir: this.direction
    }).setDefaultEdgeLabel(function() { return {} })
    this.svg = d3.select('svg')
    this.inner = this.svg.select('g')
  },
  mounted() {
    this.width = document.getElementById(this.containerId).clientWidth
    this.height = document.getElementById(this.containerId).clientHeight
    // eslint-disable-next-line
    this.renderer = new dagreD3.render()
    const svg = d3.select(this.$el).select('svg.dagre')
      .attr('width', this.width)
      .attr('height', this.height)
    container = svg.select('g.container')
    // transform
    const transform = d3.zoomIdentity.translate(this.width / 15, this.height / 6).scale(0.7)
    this.zoom = d3.zoom()
      .scaleExtent([1 / 2, 8])
      .on('zoom', this.zoomed)
    container.transition().duration(750).call(this.zoom.transform, transform)
    svg.call(this.zoom)
    this.drawTableRelationChart()
  },
  methods: {
    drawTableRelationChart() {
      this.strokeNodes()
      this.strokeEdges()
      var that = this
      // 画数据表节点的字段列表
      d3.selectAll('g.node')
        .each(function(d) {
          var baseHeight = d3.select(this).node().getBBox().height
          var baseWidth = d3.select(this).node().getBBox().width
          var filedsGroup = d3.select(this)
            .append('g')
            .attr('class', 'detail')
          filedsGroup.selectAll('g')
            .data(that.nodes.filter(item => item.id === d)[0].fields)
            .enter()
            .append('g')
            .attr('transform', function(d, i) {
              return 'translate(' + -baseWidth / 2 + ',' + (baseHeight / 2 + baseHeight * 0.8 * i + 1) + ')'
            })
            .each(function() {
              d3.select(this)
                .append('rect')
                .attr('width', baseWidth)
                .attr('height', baseHeight * 0.8)
              d3.select(this)
                .append('g')
                .attr('transform', function() {
                  return 'translate(' + 0 + ',' + (-8.5 + baseHeight * 0.8 / 2 + 1) + ')'
                })
                .append('text')
                .on('click', function() {
                  // showFieldChart(d, arguments[0])
                })
                .attr('class', 'field')
                .attr('dx', '1em')
                .attr('dy', '1em')
                .text(function(e) {
                  return e
                })
            })
        })
        .each(function(d) {
          var baseHeight = d3.select(this).node().getBBox().height
          var baseWidth = d3.select(this).node().getBBox().width
          var control = d3.select(this)
            .append('g')
            .attr('class', 'control iconfont')

          control.append('rect')
            .attr('width', baseWidth * 0.3)
            .attr('height', baseHeight)
            .attr('transform', function() {
              return 'translate(' + baseWidth / 2 + ',' + (-baseHeight / 2) + ')'
            })

          control.append('text')
            .on('click', function(d) {
              that.toggleControlStyle(this)
              that.toggleDetailShow(this, d, that)
            })
            .attr('class', 'zoom-out')
            .html('全部')
            .attr('transform', function() {
              return 'translate(' + (baseWidth / 2 + baseHeight / 2) + ', 8.5)'
            })
        })
    },
    toggleControlStyle(exp) {
      d3.select(exp)
        .html(function() {
          return d3.select(exp).classed('zoom-out') ? '收缩' : '全部'
        })
        .each(function() {
          if (d3.select(exp).classed('zoom-out')) {
            d3.select(exp).attr('class', 'zoom-in')
          } else {
            d3.select(exp).attr('class', 'zoom-out')
          }
        })
    },
    toggleDetailShow(thisexp, d, thatexp) {
      d3.select(thisexp.parentNode.parentNode)
        .classed('detail-show', function() {
          // var isShow = d3.select(this).classed('detail-show')
          d3.select(this).select('g.detail').attr('display', 'none')
          // return isShow ? false : true
        })

      thatexp.svg.selectAll('g.node').sort(function(a) { // select the parent and sort the path's
        if (a !== d) return -1 // a is not the hovered element, send "a" to the back
        else return 1
      })
    },
    uuid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)
      }
      return (
        s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
      )
    },
    // control the canvas zoom to up or down
    zoomed() {
      d3.select(this.$el).select('g.container').attr('transform', d3.event.transform)
    },
    //  画节点
    strokeNodes() {
      // 获取之前的nodes缓存并清除
      const nodes = this.graph.nodes()
      if (nodes.length) {
        nodes.forEach(
          item => {
            this.graph.removeNode(item)
          })
      }
      //  通过operator来画shape(BranchPythonMapOperator: 分支； JoinOperator：合流)
      this.nodes.forEach((item) => {
        this.graph.setNode(item.id, { label: item.name + '表', shape: 'rect', paddingLeft: 20, paddingRight: 20 })
      })
      this.renderer(container, this.graph)
    },
    //  画线
    strokeEdges() {
    // 一个脚本节点时：不渲染eage
      if (this.nodes.length > 1) {
        this.edges.forEach((item) => {
          this.graph.setEdge(item.sourceTableId, item.targetTableId, { label: '', minlen: 6, id: item['applicationId'], weight: 5 })
        })
        this.renderer(container, this.graph)
      }
    },
    // 返回按钮
    comeBack() {
      this.$router.push('/meta/list/' + this.tableId)
    }
  }
}
</script>
<style lang="scss">
    .control text {
    text-anchor: middle;
    font-size: 18px;
    fill: #666;
    }

    .control text:hover {
        fill: #fe0000;
        cursor: pointer;
    }
    .btn-up {
        position: absolute;
        top: 2rem;
        left: 2rem;
    }

    .tips {
        font-size: 32px;
    }

    .btn-back {
        text-anchor: middle
    }

    .btn-back:hover {
        cursor: pointer;
    }

    .btn-back rect{
        fill: #fff;
        stroke: #000;
    }

    .node rect {
        stroke: #333;
        fill: #fff;
    }

    .table-relation .node .label:hover, .node .field:hover {
        cursor: pointer;
        fill: #fe0000;
    }
    .edgePath path {
        stroke: #333;
        fill: #333;
        stroke-width: 3px;
    }

    .text.field {
        text-anchor: left;
    }

    .control text {
        text-anchor: middle;
        font-size: 18px;
        fill: #666;
    }

    .control text:hover {
        fill: #fe0000;
        cursor: pointer;
    }

    .table text {
        text-anchor: middle;
        fill: #333;
        font-weight: bold;
    }

    .table text:hover {
        fill: #fe0000;
        cursor: pointer;
    }

    .detail {
        display: none;
        text-align: left;
    }

    .detail-show>rect {
        fill: #0066ff;
    }

    .detail-show>.label {
        fill: #fff;
    }

    .detail-show .detail {
        display: block;
    }
    g.edgePath:hover path {
        stroke: #fe0000;
        fill: #fe0000;
        cursor: pointer;
    }

    .detail-info-board .table-info {
        background-color: #d7d7d7;
        margin: 1rem;
        padding: 1rem;
        line-height: 2;
        display: none;
    }

    .detail-info-board .relation-info{
        /* background-color: #d7d7d7; */
        margin: 1rem;
        padding: 1rem;
    }

    .relation-info {
        display: none;
    }
</style>
