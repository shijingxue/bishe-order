// 主机地址
import HOST from '@/api/host'

// 合并Api
const api = {
  LOGIN: '/login',
  // 查询所有菜品
  SELECTALLFOOD: '/food/selectAllFoodList',
  // 新增菜品
  ADDFOOD: '/food/addFood',
  FOODIMAGE: '/food/fileUp',
  // 修改菜品
  EDITFOOD: '/food/updateFood',
  // 删除菜品
  DELETEFOOD: '/food/deleteFood',

  // 根据菜品种类id查询菜品列表
  SELECTFOODTYPELIST: '/food/selectFoodList',
  // 为菜品种类新增菜品
  FOODTYPESETFOOD: '/food/FoodTypesetFood',
  // 为菜品种类移除菜品
  REMOVEFOODFORTYPE: '/food/FoodTypedeleteFood',

  // 新增菜品种类
  ADDFOODTYPE: '/foodType/addFoodType',
  // 查询所有菜品种类
  SELECTALLFOODTYPE: '/foodType/selectFoodType',
  // 修改菜品种类
  EDITFOODTYPE: '/foodType/updateFoodType',
  // 删除菜品种类
  DELETEFOODTYPE: '/foodType/deleteFoodType',

  // 用户操作
  // 新增用户
  ADDUSERS: '/user/addUser',
  // 重置密码
  RESETPASSWORD: '/user/resetPassWord',
  // 修改密码
  UPDATEPASSWORD: '/user/updatePassWord',

  // 为菜品下单
  USERORDERXIADAN: '/userOrder/xiadan',
  // 加菜
  JIACAIORDER: '/userOrder/jiacai',
  // 正在进行中订单
  BUILDINGORDER: '/userOrder/getType2Order',
  // 获取当前订单详情
  REDERDETAIL: '/userOrder/getFoodByOrder',
  // 订单结算
  PAYORDER: '/userOrder/jiesuan',
  // 获取当前所有订单
  ALLORDER: '/userOrder/getAllOrder',

  // 营业额统计
  ORDERCOUNT: '/userOrder/getUserOrderCount',
  // 营业额折线图
  ORDERSTATISTIC: '/userOrder/getZhouCount'

}

// Api添加主机地址
for (let key in api) {
  api[key] = HOST + api[key]
}

// 导出Api
export default api
