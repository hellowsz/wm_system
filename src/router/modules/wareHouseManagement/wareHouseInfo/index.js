import index from '@/views/index'
const wareHouseInfo = {
    path: '/wareHouseInfo',
    component: index,
    meta: {
      title: '仓储信息'
    },
    children: [
      {
        path: '',
        name: 'wareHouseInfo',
        component: () => import('@/views/wareHouseManagement/wareHouseInfo/index.vue'),
        meta: {
          title: '仓储信息'
        }
      }
    ]
  }
  
  export default wareHouseInfo