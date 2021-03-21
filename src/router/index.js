import Vue from 'vue'
import VueRouter from 'vue-router'
import wareHouseManagement from './modules/wareHouseManagement'

Vue.use(VueRouter)

const commonRoutes = [
  {
    path:'/login',
    name:'login',
    component: () => import('@/views/login'),
    meta:{
      title:'登录'
    }
  },
  {
    path:'/',
    name:'index',
    component: () => import('@/views/index'),
    meta:{
      title:'物流管理系统'
    },
  },
]

export const asyncRoutes = [ ...wareHouseManagement]

const createRouter = () => new VueRouter({
  mode: 'history', // require service support
  routes: [ ...commonRoutes, ...asyncRoutes ]
  // routes: [ ...commonRoutes ]

})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}


export default router
