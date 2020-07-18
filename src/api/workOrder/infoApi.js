import request from '@/utils/request'

export function getInfoApi(params) {
  return request({
    url: '/admin/order/list',
    method: 'get',
    params: params
  })
}
