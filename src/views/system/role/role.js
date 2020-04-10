import { create, getRoleList, remove, update } from '@/api/system/role'

export default {
  name: 'system-role',
  components: {},
  data() {
    const validateName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请填写用户组名'))
      } else {
        callback()
      }
    }
    const validateDesc = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请填写该用户组描述'))
      } else {
        callback()
      }
    }
    return {
      list: [],
      pageNum: 1,
      pageTotal: 1,
      pageSize: 20,
      page: 1,
      loading: false,
      rules: {
        name: [
          {validator: validateName, trigger: 'blur'}
        ],
        description: [
          {validator: validateDesc, trigger: 'blur'}
        ],
      },
      initForm: {
        id: 0,
        name: '',
        description: ''
      },
      form: {},
      assignLoading: false,
      dialogFormVisible: false,
      roleAgentDialog: false,
      roleAgentData: [],
      selectRoleAgent: [],
      editRoleId: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    resetForm() {
      this.form = {...this.initForm}
    },
    fetchData() {
      this.loading = true
      getRoleList().then(response => {
        this.loading = false
        this.list = response.data
      })
    },
    addRole() {
      this.resetForm()
      this.dialogFormVisible = true
      this.assignLoading = false
    },
    updateRole(row) {
      this.form = {...row}
      this.dialogFormVisible = true;
      this.assignLoading = false
    },
    deleteRole(row) {
      this.$confirm('您确认要删除该权限组吗？删除后该组用户无法再操作后台?', this.$t('common.tooltip'), {
        confirmButtonText: this.$t('button.sure'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'warning'
      }).then(() => {
        remove(row).then(res => {
          this.$message({
            type: 'success',
            message: this.$t('alert.optionSuccess'),
          });
          this.fetchData()
        })
      }).catch(() => {

      });
    },
    roleAddMenus(id) {
      this.$parent.openPage('system-role-edit', {
        id: id
      });
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.assignLoading = true;
          if (this.form.id === 0) {
            create(this.form).then(res => {
              this.assignLoading = false;
              this.$message({
                message: this.$t('alert.optionSuccess'),
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.fetchData();
            })
          } else {
            update(this.form).then(res => {
              this.assignLoading = false;
              this.$message({
                message: this.$t('alert.optionSuccess'),
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.fetchData()
            })
          }
        }
      })
    }
  }
}
