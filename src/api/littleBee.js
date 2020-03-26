import request from "@/utils/request";

export function addLittleBee(data) {
  return request({
    url: '/system/little_bee/add',
    method: 'post',
    data: data
  })
}

export function getLittleBeeList(params) {
  return request({
    url: '/system/little_bee/list',
    method: 'get',
    params: params
  })
}

export function getLittleBeeInfo(id) {
  return request({
    url: '/system/little_bee/info/' + id,
    method: 'get'
  })
}

export function updateLittleBee(data) {
  return request({
    url: '/system/little_bee/update',
    method: 'put',
    data: data
  })
}

export function invalidLittleBee(id) {
  return request({
    url: '/system/little_bee/delete/' + id,
    method: 'delete'
  })
}

export function restoreLittleBee(id) {
  return request({
    url: '/system/little_bee/restore/' + id,
    method: 'put'
  })
}

export function getLocationLittleBeeList(id) {
  return request({
    url: '/system/little_bee/list/location/' + id,
    method: 'get'
  })
}
