import request from '@/utils/request'

export function getPaymentListApi(params) {
  return request({
    url: '/admin/payment/list',
    method: 'get',
    params: params
  })
}
