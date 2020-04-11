import { getSettlementPayableList } from '@/api/settlement/settlement'

export default {
  name: 'settlementPayable',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 15,
      channelArr: ['余额', '银行电子代付'],
      searchPayableStatus: '',
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
      this.loading = true
      getSettlementPayableList().then(res => {
        this.loading = false
        this.list = res.data
        this.total = res.total
      })
    }
  },
  filters: {
    settlementStatusDict(value) {
      const map = {
        1: '已结算',
        0: '未结算'
      }
      return map[value]
    }
  }
}
