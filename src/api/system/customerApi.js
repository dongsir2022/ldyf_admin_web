import request from '@/utils/request'

export function getAccountManagerList(params) {
  return request({
    url: '/admin/accountManager/accountManagerList',
    method: 'get',
    params: params
  })
}

export function createCustomer(data) {
  return request({
    url: '/admin/accountManager/addAccountManager',
    method: 'post',
    data: data
  })
}

export function updateCustomer(data) {
  return request({
    url: '/admin/accountManager/updAccountManager',
    method: 'put',
    data: data
  })
}

export function deleteCustomer(id) {
  return request({
    url: '/admin/accountManager/delAccountManager/' + id,
    method: 'delete'
  })
}

export function updatePassword(params) {
  return request({
    url: '/admin/accountManager/updAccountManager',
    method: 'put',
    data: params
  })
}

// 更换所属机构
export function updAgencyNo(params) {
  return request({
    url: '/admin/accountManager/updAgencyNo',
    method: 'put',
    data: params
  })
}
