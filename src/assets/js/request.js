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
    config.cancelToken = new axios.CancelToken(function (cancel) {
      store.commit('common/SET_CANCELTOKEN', { cancelToken: cancel })
    })
    // eslint-disable-next-line no-undef
    let baseUrl = (commonParamH5 && commonParamH5[config.headers.type]) || ''
    let auth = store.state.common.user.auth
    if (!auth && config.url.indexOf("/login")==-1) {
      MessageBox({
        message: '登录过期',
        title: '提示',
        callback: function () {
          // 退出登录
          router.push('/login')
        }
      })
      return
    }
    config.url = baseUrl + config.url
    // ie 版本修改
    if (config.headers.type === 'clsettlegateway' || config.headers.type === 'profitAccounting') {
      config.data = JSON.stringify(config.data)
      if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        // console.log('ie')
        config.headers['Content-Type'] = 'text/plain;charset=utf-8'
      } else {
        config.headers['Content-Type'] = 'application/json;charset=utf-8'
      }
    }
    // config.data = qs.parse(qs.stringify(config.data)) 不行，会把数组转的有问题
    if (config.headers.type === 'restful') {
      config.headers['auth'] = auth
    } else if (config.headers.type === 'test' || baseUrl === '/static/data') {
      config.url += '.json'
    }else{
      config.headers['la517-authSign'] = auth
    }
    delete config.headers.type
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
    if (res.code === 4) {
      return res
      // MessageBox(res.message, '提示')
    } else if (res.code === 8888 || res.message === 'sessionID已过期，用户信息已失效') {
      store.commit('common/CLEAR_USER_INFO')
      MessageBox({
        message: '登录过期：' + res.message,
        title: '提示',
        callback: function () {
          // 退出登录
          router.push('/login')
        }
      })
    } else {
      return res
    }
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
