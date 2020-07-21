export default {
  name: 'merchantSettleIndex',
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
    search() {
      this.page = 1
      this.fetchData()
    },
    test() {

    },
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
          'merchant_level': 1,
          'settle_cycle': 'D0',
          'settle_type': '余额',
          'settle_status': 1
        },
        {
          'create_time': '2020-04-01 17:01:00',
          'merchant_no': 'm202004110001',
          'merchant_name': '兰州分店1',
          'merchant_level': 2,
          'settle_cycle': 'T0',
          'settle_type': '余额',
          'settle_status': 2
        },
        {
          'create_time': '2020-04-01 17:01:00',
          'merchant_no': 'm202004110001',
          'merchant_name': '兰州分店1-1',
          'merchant_level': 3,
          'settle_cycle': 'T+1',
          'settle_type': '银行卡',
          'settle_status': 1
        },
        {
          'create_time': '2020-04-01 17:01:00',
          'merchant_no': 'm202004110001',
          'merchant_name': '兰州分店1-1-1',
          'merchant_level': 4,
          'settle_cycle': 'T+30',
          'settle_type': '余额',
          'settle_status': 1
        }
      ]
    }
  },
  filters: {
    merchantLevelDict(merchantLevel) {
      const map = {
        1: '一级商户',
        2: '二级商户',
        3: '三级商户',
        4: '四级商户',
        5: '五级商户'
      }
      return map[merchantLevel]
    },
    settleStatusDict(settleStatus) {
      const map = {
        1: '生效',
        2: '不生效'
      }
      return map[settleStatus]
    }
  }
}
