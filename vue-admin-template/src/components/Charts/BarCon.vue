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
      default: '400px'
    },
    data: {
      type: Array,
      default: () => [{key:"普惠",value:"0"},{key:"用户平台部",value:"0"},{key:"财富",value:"0"},{key:"支付",value:"0"}]
    }
  },
  data() {
    return {
      chart: null,
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
      var data=this.data
      // console.log(this.data)
        //数据标记
        var markData = [];//气泡数据
        var nameData = [];//坐标轴数据
        var Data = []//柱状图数据
        var quanhang = 0;
        data.map(function (value,index) {
            if (value.key == "全行") {
                quanhang = value.value;
            } else {
                // console.log(value.value)
                nameData.push(value.key)
                Data.push(value.value)
                markData.push({
                    name: value.key,
                    coord: [index, value.value],
                    value: value.value + "%",
                })
            }
        })
      this.chart.setOption( {
            title: {
                text: '数据贡献度完成情况',
                x: 'center',
                textStyle: {
                    color: 'rgba(87, 85, 87, 1)',
                    fontFamily: "PingFangSC-Semibold",
                    fontSize: 16
                },
            },
            textStyle: {
                color: "rgba(0, 0, 0, 1)",
                fontSize: 12,
                fontFamily: 'Adobe Heiti Std R'
            },
            tooltip: {
                trigger: 'axis'
            },
            calculable: true,
            grid: {
                left: '2%',
                right: '12%',
                bottom: '0',
                containLabel: true,
            },
            xAxis: [
                {
                    name: '部门',
                    type: 'category',
                    nameGap: 0,
                    nameTextStyle: {
                        fontFamily: "Adobe Heiti Std R",
                        fontWeight: "normal",
                        color: "rgba(88, 88, 88, 1)",
                        verticalAlign: "bottom",
                        padding: [25, 0, 0, 5],
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#E0E0E0",
                            opacity: 1,
                        }
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,//强制所有的坐标轴文字显示
                        rotate: 45,   //顺时针旋转45度
                        textStyle: {
                            color: 'rgba(88, 88, 88, 1)',  //更改坐标轴文字颜色
                            fontSize: 12      //更改坐标轴文字大小
                        }
                    },
                    // splitLine: {//右侧x柱坐标线
                    //     show: true,
                    //     interval: '4',
                    // },
                    data: nameData,
                }
            ],
            yAxis: [
                {
                    name: "完成度(%)",
                    type: 'value',
                    nameTextStyle: {
                        fontFamily: "Adobe Heiti Std R",
                        fontWeight: "normal",
                        color: "rgba(88, 88, 88, 1)",
                        padding: [0, 0, 0, 10]
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#E0E0E0",
                            opacity: 1,
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: 'rgba(88, 88, 88, 1)',  //更改坐标轴文字颜色
                            fontSize: 12      //更改坐标轴文字大小
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#E0E0E0",
                            opacity: 0.4,
                        }
                    },
                    min: 0,
                    max: 100,
                }
            ],
            series: [
                {
                    barWidth: 15,
                    barCategoryGap: '1%',//柱图间距
                    name: '贡献度',
                    type: 'bar',
                    // data: [2.0, 4.9, 7.0, 23.2],
                    data: Data,
                    markPoint: {
                        itemStyle: {
                            color: "#fff",
                            borderColor:"#DBDBDB",
                            borderWidth: '1',
                            width: "25px",
                            height: "35px",
                        },
                        data: markData,
                    },
                    // markLine: {//开始标预警线
                    //     itemStyle: {
                    //         normal: {
                    //             borderWidth: 1,
                    //             lineStyle: {
                    //                 type: 'solid',
                    //                 color: "#45C8FF",
                    //                 //color: '#7E81B1',
                    //                 width: 2,
                    //             },
                    //             label: {
                    //                 formatter: '全行',
                    //                 textStyle: {
                    //                     fontSize: 14,
                    //                     fontWeight: "bolder",
                    //                     color: '#7E81B1',
                    //                 },
                    //             }
                    //         },

                    //     },
                    //     data: [
                    //         {
                    //             name: '全行',
                    //             yAxis: quanhang,
                    //         },
                    //     ],
                    // },
                    itemStyle: {
                        normal: {
                            //颜色渐变
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 1,
                                color: '#044996'
                            }, {
                                offset: 0,
                                color: '#33B2FF'
                            }])
                        }
                    }
                },
            ]
        })
    }
  },
  watch:{
    data(newvalue) {
      if(newvalue){
        this.initChart()
      }
    }
  }
}
</script>
