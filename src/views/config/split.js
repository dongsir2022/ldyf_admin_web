export default {
  name: 'splitIndex',
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
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
    }
  }
}
