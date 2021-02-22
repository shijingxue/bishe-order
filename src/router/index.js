import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName:"login_home_hello" */ '../views/Login.vue')
const Home = () => import(/* webpackChunkName:"login_home_hello" */ '../views/Home.vue')
// const Hello = () => import(/* webpackChunkName:"login_home_hello" */ '../views/Hello.vue')
const FoodList = () => import(/* webpackChunkName:"department" */ '../views/Food/FoodList.vue')
const NewUser = () => import(/* webpackChunkName:"department" */ '../views/User/NewUser.vue')
const ChangePwd = () => import(/* webpackChunkName:"employee" */ '../views/User/ChangePwd.vue')
const BulidingOrder = () => import(/* webpackChunkName:"employee" */ '../views/Order/BulidingOrder.vue')
const AllOrder = () => import(/* webpackChunkName:"reward" */ '../views/Order/AllOrder.vue')
const OrderStatistic = () => import(/* webpackChunkName:"user" */ '../views/Statistic/OrderStatistic.vue')
// const Check = () => import(/* webpackChunkName:"check" */ '../views/check/Check.vue')
// const Pay = () => import(/* webpackChunkName:"pay" */ '../views/pay/Pay.vue')

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/',
          redirect: '/foodlist'
        },
        // {
        //   path: '/hello',
        //   component: Hello
        // },
        {
          path: '/foodlist',
          component: FoodList
        },
        {
          path: '/newuser',
          component: NewUser
        },
        {
          path: '/changepwd',
          component: ChangePwd
        },
        {
          path: '/bulidingorder',
          component: BulidingOrder
        },
        {
          path: '/allorder',
          component: AllOrder
        },
        {
          path: '/orderstatistic',
          component: OrderStatistic
        }
      ]
    }
  ]
})
// 路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     return next()
//   }
//   //  如果访问的不是登录页 则验证他们的token
//   const isToken = window.sessionStorage.getItem('token')
//   if (!isToken) {
//     return next('/login')
//   }
//   next()
// })
export default router
