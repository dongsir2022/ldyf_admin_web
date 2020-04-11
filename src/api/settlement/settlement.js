import request from '@/utils/request'

export function getSettlementBatchList(params) {
  return request({
    url: '/settlement/batch/list',
    method: 'get',
    params: params
  })
}

export function getSettlementPayableList(params) {
  return request({
    url: '/settlement/payable/list',
    method: 'get',
    params: params
  })
}
