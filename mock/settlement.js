const data1 = [
  {
    's_batch_no': '431170728170600001',
    'create_time': '2020-04-01 17:00:00',
    's_amount': '100.00',
    's_channel': '余额',
    's_result': '成功 10,失败 0,取消 0',
    's_status': 1
  },
  {
    's_batch_no': '431170728170600002',
    'create_time': '2020-04-01 17:00:00',
    's_amount': '931.00',
    's_channel': '银行电子代付',
    's_result': '成功 0,失败 10,取消 0',
    's_status': 2
  },
  {
    's_batch_no': '431170728170600003',
    'create_time': '2020-04-01 17:00:00',
    's_amount': '600.00',
    's_channel': '余额',
    's_result': '成功 0,失败 0,取消 0',
    's_status': 0
  },
  {
    's_batch_no': '431170728170600004',
    'create_time': '2020-04-01 17:00:00',
    's_amount': '500.00',
    's_channel': '银行电子代付',
    's_result': '成功 0,失败 0,取消 1',
    's_status': 3
  },
  {
    's_batch_no': '431170728170600005',
    'create_time': '2020-04-01 17:00:00',
    's_amount': '1030.00',
    's_channel': '余额',
    's_result': '成功 20,失败 0,取消 0',
    's_status': 1
  }
]

const data2 = [
  {
    'order_no': '431170728170600001',
    'create_time': '2020-04-01 17:01:00',
    'payable_amount': '100.00',
    'payable_side': '余额',
    'payable_status': 1
  }, {
    'order_no': '431170728170600001',
    'create_time': '2020-04-01 17:01:00',
    'payable_amount': '200.00',
    'payable_side': '余额',
    'payable_status': 0
  }, {
    'order_no': '431170728170600001',
    'create_time': '2020-04-01 17:01:00',
    'payable_amount': '400.00',
    'payable_side': '余额',
    'payable_status': 1
  }, {
    'order_no': '431170728170600001',
    'create_time': '2020-04-01 17:01:00',
    'payable_amount': '700.00',
    'payable_side': '余额',
    'payable_status': 1
  }
]

export default [
  {
    url: '/settlement/batch/list',
    type: 'get',
    response: config => {
      return {
        'code': 200,
        'data': data1,
        'message': 'success',
        'total': data1.length
      }
    }
  },
  {
    url: '/settlement/payable/list',
    type: 'get',
    response: config => {
      return {
        'code': 200,
        'data': data2,
        'message': 'success',
        'total': data2.length
      }
    }
  }
]
