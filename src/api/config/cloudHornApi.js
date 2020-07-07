import request from '@/utils/request'

// 获取云喇叭列表
export function getList(params) {
  return request({
    url: '/admin/device/getList',
    method: 'get',
    params: params
  })
}

// 云喇叭注册
export function register(data) {
  return request({
    url: '/admin/device/register',
    method: 'post',
    data: data
  })
}

// 云喇叭移除
export function removeCloudHorn(id) {
  return request({
    url: '/admin/device/remove/' + id,
    method: 'delete'
  })
}

// 云喇叭禁用
export function disableThing(id) {
  return request({
    url: '/admin/device/disableThing/' + id,
    method: 'put'
  })
}

// 获取二维码地址信息
export function enableThing(id) {
  return request({
    url: '/admin/device/enableThing/' + id,
    method: 'put'
  })
}

