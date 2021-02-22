<template>
  <div class="all-order">
    <Mix nav1='订单管理' nav2='全部订单'></Mix>
    <el-card>
      <el-table
        :data="orderList"
        style="width: 100%" stripe border>
        <el-table-column
          type="index"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orderId"
          label="订单id"
          align="center"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="foodNum"
          label="订单状态"
          align="center">
          <template slot-scope='scope'>
            <el-tag v-if="scope.row.orderType === '1'">结束</el-tag>
            <el-tag v-else type="danger">未结束</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="placeStratTime"
          label="订单开始时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="placeTime"
          label="订单结束时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orderPrice"
          label="订单总金额"
          align="center">
          <template slot-scope='scope'>
            <div>{{scope.row.orderPrice}}元</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope='scope'>
            <div style="color: #037FF2;cursor:pointer;" @click="getOrderDetail(scope.row.orderId)">详情</div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 订单详情对话框 -->
    <el-dialog
      title="订单详情"
      :visible.sync="orderDialogVisible"
      width="50%">
      <div>
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
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="orderDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import api from '@/api/index'
import httpUtil from '@/utils/http-util'
export default {
  name: 'AllOrder',

  data () {
    return {
      orderList: [],
      orderDetail: [],
      orderDialogVisible: false
    }
  },
  created() {
    this.getOrderList()
  },

  methods: {
    getOrderList() {
      httpUtil.get(api.ALLORDER, {}, res=>{
        this.orderList = res.data
      })
    },

    getOrderDetail(id) {
      httpUtil.get(api.REDERDETAIL, { orderId: id }, res=>{
        const data = res.data
        this.orderDetail = data
      })

      this.orderDialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
