import { getExternalBillLogListApi } from '@/api/reconciliation/reconciliationApi'

export default {
  name: 'externalBillLogIndex',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 10
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleCurrentChange(page) {
      this.page = page
      this.fetchData()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.fetchData()
    },
    fetchData() {
      this.loading = true
      const data = {
        page_num: this.page,
        page_size: this.pageSize
      }
      getExternalBillLogListApi(data).then(res => {
        this.list = res.data
        this.total = res.total
        this.loading = false
      })
    }
  }
}
