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
    method: 'post'
  })
}

export function freezeMerchant(id) {
  return request({
    url: '/admin/merchant/freeze/' + id,
    method: 'post'
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

export function agreeMerchantApprove(id, data) {
  return request({
    url: '/admin/merchantApprove/agree/' + id,
    method: 'post',
    data: data
  })
}

export function rejectMerchantApprove(id) {
  return request({
    url: '/admin/merchantApprove/reject/' + id,
    method: 'post'
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

export function getTradeDeviceList(params) {
  return request({
    url: '/admin/tradeDevice/getTradeDeviceList',
    method: 'get',
    params: params
  })
}

export function getAgentUserInfoApi(id) {
  return request({
    url: '/admin/tradeTerminal/agentInfo/' + id,
    method: 'get'
  })
}

export function getDeviceOperatorList(params) {
  return request({
    url: '/admin/merchantLoginAccount/getLoginAccountList',
    method: 'get',
    params: params
  })
}

export function freezeDeviceOperator(id) {
  return request({
    url: '/admin/merchantLoginAccount/freeze/' + id,
    method: 'post'
  })
}

export function normalDeviceOperator(id) {
  return request({
    url: '/admin/merchantLoginAccount/normal/' + id,
    method: 'post'
  })
}

export function deviceOperatorChangePassword(data) {
  return request({
    url: '/admin/merchantLoginAccount/changePassword',
    method: 'post',
    data: data
  })
}

export function createDeviceOperator(data) {
  return request({
    url: '/admin/merchantLoginAccount/addLoginAccount',
    method: 'post',
    data: data
  })
}

export function unbindDeviceOperator(id) {
  return request({
    url: '/admin/merchantLoginAccount/unbind/' + id,
    method: 'post'
  })
}

export function bindingDeviceOperator(data) {
  return request({
    url: '/admin/merchantLoginAccount/binding',
    method: 'post',
    data: data
  })
}

export function unbindDeviceOperatorList(params) {
  return request({
    url: '/admin/merchantLoginAccount/getUnbindList',
    method: 'get',
    params: params
  })
}

// 提现记录
export function getWithdrowRecordList(params) {
  return request({
    url: '/admin/merchant/withdrawRecordList',
    method: 'get',
    params: params
  })
}

// 开通分账权限
export function putOpenSplitAuth(params) {
  return request({
    url: '/admin/merchant/openSplitAuth',
    method: 'post',
    data: params
  })
}

// 修改限额
export function changeLimit(params) {
  return request({
    url: '/admin/merchant/changeLimit',
    method: 'post',
    data: params
  })
}

// 开通微信支付
export function putOpenWx(params) {
  return request({
    url: '/admin/atMerchant/wxPush',
    method: 'post',
    data: params
  })
}

// 开通支付宝支付
export function putOpenAli(params) {
  return request({
    url: '/admin/atMerchant/aliPush',
    method: 'post',
    data: params
  })
}

// 开通云闪付支付
export function putOpenUnion(params) {
  return request({
    url: '/admin/atMerchant/unionPush',
    method: 'post',
    data: params
  })
}

// 修改商户费率
export function changePayRate(params) {
  return request({
    url: '/admin/merchant/changePayRate',
    method: 'post',
    data: params
  })
}

// 修改银行卡号
export function changeMess(params) {
  return request({
    url: '/admin/merchant/changeMess',
    method: 'post',
    data: params
  })
}

export function wxStatusApi(params) {
  return request({
    url: '/admin/merchant/wxStatus/' + params,
    method: 'get',
  })
}

export function rejectChangeApi(params) {
  return request({
    url: '/admin/merchant/rejectChange/' + params,
    method: 'post',
  })
}
