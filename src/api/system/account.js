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
    method: 'put',
    data: data
  })
}

export function deleteAccount(params) {
  return request({
    url: '/admin/account/delete',
    method: 'DELETE',
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
