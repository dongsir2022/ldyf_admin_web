import { getSettlementBatchList } from '@/api/settlement/settlement'

export default {
  name: 'settlementBatch',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 15,
      channelArr: ['余额', '银行电子代付'],
      searchChannel: '',
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
      getSettlementBatchList().then(res => {
        this.loading = false
        this.list = res.data
        this.total = res.total
      })
    }
  },
  filters: {
    settlementStatusDict(value) {

      const map = {
        1: '成功',
        2: '失败',
        3: '已取消',
        0: '待处理'
      }
      return map[value]
    }
  }
}
