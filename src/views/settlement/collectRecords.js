import { getSettlementPayableList } from '@/api/settlement/settlement'

export default {
  name: 'settlementCollectRecords',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 15,
      channelArr: ['余额', '银行电子代付'],
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
