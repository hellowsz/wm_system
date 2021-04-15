import axios from 'axios'
import qs from 'querystring'
import store from '@/store'
import router from '@/router'
import { MessageBox } from 'element-ui'

// 请求拦截
/**
 * 请求的配置，有请求方法传入
 * 目前支持type[用于确定网关域名]
 */
// let config.headers = {}
axios.interceptors.request.use(
  config => {
    // eslint-disable-next-line no-undef
    // config.headers = {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //   }  
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)
// 响应拦截
axios.interceptors.response.use(
  response => {
    let res = response.data
    
    return res
  },
  error => {
    if (error.response && error.response.status === 500) {
      MessageBox({
        title: '提示',
        message: '系统异常：' + error.response.data && error.response.data.message
      })
    } else if (error.response && error.response.status === 401) {
      // store.commit('CLEAR_USER_INFO')
      MessageBox({
        message: '用户信息已过期，请重新登录。',
        title: '提示',
        callback: function () {
          // 退出登录
          router.push('/login')
        }
      })
    } else if (error.response && (error.response.status === 404 || error.response.status === 415)) {
      MessageBox({
        message: '系统异常：' + error.response.data && error.response.data.message,
        title: '提示'
      })
    }
    return Promise.reject(error)
  }
)

// function requestHandle (config) {
// }
export default {
  postData (url, params, config) {
    // config.headers = config || {}
    // requestHandle(config)

    return axios.post(url, params || {}, {
      headers: config
    })
  },
  getData (url, params, config) {
    // requestHandle(config)
    // config.headers = config || {}
    return axios.get(url, params || {}, {
      headers: config
    })
  }
}
