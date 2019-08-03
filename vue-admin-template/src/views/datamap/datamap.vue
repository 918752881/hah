<template>
  <div>
    <el-row>
      <el-col :xs="24" :md="6">
        <div>
          <div class="Index" style="margin-left:25%;">
            <p>资产活性指数</p>
            <ul class="activity">
              <li v-for="(item,index) in asset_alive_index" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
        <div>
          <div class="chart-container">
            <Contribute id="contribute" :data="contribute_score" :height="contributeHeight" />
          </div>
        </div>
        <div>
          <div class="chart-container">
            <Pie id="hot" :data="hotData" :height="hotHeight" title="数据访问热度" />
          </div>
        </div>
        <div class="box-card scope">
          <div class="chart-container">
            <Pie id="scope" :data="scopeata" :height="scopeHeight" title="数据访问广度" :color="color" />
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :md="12">
        <el-row>
          <el-col :span="24">
            <div>
              <div class="Index" style="margin-left:25%;">
                <p>资产规模指数</p>
                <ul class="activity">
                  <li v-for="(item,index) in asset_healthy_index" :key="index">{{ item }}</li>
                </ul>
              </div>
            </div>
          </el-col>
          <el-col :span="24" style="margin-top:10px">
            <div style="display: flex;justify-content: space-around;flex-wrap: nowrap;align-items:left">
              <div class="count">
                <div class="numberInfoSubTitle">实体总数</div>
                <div class="numberInfoValue">
                  <span class="numberInfoSuffix">{{ totalArr.total_table_count?totalArr.total_table_count:"--" }}</span>个
                </div>
              </div>
              <div class="count">
                <div class="numberInfoSubTitle">属性总数</div>
                <div class="numberInfoValue">
                  <span class="numberInfoSuffix">{{ totalArr.total_column_count?totalArr.total_column_count:"--" }}</span>个
                </div>
              </div>
              <div class="count">
                <div class="numberInfoSubTitle">存储总数</div>
                <div class="numberInfoValue">
                  <span class="numberInfoSuffix">{{ totalArr.total_storage?totalArr.total_storage:"--" }}</span>T
                </div>
              </div>
              <div class="count">
                <div class="numberInfoSubTitle">标签总数</div>
                <div class="numberInfoValue">
                  <span class="numberInfoSuffix">{{ totalArr.total_label?totalArr.total_label:"--" }}</span>个
                </div>
              </div>
              <div class="count">
                <div class="numberInfoSubTitle">指标总数</div>
                <div class="numberInfoValue">
                  <span class="numberInfoSuffix">{{ totalArr.total_index?totalArr.total_index:"--" }}</span>个
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="24" style="position:relative;">
            <div class="assetsSizeInfo">
              <div v-for="(item,index) in marketData" :key="index" class="attrInfo">
                <div class="attrTitle">{{ item.key?item.key:"--" }}</div>
                <div class="tableCount">表<span>{{ item.value?item.value:"--" }}</span>张</div>
              </div>
            </div>
            <div class="assetsSize" :style="{height:assetsSizeHeight}">
              <div class="rate">
                <div class="cjfgl">
                  <h1 class="jg">生产</h1>
                  <span>采集覆盖率<i>{{ markRate.etl_coverage_rate ? markRate.etl_coverage_rate+"%":"--" }}</i></span>
                </div>
                <div class="zldbl">
                  <h1 class="sc">加工</h1>
                  <span>质量达标率<i>{{ markRate.asset_healthy_index ? markRate.asset_healthy_index+"%":"--" }}</i></span>
                </div>
                <div class="sjsyl">
                  <h1 class="xf">消费</h1>
                  <span>数据使用率<i>{{ markRate.market_table_use_rate ? markRate.market_table_use_rate+"%":"--" }}</i></span>
                </div>
              </div>
              <div class="projectName">
                <span class="znkjqz">{{ Intelligent[0].key?Intelligent[0].key:"--" }}<i>表<em>{{ Intelligent[0].value?Intelligent[0].value:"--" }}</em>张</i></span>
                <span class="yhypt">{{ Intelligent[1].key?Intelligent[1].key:"--" }}<i>表<em>{{ Intelligent[1].value?Intelligent[1].value:"--" }}</em>张</i></span>
                <span class="zfyst">{{ Intelligent[2].key?Intelligent[2].key:"--" }}<i>表<em>{{ Intelligent[2].value?Intelligent[2].value:"--" }}</em>张</i></span>
                <span class="zhcf">{{ Intelligent[3].key?Intelligent[3].key:"--" }}<i>表<em>{{ Intelligent[3].value?Intelligent[3].value:"--" }}</em>张</i></span>
                <span class="phxd">{{ Intelligent[4].key?Intelligent[4].key:"--" }}<i>表<em>{{ Intelligent[4].value?Intelligent[4].value:"--" }}</em>张</i></span>
              </div>
              <div class="projectInfo">
                <div class="rw">
                  <span>任务</span>
                  <span>总任务数:<i>{{ markRate.job_num ? markRate.job_num:"--" }}</i>个</span>
                  <span>平均执行时长:<i>{{ markRate.avg_time_taken ? markRate.avg_time_taken:"--" }}</i>秒</span>
                </div>
                <div class="zt">
                  <span>主题</span>
                  <span><i>{{ markRate.subject_num ? markRate.subject_num:"--" }}</i>个</span>
                </div>
                <div class="js">
                  <span>计算</span>
                  <span>CPU:<i>{{ markRate.cpu_num ? markRate.cpu_num:"--" }}</i>个/秒</span>
                  <span>内存:<i>{{ markRate.mem_num ? markRate.mem_num:"--" }}</i>G/秒</span>
                </div>
                <div class="cckj">
                  <span>使用存储:<i>{{ markRate.total_storage ? markRate.total_storage:"--" }}</i>T</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="recentAdd" style="margin-left: 10px;">
              <ul>
                <li>
                  <div class="recentAddValue"><span>{{ recentAdd.incre_table_count_7days?recentAdd.incre_table_count_7days:"--" }}</span>个</div>
                  <div class="recentAddAttr">近7日新增实体</div>
                </li>
                <li>
                  <div class="recentAddValue"><span>{{ recentAdd.incre_col_count_7days?recentAdd.incre_col_count_7days:"--" }}</span>个</div>
                  <div class="recentAddAttr">近7日新增属性</div>
                </li>
                <li>
                  <div class="recentAddValue"><span>{{ recentAdd.incre_storage_7days?recentAdd.incre_storage_7days:"--" }}</span>T</div>
                  <div class="recentAddAttr">近7日新增存储</div>
                </li>
                <li>
                  <div class="recentAddValue"><span>{{ recentAdd.incre_lable_30days?recentAdd.incre_lable_30days:"--" }}</span>个</div>
                  <div class="recentAddAttr">近30日新增标签</div>
                </li>
                <li>
                  <div class="recentAddValue"><span>{{ recentAdd.incre_index_30days?recentAdd.incre_index_30days:"--" }}</span>个</div>
                  <div class="recentAddAttr">近30日新增指标</div>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :md="6">
        <div>
          <div class="Index">
            <p>资产健康度指数</p>
            <ul class="activity">
              <li v-for="(item,index) in asset_scale_index" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
        <div>
          <div class="chart-container">
            <Quality id="qualityMap" :data="qualityMap" :height="qualityMapHeight" />
          </div>
        </div>
        <div>
          <div id="qualityRank">
            <h1>数据质量排行榜</h1>
            <div class="rank">
              <table class="rankTable" :style="{height:rankTableHeight}">
                <thead>
                  <tr>
                    <td>质量排名</td>
                    <td>系统名称</td>
                    <td>排名变化(对比上周）</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in qualityRank" :key="index" :class="index%2===0?'even':'odd'">
                    <td>{{ item.num?item.num:index }}</td>
                    <td>{{ item.name?item.name:'--' }}</td>
                    <td>
                      <span :class="item.change<0?'triangle_border_down':item.compare>0?'triangle_border_up':'line'" />{{ item.compare }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { DATA_MAP } from '@/api/api'
import Contribute from '@/components/Charts/BarCon'
import Pie from '@/components/Charts/Pie'
import Quality from '@/components/Charts/BarQuality'
export default {
  components: { Contribute, Pie, Quality },
  data() {
    return {
      'width': document.documentElement.clientWidth,
      'screenHeight': window.screen.height,
      'asset_alive_index': [0],
      'asset_healthy_index': [0],
      'asset_scale_index': [0],
      'contribute_score': [0, 0, 0],
      'hotData': [{ name: '温', value: '1' }, { name: '热', value: '1' }, { name: '冷', value: '1' }],
      'scopeata': [{ name: '中', value: '1' }, { name: '广', value: '1' }, { name: '小', value: '1' }],
      'color': ['#7070FF', '#DD1C37', '#999999'],
      'qualityMap': [],
      'qualityRank': [],
      'totalArr': {},
      'marketData': [{ 'key': '--', 'value': '--' }, { 'key': '--', 'value': '--' }, { 'key': '--', 'value': '--' }, { 'key': '--', 'value': '--' }],
      'recentAdd': {},
      'markRate': {},
      'Intelligent': [{ 'key': '--', 'value': '--' }, { 'key': '--', 'value': '--' }, { 'key': '--', 'value': '--' }, { 'key': '--', 'value': '--' }, { 'key': '--', 'value': '--' }],
      infoList: {
        'asset_alive_index': '93362',
        'asset_healthy_index': '65',
        'asset_scale_index': '11819',
        'avg_time_taken': '62',
        'cpu_num': '50',
        'dept_contribute_score_set': ['普惠:73', '用户平台部:63', '财富:38', '支付:33', '全行:48'],
        'dept_table_count_set': ['支付与生态:518', '普惠信贷:162', '智能科技群组:7906', '智能财富:1868', '用户与平台:126'],
        'etl_coverage_rate': '21',
        'etl_dt': '20190624',
        'hotpoint_cold': '13599',
        'hotpoint_hot': '1574',
        'hotpoint_mid': '2919',
        'incre_col_count_7days': '10115',
        'incre_index_30days': '15',
        'incre_lable_30days': '4278',
        'incre_storage_7days': '30',
        'incre_table_count_7days': '396',
        'incre_table_count_30days': '6167',
        'job_num': '52683',
        'market_table_count_set': ['数据服务:221', '普惠集市:293', '用户画像:171', '风险集市:572'],
        'market_table_use_rate': '19',
        'mem_num': '151',
        'quality_rank_map_set': ['微信银行:1:0', '风险管理平台:2:0', '互金存管系统:3:0', '移动柜面:4:1', '卡管系统:5:-1', '爱奇艺系统:6:0', '单点登录:7:0', '统一支付平台(收单):8:0', '统一支付平台(支付):9:0', '体验金系统:10:0'],
        'quatity_quality_map_set': ['百度闪付系统:54.254644876654446:0.18958462757867225', '账务管理中心:71.23568438743281:3.4393007861870997', '消费信贷系统:63.55228674819685:15.799790064480915', '卡管系统:98.1254976857102:0.36738715965810503', '公司网银:44.582231651860305:2.077933206229515', '电子回单:0.609672443387262:0.15638054026263362'],
        'subject_num': '7',
        'total_column_count': '716841',
        'total_index': '384',
        'total_label': '11490',
        'total_storage': '271',
        'total_table_count': '27339',
        'visit_big': '83',
        'visit_mid': '643',
        'visit_small': '696' }
    }
  },
  computed: {
    contributeHeight() {
      // console.log(this.screenHeight)
      if (this.screenHeight > 1000) {
        return this.screenHeight * 0.26 + 'px'
      } else {
        return this.screenHeight * 0.25 + 'px'
      }
    },
    hotHeight() {
      if (this.screenHeight > 1000) {
        return this.screenHeight * 0.235 + 'px'
      } else {
        return this.screenHeight * 0.22 + 'px'
      }
    },
    scopeHeight() {
      if (this.screenHeight > 1000) {
        return this.screenHeight * 0.235 + 'px'
      } else {
        return this.screenHeight * 0.22 + 'px'
      }
    },
    qualityMapHeight() {
      if (this.screenHeight > 1000) {
        return this.screenHeight * 0.31 + 'px'
      } else {
        return this.screenHeight * 0.28 + 'px'
      }
    },
    assetsSizeHeight() {
      if (this.screenHeight > 1000) {
        return this.screenHeight * 0.56 + 'px'
      } else {
        return this.screenHeight * 0.51 + 'px'
      }
    },
    rankTableHeight() {
      if (this.screenHeight > 1000) {
        return this.screenHeight * 0.34 + 'px'
      } else {
        return this.screenHeight * 0.315 + 'px'
      }
    }
  },
  created() {
    this.$axios({
      url: DATA_MAP,
      method: 'get'
    }).then(res => {
      this.infoList = res.data.data[0]
      if (this.infoList) {
        this.asset_alive_index = this.getNum(this.infoList.asset_alive_index)
        this.asset_healthy_index = this.getNum(this.infoList.asset_healthy_index)
        this.asset_scale_index = this.getNum(this.infoList.asset_scale_index)
        // 贡献度
        this.contribute_score = this.splitStr(this.infoList.dept_contribute_score_set)
        // 热度
        this.hotData = [
          { value: this.infoList.hotpoint_mid, name: '温' },
          { value: this.infoList.hotpoint_hot, name: '热' },
          { value: this.infoList.hotpoint_cold, name: '冷' }]
        // 广度
        this.scopeata = [
          { value: this.infoList.visit_mid, name: '中' },
          { value: this.infoList.visit_big, name: '广' },
          { value: this.infoList.visit_small, name: '小' }]
        // 质量价值图
        this.qualityMap = this.threeArr(this.infoList.quatity_quality_map_set)

        // 质量排行榜
        this.qualityRank = this.handelRankData(this.infoList.quality_rank_map_set)
        // console.log(this.qualityRank)

        // 实体总数、属性总数、存储总数、标签总数、指标总数等
        this.totalArr = {
          'total_table_count': this.infoList.total_table_count,
          'total_column_count': this.infoList.total_column_count,
          'total_storage': this.infoList.total_storage,
          'total_label': this.infoList.total_label,
          'total_index': this.infoList.total_index
        }
        // 数据服务、风险集市等
        this.marketData = this.splitStr(this.infoList.market_table_count_set)

        // 近七日或30日新增
        this.recentAdd = {
          'incre_table_count_7days': this.infoList.incre_table_count_7days,
          'incre_col_count_7days': this.infoList.incre_col_count_7days,
          'incre_storage_7days': this.infoList.incre_storage_7days,
          'incre_lable_30days': this.infoList.incre_lable_30days,
          'incre_index_30days': this.infoList.incre_index_30days
        }

        // 市场各种百分比
        this.markRate = {
          'etl_coverage_rate': this.infoList.etl_coverage_rate, // 采集覆盖率
          'asset_healthy_index': this.infoList.asset_healthy_index, // 质量达标率
          'market_table_use_rate': this.infoList.market_table_use_rate, // 数据使用率
          'job_num': this.infoList.job_num, // 任务总数
          'avg_time_taken': this.infoList.avg_time_taken, // 平均时长
          'subject_num': this.infoList.subject_num, // 主题个数
          'cpu_num': this.infoList.cpu_num, // cpu数
          'mem_num': this.infoList.mem_num, // 内存
          'total_storage': this.infoList.total_storage // 存储空间
        }
        // 智能科技群组
        this.Intelligent = this.splitStr(this.infoList.dept_table_count_set)
        // console.log(this.Intelligent)
      }
    }).catch(() => {
      this.$message.error('数据地图资源加载错误')
    })
  },
  methods: {
    getNum(data) {
      var arr = []
      for (var i = 0; i < data.length; i++) {
        arr.push(data[i])
      }
      return arr
    },
    splitStr(data) {
      // console.log(data)
      // 数据贡献完成情况
      var brr = []
      var arr = JSON.parse(data)
      if (arr.length > 0) {
        arr.map(function(value, index) {
          brr.push({
            key: value.split(':')[0] ? value.split(':')[0] : '--',
            value: value.split(':')[1] ? value.split(':')[1] : '--'
          })
        })
      }
      return brr
    },
    // 质量价值图数据处理
    threeArr(data) {
      var brr = []
      var arr = JSON.parse(data)
      if (arr.length > 0) {
        arr.map(function(value) {
          brr.push([
            value.split(':')[1],
            value.split(':')[2],
            value.split(':')[0]
          ])
        })
      } else {
        brr.push([1, 1, '1'])
      }
      return brr
    },
    handelRankData(data) {
      var brr = []
      var arr = JSON.parse(data)
      if (arr.length > 0) {
        arr.map(function(value, index) {
          brr.push({
            'num': value.split(':')[1],
            'name': value.split(':')[0],
            'change': value.split(':')[2],
            'compare': Math.abs(value.split(':')[2])
          })
        })
      } else {
        brr.push({
          'num': '--',
          'name': '--',
          'change': 'zero',
          'compare': '--'
        })
      }
      return brr
    }
  }
}
</script>
<style lang='scss'>
    @import '~@/styles/index.scss';
    .scope{
        margin-top:-20px;
    }
    .Index {
        width: 300px;
        height: 80px;
        text-align: center;
        //margin-top: 30px;
        font-family: 'PingFangSC-Regular';
        font-weight: bold;
        font-size: 30px;
    }

    .Index p {
        text-align: left;
        height: 14px;
        font-size: 16px;
        font-family: 'PingFangSC-Regular';
        // font-weight: bold;
        color: rgba(87, 85, 87, 1);
        line-height: 24px;
    }

    .Index ul {
        width: 100%;
        margin-top: 20px;
        overflow: hidden;
    }

    .Index ul li {
        width: 26px;
        height: 40px;
        float: left;
        color: #fff;
        background: #0B53E8;
        font-size: 30px;
        font-family: 'Grixel Acme 5 CompCapsOX';
        line-height: 42px;
        text-align: center;
        margin-right: 10px;
        /* flex:1; */
    }

    .count{
        flex:1;
        margin-right: 10px;
    }

    /* 中部背景 */
    .numberInfoSubTitle {
        width: 100%;
        height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 700;
        color: #565456;
        line-height: 14px;
    }

    .numberInfoValue {
        width: 100%;
        height: 23px;
        font-size: 30px;
        font-family: DINCondensed-Bold;
        font-weight: bold;
        color: #FF4A7A;
        line-height: 38px;
    }

    .numberInfoValue {
        font-size: 9px;
    }

    .numberInfoSuffix {
        font-size: 26px;
        display: inline-block;
        margin-right: 5px;
        font-family: 'DINCondensed-Bold';
        font-weight: bold;
    }
    /* 大背景图 */
    .assetsSize {
        height:500px;
        margin-top: 10px;
        width: 100%;
        background-image: url('../../assets/images/bg_chart.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: relative;
        color: #898789;
    }

    .assetsSizeInfo {
        width: 74%;
        height: 48px;
        font-size: 12px;
        transition: scale(0.833);
        position: absolute;
        top: 12px;
        left: -1px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border: 0px solid rgba(158, 255, 255, 1);
        background-image: url('../../assets/images/ba.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        color:#fff;
    }

    .assetsSizeInfo .attrInfo {
        flex: 1；
    }

    .assetsSizeInfo .attrInfo div {
        height: 18px;
        line-height: 18px;
        text-align: center;
    }

    .assetsSizeInfo .attrInfo .attrTitle {
        font-size: 12px;
    }

    .assetsSizeInfo .attrInfo .tableCount span {
        margin-left: 4px;
        margin-right: 4px;
        font-size: 14px;
    }

    .assetsSize i,
    em {
        font-style: normal;
    }

    .assetsSize span {
        display: block;
        text-align: center
    }
    .assetsSize .rate h1 {
        color: rgba(255, 113, 32, 1);
        font-size: 24px;
        font-family: 'SimHei',黑体;
        margin:0 0 3px 0;
    }
    .assetsSize .rate span{
        color:rgba(88, 88, 88, 1);
        font-weight:bold;
    }

    .assetsSize .rate div {
        text-align: center;
        font-size: 14px;
    }

    .assetsSize .rate i {
        color: rgba(255, 113, 32, 1);
        margin-left: 4px;
    }

    .projectName {
        span{
            color:rgba(255, 113, 32, 1);
            font-size:12px;
            font-family:PingFangSC-Medium;
            font-weight:bold;
            background:rgba(254,254,254,1);
            border:1px solid rgba(0,160,233,1);
            border-radius:10px;
            padding:2px 4px;
        }
        i {
        margin-left: 4px;
        }
    }
    .projectInfo{
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:18px;
    }
        /* 中间底部 */
    .recentAdd ul {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .recentAdd ul li {
        flex: 1;
        width: 110px;
        height: 70px;
        background-image: url('../../assets/images/bg_chart_01.png');
        background-size: 100% 100%;
        margin-right: 20px;
    }

    .recentAdd ul li div {
        text-align: center;
        font-size:12px;
    }

    .recentAdd ul li .recentAddValue {
        height: 24px;
        font-size: 12px;
        font-family: DINCondensed-Bold;
        margin-top: 7px;
        font-weight:bold;
        color:rgba(255,255,255,1);
    }

    .recentAdd ul li .recentAddValue span {
        font-size: 24px;
        margin-right: 4px;
        font-family:DINCondensed-Bold;
    }

    .recentAdd ul li .recentAddAttr {
        padding:4px 0;
        height: 24px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
    }
    /* 右部 */
    #qualityRank{
        width:100%;
        h1 {
        width: 100%;
        height: 14px;
        font-size: 16px;
        font-family: 'PingFangSC-Semibold';
        font-weight: bold;
        color: rgba(87, 85, 87, 1);
        line-height: 10px;
        text-align: center;
        padding: 10px 0px;
        margin-bottom:15px;
        }
    }
    .rank{
        overflow: hidden;
        padding:6px 5px;
        margin-right:10px;
        /* background: url("../../assets/images/bord1.png") 0 0 no-repeat,
        url("../../assets/images/bord2.png") 0 0 no-repeat; */
        background-image: url("../../assets/images/bord.png");
        background-size: 100% 100%;
        position: relative;
    }
    .rankTable {
        width: 100%;
        font-size: 12px;
        border-spacing:0px 4px;
    }

    /*设置奇数行颜色*/
    .rankTable .odd {
        background-color: rgba(127, 222, 255, 0.5);
    }

    /*设置偶数行颜色*/
    .rankTable .even {
        background-color: rgba(245, 177, 128, 0.5);
    }

    .rankTable tr td {
        text-align: center;
        color: rgba(88, 88, 88, 1);
        font-weight:1000;
    }

    .triangle_border_down {
        width: 0;
        height: 0;
        border:7px solid transparent;
        border-bottom-color: #E30A20;
        /*透明 透明  灰*/
        position: relative;
        top: -12px;
        margin-right: 10px;
    }

    .triangle_border_up {
        width: 0;
        height: 0;
        border:7px solid transparent;
        border-top-color: #009847;
        /*灰 透明 透明 */
        position: relative;
        top: 12px;
        margin-right: 10px;
    }
    .line{
        display:inline-block;
        width: 7px;
        border-top:1px solid rgba(88, 88, 88, 1);
        /*灰 透明 透明 */
        position: relative;
        top: -3px;
        margin-right: 10px;
    }
    .cjfgl {
        position: absolute;
        left: 4%;
        top: 41.6%;
    }

    .zldbl {
        position: absolute;
        left: 17%;
        top: 25.5%;
    }

    .sjsyl {
        position: absolute;
        left: 47%;
        top: 11.7%;
    }

    .znkjqz {
        position: absolute;
        left: 9%;
        top: 78%;
    }

    .yhypt {
        position: absolute;
        left: 15%;
        top: 73%;
    }

    .zfyst {
        position: absolute;
        left: 21%;
        top: 68%;
    }

    .zhcf {
        position: absolute;
        left: 29%;
        top: 62%;
    }

    .phxd {
        position: absolute;
        left: 35%;
        top: 57%;
    }

    .rw {
        position: absolute;
        left: 41%;
        top: 82%;
    }

    .zt {
        position: absolute;
        left: 71%;
        top: 85%;
    }

    .js {
        position: absolute;
        left: 80%;
        top: 73%;
    }

    .cckj {
        position: absolute;
        left: 81%;
        top: 58%;
    }
</style>
