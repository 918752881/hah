<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'

export default {
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
      default: '400px'
    },
    data: {
      type: Array,
      // default: () => [{key:"普惠",value:"0"},{key:"用户平台部",value:"0"},{key:"财富",value:"0"},{key:"支付",value:"0"}]
    }
  },
  data() {
    return {
      chart: null
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
      var data = this.data
      // console.log(data)
      var xAverge = '';
        var yAverge = '';
        var xArr = [];
        var yArr = [];
        data.map(function (value) {
            xArr.push(value[0])
            yArr.push(value[1])
        })
        xArr.sort(function (a, b) {
            return a - b
        })
        yArr.sort(function (a, b) {
            return a - b
        })
        // 取中位数
        // console.log(xArr,'-----',yArr)
        var exp = null;
        if (xArr.length % 2){ // 奇数
            exp = (xArr.length + 1)/2
            xAverge =  xArr[exp]/1
        } else {
            exp = xArr.length/2
            xAverge =  (xArr[exp]/1 + xArr[exp-1]/1)/2
        }
        if (yArr.length % 2){ // 奇数
            exp = (yArr.length + 1)/2
            xAverge =  xArr[exp]/1
        } else {
            exp = yArr.length/2
            yAverge =  (yArr[exp]/1 + yArr[exp-1]/1)/2
        }
        
         // console.log(xAverge, yAverge)
      this.chart.setOption( {
            title: {
                text: '质量价值评价图',
                x: 'center',
                textStyle: {
                    color: 'rgba(87, 85, 87, 1)',
                    fontFamily: "PingFangSC-Semibold",
                    fontSize: 16,
                    fontWeight: 'bolder'
                },
            },
            grid: {
                left: '3%',
                right: '28%',
                bottom: '10%',
                containLabel: true,
            },
            xAxis: {
                name: "质量分",
                type: 'value',
                nameTextStyle: {
                    fontFamily: "Adobe Heiti Std R",
                    color: "rgba(88, 88, 88, 1)",
                    fontWeight: 'bolder',
                    verticalAlign: "bottom",
                    //padding: [25, 0, 0, -10],
                },
                splitLine: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: "#E0E0E0",
                        opacity: 1,
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: 'rgba(88, 88, 88, 1)',  //更改坐标轴文字颜色
                        fontSize: 12,    //更改坐标轴文字大小
                        fontWeight: 'bolder' 
                    }
                },
                splitArea: {
                    show: false,
                }
            },
            yAxis: {
                name: "价值分",
                type: 'value',
                nameTextStyle: {
                    fontFamily: "Adobe Heiti Std R",
                    color: "rgba(88, 88, 88, 1)",
                    fontWeight: 'bolder' 
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "#E0E0E0",
                        opacity: 0.4,
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "#E0E0E0",
                        opacity: 1,
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: 'rgba(88, 88, 88, 1)',  //更改坐标轴文字颜色
                        fontSize: 12,   //更改坐标轴文字大小
                        fontWeight: 'bolder'      
                    }
                },
                splitArea: {
                    show: false,
                },
                scale: true
            },
            series: [{
                symbolSize: 12,
                data: data,
                type: 'scatter',
                label: {
                    emphasis: {
                        show: true,
                        formatter: function (param) {
                            return param.data[2];
                        },
                        distance: 1,
                        position: 'right',
                        color: "rgba(0, 0, 0, 1)",
                        fontWeight:'bolder',
                        backgroundColor: "rgba(254, 254, 254, 0.5)",
                        borderColor:'rgba(0, 0, 0, 1)',
                        borderWidth:'1',
                        borderRadius: 15,
                        padding: [2, 2, 2, 2]
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#00BEFF",
                        borderColor: "rgba(0,190,255,0.5)",
                        borderWidth: 12,
                    }
                },
                markLine: {
                    silent: true,
                    label: {
                        show: false,
                    },
                    lineStyle: {
                        type: 'dash',
                        color: "rgba(88, 88, 88, 0.8)",
                    },
                    data: [
                        // { type: 'average', name: '平均值' },
                        // { type: 'average', name: '平均值' },
                        { xAxis: xAverge, name: "X轴" },
                        { yAxis: yAverge, name: "y轴" },
                    ]
                }
            }]
        })
    }
  },
  watch: {
      data(newvalue){
          if(newvalue){
              this.initChart()
          }
      }
  }
}
</script>
