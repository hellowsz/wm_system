import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  {
    path:'/login',
    name:'login',
    component: () => import('@/views/login'),
    meta:{
      title:'登录'
    }
  },
  {
    path:'/index',
    name:'index',
    component: () => import('@/views/index'),
    meta:{
      title:'物流管理系统'
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
