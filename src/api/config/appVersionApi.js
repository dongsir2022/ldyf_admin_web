import request from '@/utils/request'
import da from 'element-ui/src/locale/lang/da'

export function getAppVersionDataApi(params) {
  return request({
    url: '/admin/appVersion/list',
    method: 'get',
    params: params
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
    method: 'delete'
  })
}

export function updateAppVersionApi(data) {
  return request({
    url: '/admin/appVersion/update',
    method: 'put',
    data: data
  })
}

export function disableAppVersionApi(id) {
  return request({
    url: '/admin/appVersion/disable/' + id,
    method: 'put'
  })
}