import { queryBatchProcessingListApi } from '@/api/config/downloadCenterApi'
import {batchGenerationQRCodeApi} from "@/api/config/qrCodeApi";
export default {
  name: 'downloadCenterIndex',
  data() {
    return {
      loading: false, // 表格加载
      page: 1, // 表格数据
      total: 0,
      pageSize: 10,
      list: [],
      createLoading:false
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
    },
    add() {
      this.createLoading = true
      this.$prompt('请输入创建数量', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: '输入数量不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你输入的数量是: ' + value
        })
        this.createLoading = false
        const data = {
          count: value
        }
        // 批量创建二维码
        batchGenerationQRCodeApi(data).then(res => {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.fetchData()
          this.createLoading = false
        }).catch(() => {
          this.createLoading = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
        this.createLoading = false
      })
    },
  }
}
