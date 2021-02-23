<template>
  <div class="order-statistic">
    <Mix nav1='统计' nav2='营业额统计'></Mix>
    <el-card>
      <div class="order-count">
        <div class="reserve" v-for="(item,index) in orderCount" :key="index" @click="projectTab(index)">
          <i class="project-icon"></i>
          <span class="names">{{item.name}} </span>
          <span class="pro-right">{{item.count==='null'?0:item.count}}元</span>
        </div>
      </div>

      <div class="order-zhexian" id="myChart" style="width: 800px;height:600px;"></div>
    </el-card>
  </div>
</template>

<script>
import api from '@/api/index'
import httpUtil from '@/utils/http-util'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import {
    LineChart
} from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
    CanvasRenderer
} from 'echarts/renderers'

// 注册必须的组件
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]
)
export default {
  name: 'OrderStatistic',
  data () {
    return {
      orderCount: [],
      orderStatistic: {}
    }
  },
  created() {
    this.init()
  },

  methods: {
    init() {
      this.getOrderCount()
      this.getOrderStatistic()
    },

    getOrderCount() {
      httpUtil.get(api.ORDERCOUNT, {}, res=>{
        this.orderCount = res.data
      })
    },

    // 折线图
    getOrderStatistic() {
      httpUtil.get(api.ORDERSTATISTIC, {}, res=>{
        this.orderStatistic = res.data

        this.drawLine()
      })
    },

    drawLine() {
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '七日销售额统计图'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
              return `营业额：${params[0].data}元</br>`
            }
        },
        xAxis: {
          type: 'category',
          data: this.orderStatistic.xAxis
        },
        yAxis: {
           type: 'value'
        },
        series: [{
          name: '营业额',
          type: 'line',
          data: this.orderStatistic.series,
          smooth: true
        }]
      })
    }

  }
}
</script>

<style scoped>
/* 项目统计 */
.order-count {
  width:100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.order-count div {
  display:inline-block;
  width: 24%;
  font-size: 18px;
  color: #fff;
  border-radius: 10px;
  border:1px solid rgba(235,238,245,1);
  padding: 20px 12px;
  box-sizing:border-box;
}

.order-count .reserve .pro-right {
  float: right;
  font-size: 24px;
}

.order-count .reserve {
  background:linear-gradient(351deg,rgba(63,118,251,1) 0%,rgba(97,173,252,1) 100%);
  cursor: pointer;
}

.order-count .reserve .names {
  float: left;
  margin-top: 5px;
}

.order-count .project-icon {
  float: left;
  width: 39px;
  height: 39px;
  background: url("../../assets/quick/reserve.png") no-repeat center;
  background-size: 100% 100%;
}

.order-count .reserve:nth-child(2){
  background:linear-gradient(351deg,rgba(255,168,56,1) 0%,rgba(255,201,86,1) 100%);
}

.order-count .reserve:nth-child(2) .project-icon{
  background: url("../../assets/quick/preliminary.png") no-repeat center;
}

.order-count .reserve:nth-child(3) {
  background:linear-gradient(351deg,rgba(134,97,245,1) 0%,rgba(171,151,255,1) 100%);
}

.order-count .reserve:nth-child(2) .project-icon{
  background: url("../../assets/quick/apply.png") no-repeat center;
}

.order-count .reserve:nth-child(4) {
  background:linear-gradient(90deg,rgba(0,214,137,1) 0%,rgba(0,199,127,1) 100%);
}

.order-count .reserve:nth-child(4) .project-icon{
  background: url("../../assets/quick/finished.png") no-repeat center;
}

.order-zhexian {
  margin: 20px 0;
}
</style>
