import { getMerchantAccountList } from '@/api/merchant/merchantApi'

export default {
  name: 'merchantAccount',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 15,
      supMerchantArr: [],
      merchantLevel: 1,
      searchKey: ''
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
      getMerchantAccountList().then(res => {
        this.loading = false
        this.list = res.data
        this.total = res.total
      })
    },
    clearData() {
      this.list = []
      this.total = 0
    },
    freezeMerchant(row) {
      this.$message.error('服务不可用')
    }
  }
}
