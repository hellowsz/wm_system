import index from '@/views/index'
const wareHouseReport = {
    path: '/wareHouseReport',
    component: index,
    meta: {
      title: '仓储报表'
    },
    children: [
      {
        path: '',
        name: 'wareHouseReport',
        component: () => import('@/views/wareHouseManagement/wareHouseReport/index.vue'),
        meta: {
          title: '仓储报表'
        }
      }
    ]
  }
  
  export default wareHouseReport