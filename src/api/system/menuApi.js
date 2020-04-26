import request from '@/utils/request'

export function getMenuTree() {
  return request({
    url: '/admin/menu/tree/edit',
    method: 'get'
  })
}

export function remove(params) {
  return request({
    url: '/admin/menu/delete',
    method: 'DELETE',
    data: params
  })
}

export function create(params) {
  return request({
    url: '/admin/menu/create',
    method: 'POST',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/admin/menu/update',
    method: 'POST',
    data: params
  })
}

export function detail(id, role) {
  return request({
    url: '/admin/menu/detail',
    method: 'get',
    params: {
      id: id,
      contain_role: role
    }
  })
}
