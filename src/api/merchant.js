import request from "@/utils/request";

export function getMerchantList(params) {
  return request({
    url: '/system/merchant/list',
    method: 'get',
    params: params
  })
}

export function invalidMerchant(id) {
  return request({
    url: '/system/merchant/delete/' + id,
    method: 'delete'
  })
}

export function restoreMerchant(id) {
  return request({
    url: '/system/merchant/restore/' + id,
    method: 'put'
  })
}

export function searchMerchant(params) {
  return request({
    url: '/system/merchant/search',
    method: 'get',
    params: params
  })
}
