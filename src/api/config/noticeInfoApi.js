import request from '@/utils/request'

export function getNoticeInfoApi(params) {
  return request({
    url: '/admin/bulletin/getBulletinList',
    method: 'get',
    params: params
  })
}

export function addNoticeInfoApi(data) {
  return request({
    url: '/admin/bulletin/addBulletin',
    method: 'post',
    data: data
  })
}

export function uptNoticeInfoApi(data) {
  return request({
    url: '/admin/bulletin/updBulletin',
    method: 'put',
    data: data
  })
}

export function delNoticeInfoApi(id) {
  return request({
    url: '/admin/bulletin/delBulletin/' + id,
    method: 'delete'
  })
}
