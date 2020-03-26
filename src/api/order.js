import request from "@/utils/request";

export function getList(params) {
  return request({
    url: '/system/order/list',
    method: 'get',
    params: params
  })
}

export function addOrder(data) {
  return request({
    url: '/system/order/add',
    method: 'post',
    data: data
  })
}
