import {
  freezeMerchant,
  getMerchantList,
  normalMerchant,
  putOpenSplitAuth,
  changeLimit,
  putOpenWx,
  putOpenAli,
  putOpenUnion,
  changePayRate,
  changeMess,
  wxStatusApi,
  rejectChangeApi,
  allinpayStatusApi,
  allinpayElectSignStatusApi,
  allinpayElectSignApi,
  repaircusrgcApi, changePhone
} from '@/api/merchant/merchantApi'
import {getToken} from "@/utils/auth";

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
        {value: 1, label: '正常'},
        {value: 2, label: '冻结'},
        {value: 3, label: '驳回修改'},
        {value: 4, label: '降低风控状态'},
      ],
      search: {
        status: 1
      },
      splitLoading: false,
      alterLoading: false,
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible3: false,
      dialogVisible4: false,
      codeData: {
        amount: 0,
        merchant_id: '',
        rate: 0.002,
        agent: 0.00001,
        trade_limit: 1000
      },
      rateCodeData: {
        id: '',
        amount: 0.0000,
        rate: 0.002,
        agent: 0.00001,
        trade_limit: 1000
      },
      submitLoading: false,
      bankRules: {
        bankCardNo: [
          {required: true, message: '请输入银行卡号', trigger: 'blur'},
          {pattern: /^[1-9]\d{9,29}$/, message: '请输入正确的银行卡号', trigger: 'blur'}
        ],
        // bankName: [
        //   {required: true, message: '请输入银行名称', trigger: 'blur'}
        // ],
        // bankNameSub: [
        //   {required: true, message: '请输入支行名称', trigger: 'blur'}
        // ]
      },
      phoneRules: {
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
        ]
      },
      bankCodeData: {
        id: '',
        bankCardNo: '',
        bankName: '',
        bankNameSub: ''
      },
      id: 0,
      dialogTitle: '确定冻结商户么?',
      merchant_status: 1,
      loadingText: '',
      repaircusrgcVisible: false,
      repaircusrgcUrl: '',
      phoneData: {
        id: '',
        phone: '',
      },
      dialogVisible2: false
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
    // 开通分账权限
    openSplitAuth(row) {
      this.splitLoading = true
      putOpenSplitAuth({merchant_id: row.id}).then(res => {
        this.splitLoading = false
        this.$message({
          message: this.$t('alert.optionSuccess'),
          type: 'success'
        })
      }).catch(() => {
        this.splitLoading = false
      })
    },
    // 打开限额
    alter(row) {
      this.dialogVisible = true
      this.codeData = {
        amount: row.trading_limit,
        merchant_id: row.id
      }
    },
    // 提交限额
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
    // 重置限额
    resetForm() {
      this.$refs.codeForm.resetFields()
      this.codeData = {
        amount: 0,
        merchant_id: ''
      }
    },
    // 关闭限额
    close() {
      this.dialogVisible = false
      this.resetForm()
    },
    // 打开费率
    modifyPaymentRate(row) {
      this.dialogVisible3 = true
      this.rateCodeData = {
        amount: row.pay_rate,
        rate: 0.002,
        agent: 0.00001,
        trade_limit: 1000,
        id: row.id
      }
    },
    // 提交费率
    rateSubmit() {
      this.$refs.rateCodeForm.validate(valid => {
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
            this.resetRateForm()
          }).catch(() => {
            this.submitLoading = false
          })
        }
      })
    },
    // 重置费率
    resetRateForm() {
      this.$refs.rateCodeForm.resetFields()
      this.rateCodeData = {
        amount: 0.0000,
        id: '',
        rate: 0.002,
        agent: 0.00001,
        trade_limit: 1000
      }
    },
    // 关闭费率
    rateClose() {
      this.dialogVisible3 = false
      this.resetRateForm()
    },
    // 打开银行卡
    alterModifyBankCardNum(row) {
      this.dialogVisible1 = true
      this.bankCodeData = {
        id: row.id
      }
    },
    // 提交银行卡
    bankSubmit() {
      this.$refs.codeForm1.validate(valid => {
        if (valid) {
          this.submitLoading = true
          const data = {
            id: this.bankCodeData.id,
            // bankName: this.bankCodeData.bankName,
            // bankNameSub: this.bankCodeData.bankNameSub,
            bankCardNo: this.bankCodeData.bankCardNo
          }
          changeMess(data).then(res => {
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
    // 打开修改手机
    alterModifyPhone(row) {
      this.dialogVisible2 = true
      this.phoneData.id = row.id
    },
    phoneSubmit() {
      this.$refs.codeForm2.validate(valid => {
        if (valid) {
          this.submitLoading = true
          changePhone(this.phoneData).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.fetchData()
            this.submitLoading = false
            this.dialogVisible2 = false
            this.resetPhoneForm()
          }).catch(() => {
            this.submitLoading = false
          })
        }
      })
    },
    // 重置银行卡
    resetBankForm() {
      this.$refs.codeForm1.resetFields()
      this.bankCodeData = {
        id: '',
        bankCardNo: '',
        bankName: '',
        bankNameSub: ''
      }
    },
    // 关闭银行卡
    bankClose() {
      this.dialogVisible1 = false
      this.resetBankForm()
    },
    resetPhoneForm() {
      this.$refs.codeForm2.resetFields()
      this.bankCodeData = {
        id: '',
        phone: '',
      }
    },
    phoneClose() {
      this.dialogVisible2 = false
      this.resetPhoneForm()
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
        merchantName: this.search.merchantName,
        status: this.search.status
      }
      this.loading = true
      this.loadingText = '加载数据中...'
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
    normalMerchant(row) {
      this.$confirm('确定解冻商户么?', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '解冻',
        cancelButtonText: '放弃'
      })
        .then(() => {
          normalMerchant(row.id).then(res => {
            this.$message({
              message: '解冻商户成功',
              type: 'success'
            })
            this.fetchData()
          })
        })
        .catch(action => {
        });
    },
    freezeMerchant(row) {
      this.$confirm('确定冻结商户么?', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '冻结',
        cancelButtonText: '放弃'
      })
        .then(() => {
          freezeMerchant(row.id).then(res => {
            this.$message({
              message: '冻结商户成功',
              type: 'success'
            })
            this.fetchData()
          })
        })
        .catch(action => {
        });
    },
    openingWechant(id) {
      this.loading = true
      this.loadingText = '开通微信支付中...'
      putOpenWx({merchant_id: id}).then(res => {
        this.$message({
          message: '开通微信支付成功',
          type: 'success'
        })
        this.fetchData()
      }).catch((err) => {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }).finally(() => {
        this.loading = false
      })
    },
    openingAlipay(id) {
      this.loading = true
      this.loadingText = '开通支付宝支付中...'
      putOpenAli({merchant_id: id}).then(res => {
        this.$message({
          message: '开通支付宝支付成功',
          type: 'success'
        })
        this.fetchData()
      }).catch((err) => {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }).finally(() => {
        this.loading = false
      })
    },
    openingUnoin(id) {
      this.loading = true
      this.loadingText = '开通支付中...'
      putOpenUnion({merchant_id: id}).then(res => {
        this.$message({
          message: '开通支付成功,等待通联审核',
          type: 'success'
        })
        this.fetchData()
      }).catch((err) => {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }).finally(() => {
        this.loading = false
      })
    },
    wxStatus(row) {
      const h = this.$createElement
      wxStatusApi(row.id).then(res => {
        this.$msgbox({
          title: '报文信息',
          message: h('div', null, [
            h('strong', null, '申请编号: '),
            h('span', {
              style: {
                'color': 'teal',
                'word-break': 'normal',
                'word-wrap': 'break-word !important'
              }
            }, res.data.wx_applyment_id),
            h('br'),
            h('strong', null, '请求结果: '),
            h('span', {
              style: {
                'color': 'teal',
                'word-break': 'normal',
                'word-wrap': 'break-word !important'
              }
            }, res.data.wx_upload_status)
          ]),
          confirmButtonText: '关闭',
          callback: action => {
          }
        })
      })
    },
    rejectChange(row) {
      rejectChangeApi(row.id).then(res => {
        this.$message({
          message: '驳回修改成功',
          type: 'success'
        })
        this.fetchData()
      })
    },
    allinpayStatus(row) {
      const h = this.$createElement
      allinpayStatusApi(row.id).then(res => {
        const status = {
          '00': '受理成功待提交审核',
          '01': '审核中',
          '02': '审核通过',
          '03': '审核失败',
          '04': '提交审核失败',
          '06': '已冻结',
          '07': '已关闭',
        }
        this.$msgbox({
          title: '通联商户状态',
          message: h('div', null, [
            h('strong', null, '状态值: '),
            h('span', {
              style: {
                'color': 'teal',
                'word-break': 'normal',
                'word-wrap': 'break-word !important'
              }
            }, status[res.data.auditstatus]),
            h('br'),
            h('strong', null, '描述: '),
            h('span', {
              style: {
                'color': 'teal',
                'word-break': 'normal',
                'word-wrap': 'break-word !important'
              }
            }, res.data.errmsg),
            h('br'),
            h('strong', null, '通联商户编号: '),
            h('span', {
              style: {
                'color': 'teal',
                'word-break': 'normal',
                'word-wrap': 'break-word !important'
              }
            }, res.data.mchid)
          ]),
          confirmButtonText: '关闭',
          callback: action => {
          }
        })
      })
    },
    allinpayElectSignStatus(row) {
      const h = this.$createElement
      allinpayElectSignStatusApi(row.id).then(res => {
        const status = {
          '0': '成功',
          '1': '失败',
          '2': '签约中',
          '9': '未签约',
        }
        let msg = ''
        let state = ''
        if (res.data.retcode === 'FAIL') {
          msg = res.data.retmsg
          state = '失败'
        } else {
          msg = res.data.errmsg
          state = status[res.data.electsignstatus]
        }
        this.$msgbox({
          title: '通联签约状态',
          message: h('div', null, [
            h('strong', null, '状态值: '),
            h('span', {
              style: {
                'color': 'teal',
                'word-break': 'normal',
                'word-wrap': 'break-word !important'
              }
            }, state),
            h('br'),
            h('strong', null, '描述: '),
            h('span', {
              style: {
                'color': 'teal',
                'word-break': 'normal',
                'word-wrap': 'break-word !important'
              }
            }, msg)
          ]),
          confirmButtonText: '关闭',
          callback: action => {
          }
        })
      })
    },
    allinpayElectSign(row) {
      allinpayElectSignApi(row.id).then(res => {
        this.$message({
          message: '重新下发电子协议成功',
          type: 'success'
        })
      })
    },
    repaircusrgc(row) {
      this.repaircusrgcUrl = '/ldyf/hjjf/admin/merchant/repaircusrgc/' + row.id + "?token=" + getToken()
      // this.repaircusrgcUrl = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      this.repaircusrgcVisible = true
    },
  }
}
