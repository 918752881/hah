<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
// import resize from './mixins/resize'

export default {
  // mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    data: {
      type: Array,
      default: () => [{ name: '温', value: '1' }, { name: '热', value: '1' }, { name: '冷', value: '1' }]
    },
    title: {
      type: String,
      default: '默认值'
    },
    color: {
      type: Array,
      default: () => ['#FFCD2B', '#FF5100', '#2CA3F0']
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    data(newvalue) {
      if (newvalue) {
        this.initChart()
      }
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      // console.log(this.data)
      this.chart.setOption({
        title: {
          text: this.title,
          x: 'center',
          top: '0',
          textStyle: {
            color: 'rgba(87, 85, 87, 1)',
            fontFamily: 'PingFangSC-Semibold',
            fontSize: 16,
            fontWeight: 'bolder'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        color: this.color,
        grid: {
          left: '0%',
          right: '0%',
          bottom: '-20%',
          top: '0%',
          containLabel: true
        },
        series: [{
          name: '热度',
          type: 'pie',
          radius: ['40%', '64%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              color: 'rgba(88, 88, 88, 1)',
              fontSize: 16
            }
          },
          labelLine: {
            normal: {
              show: true,
              lineStyle: {
                color: 'rgba(88, 88, 88, 1)',
                type: 'dash'
              }
            }
          },
          data: this.data
        }]
      })
      this.chart.on('click',function(param){
        console.log(param)
      })
    }
  }
}
</script>
