import axios from '@/assets/js/request'

const baseUrl = 'http://127.0.0.1:5000//WMS/warehouseInfo/'

/**
 *查询仓储信息
 * @export
 * @param {*} params
 * @returns
 */
export function query (params) {
  return axios.postData(baseUrl + "query", {
    body: params,
    requestSource: "WHSOURCE"
})
}