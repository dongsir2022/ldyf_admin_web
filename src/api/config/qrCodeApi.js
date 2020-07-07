import request from '@/utils/request'

// 获取二维码列表
export function getQRCodeListApi(params) {
  return request({
    url: '/admin/tradeQRCode/getQRCodeList',
    method: 'get',
    params: params
  })
}

// 生成二维码
export function createQRCodeApi() {
  return request({
    url: '/admin/tradeQRCode/getQRCode',
    method: 'post'
  })
}

// 绑定云喇叭
export function bingTradeDeviceNameApi(data) {
  return request({
    url: '/admin/tradeQRCode/bingTradeDeviceName',
    method: 'post',
    params: data
  })
}

// 解绑云喇叭
export function unbindDeviceNameApi(data) {
  return request({
    url: '/admin/tradeQRCode/unbindDeviceName',
    method: 'post',
    params: data
  })
}

// 获取二维码地址信息
export function getQRCodeAddressMessApi(data) {
  return request({
    url: '/admin/tradeQRCode/getQRCodeAddressMess',
    method: 'get',
    params: data
  })
}

