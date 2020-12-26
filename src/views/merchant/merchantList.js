import { freezeMerchant, getMerchantList, normalMerchant, putOpenSplitAuth, changeLimit, putOpenWx, putOpenAli, putOpenUnion, changePayRate } from '@/api/merchant/merchantApi'

export default {
  name: 'merchantListIndex',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 10,
      supMerchantArr: [],
      merchantLevel: 1,
      merchantStatus: [
        { value: 1, label: '正常' },
        { value: 2, label: '冻结' }
      ],
      search: {
        status: 1
      },
      splitLoading: false,
      alterLoading: false,
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible3: false,
      codeData: {
        amount: 0,
        merchant_id: '',
        rate: 0.002,
        agent: 0.00001,
        trade_limit: 1000
      },
      rateCodeData: {
        id: '',
        amount: 0.0001,
        rate: 0.002,
        agent: 0.00001,
        trade_limit: 1000
      },
      submitLoading: false,
      bankRules: {
        amount: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' },
          { min: 0, message: '不能低于0', trigger: 'blur' }
        ]
      },
      bankCodeData: {
        amount: '',
        merchant_id: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    search1() {
      this.page = 1
      this.fetchData()
    },
    alter(row) {
      this.dialogVisible = true
      this.codeData = {
        amount: 100,
        merchant_id: row.id
      }
    },
    tradeDeviceList3(row) {
      this.dialogVisible3 = true
      this.rateCodeData = {
        amount: 0.0001,
        rate: 0.002,
        agent: 0.00001,
        trade_limit: 1000,
        id: row.id
      }
    },
    alterModifyBankCardNum(row) {
      this.dialogVisible1 = true
      this.bankCodeData = {
        amount: '',
        merchant_id: row.id
      }
    },
    // 开通分账权限
    openSplitAuth(row) {
      this.splitLoading = true
      putOpenSplitAuth({ merchant_id: row.id }).then(res => {
        this.splitLoading = false
        this.$message({
          message: this.$t('alert.optionSuccess'),
          type: 'success'
        })
      }).catch(() => {
        this.splitLoading = false
      })
    },
    // 提交
    submit() {
      this.$refs.codeForm.validate(valid => {
        if (valid) {
          this.submitLoading = true
          const data = {
            amount: this.codeData.amount,
            merchant_id: this.codeData.merchant_id
          }
          changeLimit(data).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.fetchData()
            this.submitLoading = false
            this.dialogVisible = false
            this.resetForm()
          }).catch(() => {
            this.submitLoading = false
          })
        }
      })
    },
    submit3() {
      this.$refs.codeForm3.validate(valid => {
        if (valid) {
          this.submitLoading = true
          const data = {
            id: this.rateCodeData.id,
            payRate: this.rateCodeData.amount
          }
          changePayRate(data).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.fetchData()
            this.submitLoading = false
            this.dialogVisible3 = false
            this.resetForm3()
          }).catch(() => {
            this.submitLoading = false
          })
        }
      })
    },
    close() {
      this.dialogVisible = false
      this.resetForm()
    },
    close3() {
      this.dialogVisible3 = false
      this.resetForm3()
    },
    resetForm() {
      this.$refs.codeForm.resetFields()
      this.codeData = {
        amount: 0,
        merchant_id: ''
      }
    },
    resetForm3() {
      this.$refs.codeForm3.resetFields()
      this.rateCodeData = {
        amount: 0,
        id: '',
        rate: 0.002,
        agent: 0.00001,
        trade_limit: 1000
      }
    },
    // 修改银行卡号
    bankSubmit() {
      this.$refs.codeForm.validate(valid => {
        if (valid) {
          this.submitLoading = true
          const data = {
            amount: this.bankCodeData.amount,
            merchant_id: this.bankCodeData.merchant_id
          }
          changeLimit(data).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.fetchData()
            this.submitLoading = false
            this.dialogVisible1 = false
            this.resetBankForm()
          }).catch(() => {
            this.submitLoading = false
          })
        }
      })
    },
    bankClose() {
      this.dialogVisible1 = false
      this.resetBankForm()
    },
    resetBankForm() {
      this.$refs.codeForm.resetFields()
      this.bankCodeData = {
        amount: '',
        merchant_id: ''
      }
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
      }).catch(() => {
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
    },
    openingWechant(id) {
      putOpenWx({ merchant_id: id }).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '开通微信支付成功',
            type: 'success'
          })
          this.fetchData()
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        this.$message({
          message: err.message,
          type: 'error'
        })
      })
    },
    openingAlipay(id) {
      putOpenAli({ merchant_id: id }).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '开通支付宝支付成功',
            type: 'success'
          })
          this.fetchData()
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        this.$message({
          message: err.message,
          type: 'error'
        })
      })
    },
    openingUnoin(id) {
      putOpenUnion({ merchant_id: id }).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '开通云闪付支付成功',
            type: 'success'
          })
          this.fetchData()
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        this.$message({
          message: err.message,
          type: 'error'
        })
      })
    },
    changePayRate(id) {
      changePayRate({
        id: id,
        payRate: ''
      }).then(res => {

      })
    }
  }
}
