<template>
  <div class="order-statistic">
    <Mix nav1='统计' nav2='营业额统计'></Mix>
    <el-card>
      <div class="order-count">

      </div>
    </el-card>
  </div>
</template>

<script>
import api from '@/api/index'
import httpUtil from '@/utils/http-util'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/legend')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'OrderStatistic',
  data () {
    return {

    }
  },

  methods: {}
}
</script>

<style scoped>

</style>
