import { freezeMerchant, getMerchantList, normalMerchant, putOpenSplitAuth } from '@/api/merchant/merchantApi'

export default {
  name: 'merchantListIndex',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 15,
      supMerchantArr: [],
      merchantLevel: 1,
      merchantStatus: [
        { value: 1, label: '正常' },
        { value: 2, label: '冻结' }
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
    // 开通分账权限
    openSplitAuth(row) {
      console.log('openSplitAuth -> row', row)
      putOpenSplitAuth({ merchant_id: row.id }).then(res => {
        this.$message({
          message: this.$t('alert.optionSuccess'),
          type: 'success'
        })
      }).catch(() => {
        this.$message({
          message: this.$t('alert.error'),
          type: 'fail'
        })
      })
    },
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
      getMerchantList(data).then(res => {
        this.loading = false
        this.list = res.data
        this.total = res.total
      }).catch(error => {
        console.log('fetchData -> error', error)
        this.loading = false
      })
    },
    subTradeTerminal(id) {
      this.$parent.openPage('merchant-tradeTerminal-list', {
        merchant_id: id
      })
    },
    tradeDeviceList(id) {
      this.$parent.openPage('merchant-tradeDevice-list', {
        merchant_id: id
      })
    },
    info(id) {
      this.$parent.openPage('merchant-info', {
        merchant_id: id
      })
    },
    freezeMerchant(id) {
      freezeMerchant(id).then(res => {
        this.$message({
          message: '冻结商户成功',
          type: 'success'
        })
        this.fetchData()
      })
    },
    normalMerchant(id) {
      normalMerchant(id).then(res => {
        this.$message({
          message: '解冻商户成功',
          type: 'success'
        })
        this.fetchData()
      })
    }
  }
}
