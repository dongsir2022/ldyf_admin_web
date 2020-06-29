import request from '@/utils/request'

export function login(params) {
  params['client_id'] = 'hjjf_admin_client'
  params['client_secret'] = 'hjjfMobile123!@#'
  params['grant_type'] = 'password'
  params['scope'] = 'admin'
  return request({
    url: '/oauth/token',
    method: 'post',
    params: params
  })
}

export function getInfo() {
  return request({
    url: '/oauth/current/permission',
    method: 'get'
  })
}

export function logout(token) {
  return request({
    url: '/oauth/revoke_token',
    method: 'post',
    params: { 'token': token }
  })
}

// 刷新token
export function refreshToken(token) {
  const data = {
    client_id: 'hjjf_admin_client',
    client_secret: 'hjjfMobile123!@#',
    grant_type: 'refresh_token',
    refresh_token: token
  }
  return request({
    url: '/oauth/token',
    method: 'post',
    params: data
  })
}
