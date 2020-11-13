import request from '@/utils/request'

// 查询批量处理列表
// page_num=1
// page_size=3
export function queryBatchProcessingListApi(params) {
  return request({
    url: '/admin/batchProcessing/getQrCodeList',
    method: 'get',
    params: params
  })
}
