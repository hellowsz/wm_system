import index from '@/views/index'
const wareHouseVisual = {
    path: '/wareHouseVisual',
    component: index,
    meta: {
      title: '仓储可视化报表'
    },
    children: [
      {
        path: '',
        name: 'wareHouseReport',
        component: () => import('@/views/wareHouseManagement/wareHouseVisual/index.vue'),
        meta: {
          title: '仓储可视化报表'
        }
      }
    ]
  }
  
  export default wareHouseVisual