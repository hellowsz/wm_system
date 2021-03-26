import index from '@/views/index'
const courierDistribution = {
    path: '/courierDistribution',
    component: index,
    meta: {
      title: '快递员分布'
    },
    children: [
      {
        path: '',
        name: 'courierDistribution',
        component: () => import('@/views/courierManagement/courierDistribution/index.vue'),
        meta: {
          title: '快递员分布'
        }
      }
    ]
  }
  
  export default courierDistribution