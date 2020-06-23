import { delCommonProblemInfoApi, getCommonProblemInfoListApi } from '@/api/config/commonProblemInfo'

export default {
  name: 'commonProblemInfoIndex',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 15,
      editVisible: false,
      editData: {},
      submitLoading: false
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
      getCommonProblemInfoListApi(data).then(res => {
        this.list = res.data
        this.total = res.total
        this.loading = false
      })
    },
    update() {

    },
    remove(id) {
      delCommonProblemInfoApi(id).then(res => {
        this.$message({
          message: this.$t('alert.optionSuccess'),
          type: 'success'
        })
        this.fetchData()
      })
    },
    add() {
      this.editVisible = true
    },
    submit() {

    },
    close() {
      this.editVisible = false
    }
  }
}
