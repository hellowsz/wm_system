import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/index.scss'
import $ from 'jquery';
import BaiduMap from 'vue-baidu-map'
import "./assets/css/iconfont/iconfont.css"
import dataV from '@jiaminghi/data-view'
import VCharts from 'v-charts'


Vue.use(dataV)
Vue.use(VCharts)

Vue.use(BaiduMap, {
  /* 需要注册百度地图开发者来获取你的ak */
  ak: 'x6ahW0fUsw5aXfIqgQLHan81nzTo6MDG'
})
window.jQuery = $;
window.$ = $;

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
