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
