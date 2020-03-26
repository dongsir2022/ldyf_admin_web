import request from "@/utils/request";

export function getServiceTypeList(params) {
  return request({
    url: '/system/service_type/list',
    method: 'get',
    params: params
  })
}

export function invalidServiceType(id) {
  return request({
    url: '/system/service_type/delete/' + id,
    method: 'delete'
  })
}

export function restoreServiceType(id) {
  return request({
    url: '/system/service_type/restore/' + id,
    method: 'put'
  })
}

export function addServiceType(data) {
  return request({
    url: '/system/service_type/add',
    method: 'post',
    data: data
  })
}

export function getServiceTypeAllList() {
  return request({
    url: '/system/service_type/list/all',
    method: 'get'
  })
}


export function getAccountList(params) {
  return request({
    url: '/system/account/list',
    method: 'get',
    params: params
  })
}

export function addAccount(data) {
  return request({
    url: '/system/account/add',
    method: 'post',
    data: data
  })
}

export function updateAccount(data) {
  return request({
    url: '/system/account/update',
    method: 'put',
    data: data
  })
}
