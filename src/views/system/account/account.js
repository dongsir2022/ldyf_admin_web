// import { mapGetters } from 'vuex'
import { getAccountList, createAccount, deleteAccount, updatePassword, setRole, updateAgencyInfo } from '@/api/system/accountApi'
import { getRoleList } from '@/api/system/roleApi'
import { getTreeInfoApi } from '@/api/config/agencyInfoApi'
// import { isNotBlank } from '@/utils/utils'

export default {
  name: 'system-user',
  components: {},
  data() {
    const validateConfirmPwd = (rule, value, callback) => {
      const password = this.form.password
      const repeatPassword = this.form.confirm_password
      if (password !== repeatPassword || repeatPassword === '') {
        return callback(new Error('重复密码不正确'))
      } else {
        callback()
      }
    }
    return {
      dialogTitle: '添加用户',
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 15,
      roleList: [],
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '用户名不能少于3位', trigger: 'blur' },
          { max: 20, message: '用户名不能超过20位', trigger: 'blur' },
          { pattern: /^[a-z1-9][a-z0-9-]+[a-z0-9]$/, message: '请填写小写字母和数字的组合，不能以0开头', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, message: '用户名不能少于3位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码不能少于6位', trigger: 'blur' },
          { max: 20, message: '密码不能超过20位', trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validateConfirmPwd, trigger: 'blur' }
        ]
      },
      initForm: {
        id: 0,
        account: '',
        password: '',
        confirm_password: '',
        username: ''
      },
      form: {},
      id: 0,
      roleId: 0,
      isUpdate: false,
      saveLoading: false,
      roleLoading: false,
      dialogFormVisible: false,
      dialogRole: false,
      dialogAgency: false,
      agencyLoading: false,
      treedata: [],
      treeloading: false,
      accountId: '',
      agency_no: ''
    }
  },
  created() {
    this.getAccountList()
    this.getRoleList()
  },
  methods: {
    getAccountList() {
      const data = {
        page_num: this.page,
        page_size: this.pageSize
      }
      this.loading = true
      getAccountList(data).then(res => {
        console.log('getAccountList -> res', res)
        this.loading = false
        this.list = res.data
        this.total = res.total
      })
    },
    handleCurrentChange(page) {
      this.page = page
      this.getAccountList()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getAccountList()
    },
    addAccount() {
      this.dialogTitle = '添加用户'
      this.dialogFormVisible = true
      this.isUpdate = false
      this.form = { ...this.initForm }
    },
    resetPassword(data, index) {
      this.dialogTitle = '重置密码'
      this.dialogFormVisible = true
      this.form = { ...data }
      this.isUpdate = true
    },
    // 更换所属机构
    updateAgency(row) {
      console.log('updateAgency -> row', row)
      this.dialogAgency = true
      this.accountId = row.id
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
      if (this.accountId === '' || this.agency_no === '') {
        this.$message({
          message: '请选中所属的机构',
          type: 'info'
        })
        return
      }
      const params = {
        id: this.accountId,
        agency_no: this.agency_no + ''
      }
      console.log('saveAgency -> params', params)
      this.agencyLoading = true
      updateAgencyInfo(params).then(res => {
        console.log('saveAgency -> res', res)
        this.$message({
          message: '更换机构成功',
          type: 'success'
        })
        this.agencyLoading = false
        this.dialogAgency = false
        this.accountId = ''
        this.agency_no = ''
        this.getAccountList()
      }).catch((res) => {
        console.log('saveAgency -> res', res)
        this.$message({
          message: '很遗憾，失败了',
          type: 'fail'
        })
        this.agencyLoading = false
      })
    },
    deleteAccount(account) {
      this.$confirm('删除后该用户无法登陆，确认要删除吗?', '提示', {
        confirmButtonText: this.$t('button.submit'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'warning'
      }).then(() => {
        deleteAccount(account).then(res => {
          this.$message({
            type: 'success',
            message: this.$t('common.deleteSuccess')
          })
          this.getAccountList()
        })
      }).catch(() => {

      })
    },
    getRoleList() {
      getRoleList().then(res => {
        this.roleList = res.data
      })
    },
    editRole(account) {
      this.dialogRole = true
      this.roleId = account.role_id
      this.id = account.id
    },
    saveRole() {
      const roleId = this.roleId
      if (!roleId) {
        this.$message({
          message: '请至少选择一个角色组',
          type: 'error'
        })
        return
      }
      this.roleLoading = true
      const data = {
        id: this.id,
        role_id: this.roleId
      }
      setRole(data).then(res => {
        this.roleLoading = false
        this.$message({
          message: '设置成功',
          type: 'success'
        })
        this.dialogRole = false
        this.page = 1
        this.getAccountList()
      }).catch(res => {
        this.roleLoading = false
      })
    },
    saveAccount() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.saveLoading = true
          if (this.form.id) {
            // 修改密码
            updatePassword(this.form).then(res => {
              this.saveLoading = false
              this.$message({
                message: this.$t('common.optionSuccess'),
                type: 'success'
              })
              this.dialogFormVisible = false
              this.page = 1
              this.getAccountList()
            }).catch(res => {
              this.saveLoading = false
            })
          } else {
            // 创建账号
            const data = {
              account: this.form.account,
              username: this.form.username,
              password: this.form.password
            }
            createAccount(data).then(res => {
              this.saveLoading = false
              this.$message({
                message: this.$t('common.optionSuccess'),
                type: 'success'
              })
              this.dialogFormVisible = false
              this.page = 1
              this.getAccountList()
            }).catch(res => {
              this.saveLoading = false
            })
          }
        }
      })
    }

  }
}
