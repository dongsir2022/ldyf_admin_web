// import { mapGetters } from 'vuex'
import { getAccountManagerList, deleteCustomer, updatePassword, createCustomer, updateCustomer, updAgencyNo } from '@/api/system/customerApi'
// import { isNotBlank } from '@/utils/utils'
import { getTreeInfoApi } from '@/api/config/agencyInfoApi'

export default {
  name: 'customerManager',
  components: {},
  data() {
    const validateConfirmPwd = (rule, value, callback) => {
      const password = this.formPd.password
      const repeatPassword = this.formPd.confirmPassword
      if (password !== repeatPassword || repeatPassword === '') {
        return callback(new Error('重复密码不正确'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      page: 1,
      pageSize: 15,
      list: [],
      total: 0,
      dialogTitle: '',
      dialogFormVisible: false,
      form: {
        userName: '',
        mobilePhone: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { max: 5, message: '姓名不能超过5位', trigger: 'blur' }
        ],
        mobilePhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不对', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码不能少于6位', trigger: 'blur' },
          { max: 20, message: '密码不能超过20位', trigger: 'blur' }
        ]
      },
      initForm: {
        userName: '',
        mobilePhone: '',
        password: ''
      },
      dialogPd: false,
      formPd: {
        password: '',
        confirmPassword: ''
      },
      rulesPd: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码不能少于6位', trigger: 'blur' },
          { max: 20, message: '密码不能超过20位', trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validateConfirmPwd, trigger: 'blur' }
        ]
      },
      pdLoading: false,
      id: '',
      saveLoading: false,
      dialogAgency: false,
      agencyLoading: false,
      treedata: [],
      treeloading: false,
      customId: '',
      agency_no: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 页面表格数据查询
    fetchData() {
      const data = {
        page_num: this.page,
        page_size: this.pageSize
      }
      this.loading = true
      getAccountManagerList(data).then(res => {
        console.log('fetchData -> res', res)
        this.loading = false
        this.list = res.data
        this.total = res.total
      }).catch(() => {
        this.loading = false
      })
    },
    // 添加客户经理
    addAccount() {
      this.dialogTitle = '添加客户经理'
      this.dialogFormVisible = true
      this.id = ''
    },
    // 取消
    cancel() {
      this.dialogFormVisible = false
      this.resetForm()
    },
    // 重置表单
    resetForm() {
      this.$refs['form'].resetFields()
      this.form = { ...this.initForm }
    },
    // 修改
    update(row) {
      console.log('update -> row', row)
      this.id = row.id
      this.dialogTitle = '修改'
      this.dialogFormVisible = true
      this.form = {
        userName: row.user_name,
        mobilePhone: row.user_no
      }
    },
    // 保存新建信息或修改信息
    saveAccount() {
      this.$refs.form.validate(valid => {
        console.log('saveAccount -> valid', valid)
        if (valid) {
          this.saveLoading = true
          if (this.id) {
            // 修改
            const data = {
              id: this.id,
              name: this.form.userName,
              phone: this.form.mobilePhone
            }
            updateCustomer(data).then(res => {
              console.log('saveAccount -> res', res)
              this.saveLoading = false
              this.$message({
                message: this.$t('alert.optionSuccess'),
                type: 'success'
              })
              this.page = 1
              this.fetchData()
              this.dialogFormVisible = false
              this.resetForm()
            }).catch(() => {
              this.saveLoading = false
            })
          } else {
            // 新增
            const data = {
              name: this.form.userName,
              phone: this.form.mobilePhone,
              password: this.form.password
            }
            createCustomer(data).then(res => {
              console.log('saveAccount -> res', res)
              this.saveLoading = false
              this.$message({
                message: this.$t('alert.optionSuccess'),
                type: 'success'
              })
              this.page = 1
              this.fetchData()
              this.dialogFormVisible = false
              this.resetForm()
            }).catch(res => {
              this.saveLoading = false
            })
          }
        }
      })
    },
    // 删除
    remove(id) {
      console.log('remove -> id', id)
      if (id) {
        deleteCustomer(id).then(res => {
          this.$message({
            message: this.$t('alert.optionSuccess'),
            type: 'success'
          })
          this.fetchData()
        })
      } else {
        this.$message('缺少客户经理编号')
      }
    },
    // 重置密码
    resetPassword(row) {
      console.log('resetPassword -> row', row)
      this.dialogPd = true
      this.id = row.id
    },
    resetFormPd() {
      this.$refs['formPd'].resetFields()
      this.formPd = {
        password: '',
        confirmPassword: ''
      }
    },
    cancelPd() {
      this.dialogPd = false
      this.resetFormPd()
    },
    // 保存新密码
    saveNewPd() {
      this.$refs.formPd.validate(valid => {
        console.log('saveNewPd -> valid', valid)
        if (valid) {
          this.pdLoading = true
          const data = {
            id: this.id,
            password: this.formPd.password
          }
          updatePassword(data).then(res => {
            console.log('saveNewPd -> res', res)
            this.$message({
              message: this.$t('alert.optionSuccess'),
              type: 'success'
            })
            this.pdLoading = false
            this.dialogPd = false
            this.page = 1
            this.getData()
            this.resetFormPd()
          }).catch(() => {
            this.pdLoading = false
          })
        }
      })
    },
    // 更换所属机构
    updateAgency(row) {
      console.log('updateAgency -> row', row)
      this.dialogAgency = true
      this.customId = row.id
      this.agency_no = row.agency_no
      this.getTreeData()
    },
    // 获取机构树
    getTreeData() {
      this.treeloading = true
      getTreeInfoApi().then(res => {
        console.log('getData -> res', res)
        this.treedata = res.data
        this.$nextTick(() => {
          this.$refs.treeForm.setCheckedKeys([this.agency_no])
        })
        this.treeloading = false
      }).catch(() => {
        this.treeloading = false
      })
    },
    // 实现机构树单选
    handleNodeClick(data, checked, node) {
      console.log('handleNodeClick -> data, checked, node', data, checked, node)
      if (checked === true) {
        this.agency_no = data.agency_no
        this.$refs.treeForm.setCheckedKeys([data.agency_no])
      } else {
        if (this.agency_no === data.agency_no) {
          this.$refs.treeForm.setCheckedKeys([data.agency_no])
        }
      }
    },
    // 更换机构保存
    saveAgency() {
      if (this.customId === '' || this.agency_no === '') {
        this.$message({
          message: '请选中所属的机构',
          type: 'info'
        })
        return
      }
      const params = {
        id: this.customId,
        agency_no: this.agency_no + ''
      }
      console.log('saveAgency -> params', params)
      this.agencyLoading = true
      updAgencyNo(params).then(res => {
        console.log('saveAgency -> res', res)
        this.$message({
          message: '更换机构成功',
          type: 'success'
        })
        this.agencyLoading = false
        this.dialogAgency = false
        this.customId = ''
        this.agency_no = ''
        this.fetchData()
      }).catch(() => {
        this.agencyLoading = false
      })
    },
    // 分页
    handleCurrentChange(page) {
      this.page = page
      this.getData()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getData()
    }
  }
}
