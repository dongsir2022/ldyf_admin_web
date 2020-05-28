import request from '@/utils/request'

export function getMerchantList(params) {
  return request({
    url: '/admin/merchant/list',
    method: 'get',
    params: params
  })
}

export function getMerchantInfo(id) {
  return request({
    url: '/admin/merchant/info/' + id,
    method: 'get'
  })
}

export function normalMerchant(id) {
  return request({
    url: '/admin/merchant/normal/' + id,
    method: 'put'
  })
}

export function freezeMerchant(id) {
  return request({
    url: '/admin/merchant/freeze/' + id,
    method: 'put'
  })
}

export function getMerchantAccountList(params) {
  return request({
    url: '/merchant/account/list',
    method: 'get',
    params: params
  })
}

export function getMerchantApproveList(params) {
  return request({
    url: '/admin/merchantApprove/list',
    method: 'get',
    params: params
  })
}

export function getMerchantApproveInfo(id) {
  return request({
    url: '/admin/merchantApprove/info/' + id,
    method: 'get'
  })
}

export function agreeMerchantApprove(id) {
  return request({
    url: '/admin/merchantApprove/agree/' + id,
    method: 'put'
  })
}

export function rejectMerchantApprove(id) {
  return request({
    url: '/admin/merchantApprove/reject/' + id,
    method: 'put'
  })
}

export function getTradeTerminalList(params) {
  return request({
    url: '/admin/tradeTerminal/list',
    method: 'get',
    params: params
  })
}

export function getTradeTerminalInfo(id) {
  return request({
    url: '/admin/tradeTerminal/info/' + id,
    method: 'get'
  })
}

