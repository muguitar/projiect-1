// 导入 Vue 和 VueRoute 的包
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入需要的组件
import Login from '@/components/MyLogin.vue'
import Home from '@/components/MyHome.vue'
// 导入需要的子组件
import Users from '@/components/menus/MyUsers.vue'
import Rights from '@/components/menus/MyRights.vue'
import Goods from '@/components/menus/MyGoods.vue'
import Orders from '@/components/menus/MyOrders.vue'
import Settings from '@/components/menus/MySettings.vue'
import UserDetail from '@/components/user/MyUserDetail.vue'

// 调用 Vue.use() 函数，把 VueRouter 安装为 Vue 的插件
Vue.use(VueRouter)

// 创建路由 VueRouter 的实例对象
const router = new VueRouter({
  // 定义路由规则
  routes: [
    // 路由重定向
    { path: '/', redirect: '/login' },
    // 登录的路由规则
    { path: '/login', component: Login },
    // 后台主页的路由规则
    {
      path: '/home', component: Home, redirect: '/home/users', children: [
        // 子路由规则
        { path: 'users', component: Users },
        { path: 'rights', component: Rights },
        { path: 'goods', component: Goods },
        { path: 'orders', component: Orders },
        { path: 'settings', component: Settings },
        // 用户详情页面的路由规则
        { path: 'userinfo/:id', component: UserDetail, props: true }
      ]
    }
  ]
})

// 全局前置守卫
router.beforeEach(function (to, from, next) {
  // 判断：访问的地址是不是后台主页
  if (to.path === '/home') {
    // 获取 token 值
    const token = localStorage.getItem('token')

    if (token) {
      // 如果是，且有 token 值，就放行
      next()
    } else {
      // 如果没有，就强制跳转到登录页面
      next('/login')
    }
  } else {
    // 如果访问的不是 home 直接放行
    next()
  }
})

// 向外共享路由的实例
export default router