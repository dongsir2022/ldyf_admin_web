import request from '@/utils/request'

export function createHoliday(data) {
  return request({
    url: '/admin/holiday/create',
    method: 'post',
    data: data
  })
}

export function removeHoliday(id) {
  return request({
    url: '/admin/holiday/remove/' + id,
    method: 'post'
  })
}

export function getHolidayDataByMonth(month) {
  return request({
    url: '/admin/holiday/data/byMonth/' + month,
    method: 'get'
  })
}
