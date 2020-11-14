import { queryBatchProcessingListApi } from '@/api/config/downloadCenterApi'
export default {
  name: 'downloadCenterIndex',
  data() {
    return {
      loading: false, // 表格加载
      page: 1, // 表格数据
      total: 0,
      pageSize: 10,
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      this.loading = true
      const data = {
        page_num: this.page,
        page_size: this.pageSize
      }
      queryBatchProcessingListApi(data).then(res => {
        this.list = res.data
        this.total = res.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 下载
    doDownload(data) {
      if (!data) {
        return
      }
      window.open(data)
    },
    // 分页
    handleCurrentChange(page) {
      this.page = page
      this.fetchData()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.fetchData()
    }
  }
}
