import { getMerchantApproveList } from '@/api/merchant/merchantApi'

export default {
  name: 'merchantApproveListIndex',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 10,
      approveStatus: [
        { value: 1, label: '待审批' },
        { value: 2, label: '已同意' },
        { value: 3, label: '已驳回' }
      ],
      search: {
        status: 1
      }
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
      const data = {
        page_num: this.page,
        page_size: this.pageSize,
        status: this.search.status
      }
      this.loading = true
      getMerchantApproveList(data).then(res => {
        this.loading = false
        this.list = res.data
        this.total = res.total
      }).catch(() => {
        this.loading = false
      })
    },
    approve(id) {
      this.$parent.openPage('work-merchant-approve-page', {
        merchant_id: id
      })
    }
  },
  filters: {
    approveStatusDict(val) {
      const map = {
        1: '待审批', 2: '已同意', 3: '已驳回'
      }
      return map[val]
    }
  }
}
