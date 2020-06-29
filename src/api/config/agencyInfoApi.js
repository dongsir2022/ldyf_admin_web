import request from '@/utils/request'

export function getAgencyInfoListApi(params) {
  return request({
    url: '/admin/agencyInfo/getAgencyList',
    method: 'get',
    params: params
  })
}

// 向后台发送表单
export function createAgencyInfoApi(data) {
  return request({
    url: '/admin/agencyInfo/addAgency',
    method: 'post',
    data: data
  })
}

// 获取所有节点信息
export function getTreeInfoApi() {
  return request({
    url: '/admin/agencyInfo/getAgencyTree',
    method: 'get'
  })
}
