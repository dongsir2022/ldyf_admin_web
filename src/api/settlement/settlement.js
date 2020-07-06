import request from '@/utils/request'

export function getSettlementBatchList(data) {
  console.log('getSettlementBatchList -> data', data)
  return request({
    url: '/admin/settle/settleBatchList',
    method: 'get',
    params: data
  })
}

export function getPayableList(data) {
  console.log('getPayableList -> data', data)
  return request({
    url: '/admin/settle/payableList',
    method: 'get',
    params: data
  })
}

export function getReceivableList(data) {
  console.log('getReceivableList -> data', data)
  return request({
    url: '/admin/settle/receivableList',
    method: 'get',
    params: data
  })
}

export function getCollectRecordsList(data) {
  console.log('getCollectRecordsList -> data', data)
  return request({
    url: '/admin/settle/collectRecordList',
    method: 'get',
    params: data
  })
}

export function getQueryList(data) {
  console.log('getQueryList -> getQueryList', data)
  return request({
    url: '/admin/trade/getTradeList',
    method: 'get',
    params: data
  })
}

// 商户姓名搜索
export function nameSearch(data) {
  console.log('nameSearch -> data', data)
  return request({
    url: '/admin/merchant/nameSearch',
    method: 'get',
    params: data
  })
}

// 相关订单=通过流水id查询流水
export function getTradeListById(data) {
  console.log('nameSearch -> data', data)
  return request({
    url: '/admin/trade/getTradeListById',
    method: 'get',
    params: data
  })
}
