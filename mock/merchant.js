const merchantMap = {
  1: [
    { 'merchant_name': '兰州分店', 'merchant_no': 'm202004110001', 'merchant_level': 1, 'merchant_bill_type': 'T+1' },
    { 'merchant_name': '东莞分店', 'merchant_no': 'm202004110002', 'merchant_level': 1, 'merchant_bill_type': 'D+0' },
    { 'merchant_name': '成都分店', 'merchant_no': 'm202004110003', 'merchant_level': 1, 'merchant_bill_type': 'T+0' },
    { 'merchant_name': '杭州分店', 'merchant_no': 'm202004110004', 'merchant_level': 1, 'merchant_bill_type': 'T+7' },
    { 'merchant_name': '广州分店', 'merchant_no': 'm202004110005', 'merchant_level': 1, 'merchant_bill_type': 'T+30' }
  ],
  2: [
    { 'merchant_name': '兰州分店1', 'merchant_no': 'm202004110006', 'merchant_level': 2, 'merchant_bill_type': 'T+30' },
    { 'merchant_name': '兰州分店2', 'merchant_no': 'm202004110007', 'merchant_level': 2, 'merchant_bill_type': 'T+30' },
    { 'merchant_name': '兰州分店3', 'merchant_no': 'm202004110008', 'merchant_level': 2, 'merchant_bill_type': 'T+30' },
    { 'merchant_name': '兰州分店4', 'merchant_no': 'm202004110009', 'merchant_level': 2, 'merchant_bill_type': 'T+30' }
  ],
  3: [
    { 'merchant_name': '兰州分店1-1', 'merchant_no': 'm202004110010', 'merchant_level': 3, 'merchant_bill_type': 'T+30' },
    { 'merchant_name': '兰州分店1-2', 'merchant_no': 'm202004110011', 'merchant_level': 3, 'merchant_bill_type': 'T+30' },
    { 'merchant_name': '兰州分店1-3', 'merchant_no': 'm202004110012', 'merchant_level': 3, 'merchant_bill_type': 'T+30' },
    { 'merchant_name': '兰州分店1-4', 'merchant_no': 'm202004110013', 'merchant_level': 3, 'merchant_bill_type': 'T+30' }
  ]
}

const data1 = [
  {
    'merchant_name': '兰州分店',
    'merchant_no': 'm202004110001',
    'merchant_amount_available': '100.00',
    'merchant_amount_withdraw': '200.00'
  }, {
    'merchant_name': '东莞分店',
    'merchant_no': 'm202004110001',
    'merchant_amount_available': '100.00',
    'merchant_amount_withdraw': '200.00'
  }, {
    'merchant_name': '成都分店',
    'merchant_no': 'm202004110001',
    'merchant_amount_available': '100.00',
    'merchant_amount_withdraw': '200.00'
  }
]

export default [
  {
    url: '/merchant/list',
    type: 'get',
    response: config => {
      let data = merchantMap[config.query.id]
      return {
        'code': 200,
        'data': data,
        'message': 'success',
        'total': data.length
      }
    }
  },
  {
    url: '/merchant/account/list',
    type: 'get',
    response: config => {
      return {
        'code': 200,
        'data': data1,
        'message': 'success',
        'total': data1.length
      }
    }
  }
]
