import request from '@/utils/request'

export function getAgencyInfoListApi(params) {
  return request({
    url: '/admin/agencyInfo/getAgencyList',
    method: 'get',
    params: params
  })
}


export function createAgencyInfoApi(data) {
  return request({
    url: '/admin/agencyInfo/addAgency',
    method: 'post',
    data: data
  })
}
