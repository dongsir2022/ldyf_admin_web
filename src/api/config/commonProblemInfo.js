import request from '@/utils/request'

export function getCommonProblemInfoListApi(params) {
  return request({
    url: '/admin/commonProblem/getProblemList',
    method: 'get',
    params: params
  })
}

export function addCommonProblemInfoApi(data) {
  return request({
    url: '/admin/commonProblem/addProblem',
    method: 'post',
    data: data
  })
}

export function uptCommonProblemInfoApi(data) {
  return request({
    url: '/admin/commonProblem/updProblem',
    method: 'post',
    data: data
  })
}

export function delCommonProblemInfoApi(id) {
  return request({
    url: '/admin/commonProblem/delProblem/' + id,
    method: 'post'
  })
}
