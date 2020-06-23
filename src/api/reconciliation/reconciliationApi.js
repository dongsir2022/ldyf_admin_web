import request from '@/utils/request'

export function getInternalBillLogListApi(params) {
  return request({
    url: '/admin/reconciliation/internalBillLog/list',
    method: 'get',
    params: params
  })
}

export function getExternalBillLogListApi(params) {
  return request({
    url: '/admin/reconciliation/externalBillLog/list',
    method: 'get',
    params: params
  })
}
