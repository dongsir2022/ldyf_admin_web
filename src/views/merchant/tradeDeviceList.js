import {
  bindingDeviceOperator,
  createDeviceOperator,
  deviceOperatorChangePassword,
  freezeDeviceOperator,
  getDeviceOperatorList,
  getTradeDeviceList,
  normalDeviceOperator,
  unbindDeviceOperator,
  unbindDeviceOperatorList
} from '@/api/merchant/merchantApi'

export default {
  name: 'tradeDeviceListIndex',
  data() {
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/

        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 15,
      merchantId: 0,
      deviceOperatorListVisible: false,
      deviceOperatorListLoading: false,
      deviceOperatorData: [],
      deviceOperatorTotal: 0,
      deviceOperatorPage: 1,
      deviceOperatorPageSize: 15,
      tradeDeviceId: 0,
      deviceOperatorPasswordVisible: false,
      passwordForm: {
        password: ''
      },
      passwordRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 12, message: '密码不能少于12位', trigger: 'blur' },
          { max: 18, message: '密码不能超过18位', trigger: 'blur' },
          { pattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).*.{12,18}$/, message: '密码规则为数字大小写字母特殊符号的组合', trigger: 'blur' }
        ]
      },
      deviceOperatorId: 0,
      deviceOperatorPasswordLoading: false,
      createDeviceOperatorVisible: false,
      createDeviceOperatorForm: {
        name: '',
        phone: '',
        account_type: ''
      },

      createDeviceOperatorRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        account_type: [
          { required: true, message: '请选择操作员权限', trigger: 'change' }
        ]
      },
      createDeviceOperatorLoading: false,
      unbindDeviceOperatorListVisible: false,
      unbindDeviceOperatorListLoading: false,
      unbindDeviceOperatorData: [],
      unbindDeviceOperatorTotal: 0,
      unbindDeviceOperatorPage: 1,
      unbindDeviceOperatorPageSize: 15
    }
  },
  created() {
    const merchantId = this.$route.params.merchant_id
    if (merchantId) {
      this.merchantId = merchantId
      this.fetchData()
    } else {
      this.$message.error('获取门店列表错误')
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
      const data = {
        page_num: this.page,
        page_size: this.pageSize,
        merchant_id: this.merchantId
      }
      this.loading = true
      getTradeDeviceList(data).then(res => {
        this.loading = false
        this.list = res.data
        this.total = res.total
      }).catch(() => {
        this.loading = false
      })
    },
    openDeviceOperatorList(id) {
      this.tradeDeviceId = id
      this.deviceOperatorListVisible = true
      this.deviceOperatorListLoading = true
      const data = {
        page_num: this.page,
        page_size: this.pageSize,
        trade_device_id: id
      }
      getDeviceOperatorList(data).then(res => {
        this.deviceOperatorListLoading = false
        this.deviceOperatorData = res.data
        this.deviceOperatorTotal = res.total
      })
    },
    openUnbindDeviceOperatorList(id) {
      this.tradeDeviceId = id
      this.unbindDeviceOperatorListVisible = true
      this.unbindDeviceOperatorListLoading = true
      const data = {
        page_num: this.page,
        page_size: this.pageSize,
        merchant_id: this.merchantId
      }
      unbindDeviceOperatorList(data).then(res => {
        this.unbindDeviceOperatorListLoading = false
        this.unbindDeviceOperatorData = res.data
        this.unbindDeviceOperatorTotal = res.total
      }).catch(res => {
        this.unbindDeviceOperatorData = []
        this.unbindDeviceOperatorTotal = 0
        this.unbindDeviceOperatorListLoading = false
      })
    },
    freezeDeviceOperator(id) {
      freezeDeviceOperator(id).then(res => {
        this.$message({
          message: '冻结操作员成功',
          type: 'success'
        })
        this.openDeviceOperatorList(this.tradeDeviceId)
      })
    },
    normalDeviceOperator(id) {
      normalDeviceOperator(id).then(res => {
        this.$message({
          message: '解冻操作员成功',
          type: 'success'
        })
        this.openDeviceOperatorList(this.tradeDeviceId)
      })
    },
    unbindDeviceOperator(id) {
      unbindDeviceOperator(id).then(res => {
        this.$message({
          message: '解除绑定成功',
          type: 'success'
        })
        this.openDeviceOperatorList(this.tradeDeviceId)
      })
    },
    bindingDeviceOperator(id) {
      const data = {
        operator_id: id,
        trade_device_id: this.tradeDeviceId
      }
      bindingDeviceOperator(data).then(res => {
        this.$message({
          message: '绑定成功',
          type: 'success'
        })
        this.openUnbindDeviceOperatorList(this.tradeDeviceId)
      })
    },
    openDeviceOperatorPassword(id) {
      this.deviceOperatorPasswordVisible = true
      this.deviceOperatorId = id
    },
    deviceOperatorChangePassword() {
      this.$refs['passwordForm'].validate((valid) => {
        if (valid) {
          this.deviceOperatorPasswordLoading = true
          const data = {
            id: this.deviceOperatorId,
            password: this.passwordForm.password
          }
          deviceOperatorChangePassword(data).then(res => {
            this.$message({
              message: '操作员修改密码成功',
              type: 'success'
            })
            this.deviceOperatorPasswordLoading = false
            this.deviceOperatorPasswordVisible = false
          }).catch(res => {
            this.deviceOperatorPasswordLoading = false
          })
        }
      })
    },
    openCreateDeviceOperator(id) {
      this.tradeDeviceId = id
      this.createDeviceOperatorVisible = true
      this.$refs.createDeviceOperatorForm.resetFields()
    },
    createDeviceOperator() {
      this.$refs['createDeviceOperatorForm'].validate((valid) => {
        if (valid) {
          this.createDeviceOperatorVisible = true
          this.createDeviceOperatorLoading = true
          const data = {
            user_name: this.createDeviceOperatorForm.name,
            user_no: this.createDeviceOperatorForm.phone,
            mobile_phone: this.createDeviceOperatorForm.phone,
            account_type: this.createDeviceOperatorForm.account_type,
            trade_device_id: this.tradeDeviceId,
            merchant_id: this.merchant_id
          }
          createDeviceOperator(data).then(res => {
            this.$message({
              message: '添加操作员成功',
              type: 'success'
            })
            this.createDeviceOperatorVisible = false
            this.createDeviceOperatorLoading = false
          }).catch(res => {
            this.createDeviceOperatorLoading = false
          })
        }
      })
    }
  },
  filters: {
    deviceStatusDict(val) {
      const map = {
        0: '正常',
        1: '冻结'
      }
      return map[val]
    },
    deviceOperatorStatusDict(val) {
      const map = {
        1: '正常',
        0: '冻结'
      }
      return map[val]
    }
  }
}
