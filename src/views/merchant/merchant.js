import { getMerchantList } from '@/api/merchant/merchantApi'

export default {
  name: 'merchantAmount',
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
      getMerchantList({ id: 1 }).then(res => {
        this.loading = false
        this.list = res.data
        this.total = res.total
      })
    },
    clearData() {
      this.list = []
      this.total = 0
    },
    subMerchantFetchData(row) {
      this.clearData()
      this.loading = true
      this.supMerchantArr.push(row)
      if (row.merchant_no === 'm202004110001' || row.merchant_no === 'm202004110006') {
        getMerchantList({ id: row.merchant_level + 1 }).then(res => {
          this.loading = false
          this.list = res.data
          this.total = res.total
        })
      } else {
        this.loading = false
      }
    },
    gotoMerchantFetchData(row) {
      this.clearData()
      this.loading = true
      let supMerchantNo = ''
      if (row.merchant_level === 1) {
        this.supMerchantArr = []
      } else {
        this.supMerchantArr.splice(row.merchant_level - 1, this.supMerchantArr.length - row.merchant_level + 1)
        supMerchantNo = this.supMerchantArr[this.supMerchantArr.length - 1].merchant_no
      }
      if (supMerchantNo === 'm202004110001' || supMerchantNo === 'm202004110006' || row.merchant_level === 1) {
        getMerchantList({ id: row.merchant_level }).then(res => {
          this.loading = false
          this.list = res.data
          this.total = res.total
        })
      } else {
        this.loading = false
      }
    },
    freezeMerchant(row) {
      this.$message.error('服务不可用');
    }
  },
  filters: {
    merchantLevelDict(merchantLevel) {
      const map = {
        1: '一级商户',
        2: '二级商户',
        3: '三级商户',
        4: '四级商户',
        5: '五级商户'
      }
      return map[merchantLevel]
    }
  }
}
