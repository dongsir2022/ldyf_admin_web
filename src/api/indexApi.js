import request from '@/utils/request'

// #获取每日交易数量
export function getCountForTradeApi() {
  return request({
    url: '/admin/trade/countForTrade',
    method: 'get'
  })
}

// #每日交易总额
export function getSumForTradeApi() {
  return request({
    url: '/admin/trade/sumForTrade',
    method: 'get'
  })
}

// #每日交易手续费
export function getSumForServiceChargeApi() {
  return request({
    url: '/admin/trade/sumForServiceCharge',
    method: 'get'
  })
}

// #获取交易数量
export function getTradeCountApi() {
  return request({
    url: '/admin/trade/TradeCount',
    method: 'get'
  })
}

// #交易总额
export function getTradeSumApi() {
  return request({
    url: '/admin/trade/tradeSum',
    method: 'get'
  })
}

// #交易手续费
export function getServiceChargeSumApi() {
  return request({
    url: '/admin/trade/ServiceChargeSum',
    method: 'get'
  })
}

