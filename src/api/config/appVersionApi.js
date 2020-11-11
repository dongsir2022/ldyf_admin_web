import request from '@/utils/request'

export function getAppVersionDataApi(data) {
  return request({
    url: '/admin/appVersion/list',
    method: 'get',
    params: data
  })
}

export function createAppVersionApi(data) {
  return request({
    url: '/admin/appVersion/create',
    method: 'post',
    data: data
  })
}

export function removeAppVersionApi(id) {
  return request({
    url: '/admin/appVersion/remove/' + id,
    method: 'post'
  })
}

export function updateAppVersionApi(data) {
  return request({
    url: '/admin/appVersion/update',
    method: 'post',
    data: data
  })
}

export function disableAppVersionApi(id) {
  return request({
    url: '/admin/appVersion/disable/' + id,
    method: 'post'
  })
}
