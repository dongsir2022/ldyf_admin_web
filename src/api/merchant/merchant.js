import request from '@/utils/request'

export function getMerchantList(params) {
  return request({
    url: '/merchant/list',
    method: 'get',
    params: params
  })
}

export function getMerchantAccountList(params) {
  return request({
    url: '/merchant/account/list',
    method: 'get',
    params: params
  })
}
