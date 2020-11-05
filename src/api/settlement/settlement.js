import request from '@/utils/request'

export function getSettlementBatchList(data) {
  return request({
    url: '/admin/settle/settleBatchList',
    method: 'get',
    params: data
  })
}

export function getPayableList(data) {
  return request({
    url: '/admin/settle/payableList',
    method: 'get',
    params: data
  })
}

export function getReceivableList(data) {
  return request({
    url: '/admin/settle/receivableList',
    method: 'get',
    params: data
  })
}

export function getCollectRecordsList(data) {
  return request({
    url: '/admin/settle/collectRecordList',
    method: 'get',
    params: data
  })
}

export function getQueryList(data) {
  return request({
    url: '/admin/trade/getTradeList',
    method: 'get',
    params: data
  })
}

// 商户姓名搜索
export function nameSearch(data) {
  return request({
    url: '/admin/merchant/nameSearch',
    method: 'get',
    params: data
  })
}

// 相关订单=通过流水id查询流水
export function getTradeListById(data) {
  return request({
    url: '/admin/trade/getTradeListById',
    method: 'get',
    params: data
  })
}
