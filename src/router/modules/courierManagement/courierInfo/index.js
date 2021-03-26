import index from '@/views/index'
const courierInfo = {
    path: '/courierInfo',
    component: index,
    meta: {
      title: '快递员信息'
    },
    children: [
      {
        path: '',
        name: 'courierInfo',
        component: () => import('@/views/courierManagement/courierInfo/index.vue'),
        meta: {
          title: '快递员信息'
        }
      }
    ]
  }
  
  export default courierInfo