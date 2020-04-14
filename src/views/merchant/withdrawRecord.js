export default {
  name: 'withdrawRecordIndex',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 15,
      searchKey: '',
      searchCreateTime: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleCurrentChange(page) {
      this.page = page
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
    },
    fetchData() {
      this.total = 3
      this.list = [
        {
          'create_time': '2020-04-01 17:01:00',
          'merchant_no': 'm202004110001',
          'merchant_name': '兰州分店',
          'withdraw_amount': '100.00',
          'withdraw_fee': '0.02',
          'withdraw_real_amount': '99.98',
          'withdraw_bank_no': '1233333333333333',
          'withdraw_status': 1
        },
        {
          'create_time': '2020-04-01 17:01:00',
          'merchant_no': 'm202004110001',
          'merchant_name': '兰州分店',
          'withdraw_amount': '100.00',
          'withdraw_fee': '0.02',
          'withdraw_real_amount': '99.98',
          'withdraw_bank_no': '1233333333333333',
          'withdraw_status': 2
        },
        {
          'create_time': '2020-04-01 17:01:00',
          'merchant_no': 'm202004110001',
          'merchant_name': '兰州分店',
          'withdraw_amount': '100.00',
          'withdraw_fee': '0.02',
          'withdraw_real_amount': '99.98',
          'withdraw_bank_no': '1233333333333333',
          'withdraw_status': 3
        }
      ]
    }
  },
  filters: {
    dict(value) {
      const map = {
        1: '成功',
        2: '失败',
        3: '提现中'
      }
      return map[value]
    }
  }
}
