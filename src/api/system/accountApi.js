import request from '@/utils/request'

export function getAccountList(params) {
  return request({
    url: '/admin/account/list',
    method: 'get',
    params: params
  })
}

export function createAccount(data) {
  return request({
    url: '/admin/account/create',
    method: 'post',
    data: data
  })
}

export function updateAccount(data) {
  return request({
    url: '/admin/account/update',
    method: 'post',
    data: data
  })
}

export function deleteAccount(params) {
  return request({
    url: '/admin/account/delete',
    method: 'POST',
    data: params
  })
}

export function updatePassword(params) {
  return request({
    url: '/admin/account/reset/password',
    method: 'post',
    data: params
  })
}

export function setRole(params) {
  return request({
    url: '/admin/account/binding/role',
    method: 'post',
    data: params
  })
}

export function updateAgencyInfo(params) {
  return request({
    url: '/admin/account/update/agencyno',
    method: 'post',
    data: params
  })
}

export function updateSelfPassword(params) {
  return request({
    url: '/admin/account/update/self/password',
    method: 'post',
    data: params
  })
}
