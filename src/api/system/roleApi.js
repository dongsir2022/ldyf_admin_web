import request from '@/utils/request'

export function getRoleList() {
  return request({
    url: '/admin/role/permission/list',
    method: 'get'
  })
}

export function create(params) {
  return request({
    url: '/admin/role/create',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/admin/role/update',
    method: 'POST',
    data: params
  })
}

export function remove(params) {
  return request({
    url: '/admin/role/delete',
    method: 'POST',
    data: params
  })
}

export function getRoleMenuTree(roleId) {
  return request({
    url: '/admin/role/init/permission/menutree',
    method: 'get',
    params: {
      id: roleId
    }
  })
}

export function saveRoleMenus(params) {
  return request({
    url: '/admin/role/update/permission/menu',
    method: 'POST',
    data: params
  })
}
