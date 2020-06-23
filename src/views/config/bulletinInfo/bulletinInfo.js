import { getAppVersionDataApi } from '@/api/config/appVersionApi'

export default {
  name: 'bulletinInfoIndex',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 15
    }
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
      getAppVersionDataApi(data).then(res => {
        this.list = res.data
        this.total = res.total
        this.loading = false
      })
    }
  }
}
