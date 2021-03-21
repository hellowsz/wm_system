import axios from '@/assets/js/request'

const baseUrl = 'http://127.0.0.1:5000/hello'

/**
 *查询广告位管理
 * @export
 * @param {*} params
 * @returns
 */
export function query (params) {
  return axios.postData(baseUrl, {
    body: params,
    requestSource: "CLConfigWeb"
})
}