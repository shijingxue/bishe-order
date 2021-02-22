<template>
  <div class="buliding-order">
    <Mix nav1='订单管理' nav2='进行中订单'></Mix>
    <el-card>
      <!-- 订单ID  价格 下单时间 -->
      <table class="order-table">
        <tbody v-for="items in orderInfo" :key="items.orderId">
          <tr>
            <th colspan="26">
              <div>
                <span>订单ID：</span>
                {{items.orderId}}
              </div>
              <span class="line">|</span>
              <div>
                <span>总金额：</span>
                {{items.orderPrice}}
              </div>
              <div>
                <span>下单时间：</span>
                {{items.placeStratTime}}
              </div>
            </th>
          </tr>
          <tr class="order-detail">
            <el-table
              :data="orderDetail"
              style="width: 100%" stripe border>
              <el-table-column
                type="index"
                width="50"
                align="center">
              </el-table-column>
              <el-table-column
                prop="foodName"
                label="菜品名称"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="foodNum"
                label="菜品数量"
                width="300"
                align="center">
              </el-table-column>
              <el-table-column
                prop="foodPrice"
                label="菜品价格"
                align="center">
                <template slot-scope='scope'>
                  <div>{{scope.row.foodPrice}}元</div>
                </template>
              </el-table-column>
            </el-table>

          </tr>
        </tbody>
      </table>

      <div class="order-jiesuan" v-if="this.orderInfo.length !== 0">
        <el-button type="primary" class="btn-order" style="float:right" @click="payOrder">结算</el-button>
      </div>

      <div v-else class="order-empty">
        暂无订单哦~
      </div>

    </el-card>
  </div>
</template>

<script>
import api from '@/api/index'
import httpUtil from '@/utils/http-util'
export default {
  name: 'BulidingOrder',

  data () {
    return {
      orderInfo: [], // 订单数据
      orderDetail: [] // 订单详情
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      this.getOrderInfo()
    },

    // 获取订单信息
    getOrderInfo() {
      httpUtil.get(api.BUILDINGORDER, {}, res=>{
        // console.log(res)
        const data = res.data
        this.orderInfo = data
        this.$store.commit('setOrderId', data[0].orderId)
        this.getOrderDetail()
      })
    },

    // 订单详情
    getOrderDetail() {
      // console.log(this.orderInfo)
      httpUtil.get(api.REDERDETAIL, { orderId: this.orderInfo[0].orderId }, res=>{
        const data = res.data
        this.orderDetail = data
      })
    },

    // 结算
    payOrder() {
      this.$confirm('确定去结算了?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        httpUtil.post(api.PAYORDER, { orderId: this.orderInfo[0].orderId }, res => {
          // console.log(res)
          this.$message.success('结算成功')
          this.getOrderInfo()

          // 把正在进行中订单id清空
          this.$store.commit('setOrderId', null)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消结算'
        })
      })
    }

  }
}
</script>

<style scoped lang='less'>
  .buliding-order {
    .order-table {
      width: 100%;
      font-size: 14px;
      color: #333333;
      margin-bottom: 40px;

      th {
        height: 45px;
        background-color: #D9E9FE;
        border-top: 2px solid #037FF2;
        text-align: left;

        div {
          display: inline-block;
          padding: 5px 10px;

          span {
            color: #037FF2;
          }
        }

        .line {
          color: #fff;
        }
      }

      tbody {
        margin-bottom: 20px;
      }
    }

    // 结算
    .order-jiesuan {
      .btn-order {

        margin: 20px 0;
      }
    }

    .order-empty {
      font-size: 20px;
      text-align: center;
    }
  }
</style>
