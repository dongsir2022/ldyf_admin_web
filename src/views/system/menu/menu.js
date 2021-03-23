import { create, getMenuTree, remove, update } from '@/api/system/menuApi'

export default {
  name: 'system-menu',
  data() {
    return {
      data: [],
      loading: false,
      props: {
        children: 'children',
        label: 'title'
      },
      formVisible: false,
      isAdd: true,
      formTitle: '添加菜单',
      initForm: {
        id: 0,
        site_id: 1,
        name: '',
        title: '',
        type: 1,
        path: '',
        component: '',
        icon: '',
        parent_id: 0,
        hidden: 0,
        always_show: 0,
        sort_value: 1,
        comments: ''
      },
      form: {},
      options: {
        site_id: [
          {
            value: 1,
            label: '总部菜单'
          },
          {
            value: 2,
            label: '机构菜单'
          }
        ],
        type: [
          {
            value: 1,
            label: '文件夹'
          },
          {
            value: 2,
            label: '页面'
          }
        ]
      },
      rules: {
        name: [{ required: true, message: '请输入菜单英文名称', trigger: 'blur' }],
        title: [{ required: true, message: '请输入菜单标题（显示名称）', trigger: 'blur' }],
        type: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }],
        path: [{ required: true, message: '请输入path', trigger: 'blur' }],
        component: [{ required: true, message: '请输入页面地址', trigger: 'blur' }],
        sort_value: [
          { required: true, message: '请输入排序值', trigger: 'blur' },
          {
            message: '请输入数字', type: 'number', transform(value) {
              if (value) {
                return Number(value)
              }
            }
          }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    resetForm() {
      this.form = { ...this.initForm, site_id: this.site_id }
    },
    fetchData() {
      this.loading = true
      getMenuTree().then(response => {
        this.loading = false
        this.data = response.data
      })
    },
    menuTypeChange(form) {
      if (form.type === 1) {
        form.always_show = 1
      } else {
        form.always_show = 0
      }
    },
    append(node, data) {
      console.log(node, data)
      this.resetForm()
      this.form.parent_id = node.data.id
      this.form.name = node.data.name + '-'
      this.form.type = 2
      this.formTitle = '添加子菜单'
      this.formVisible = true
      this.isAdd = true
    },
    edit(node, data) {
      this.form = { ...node.data }
      this.isAdd = false
      this.formTitle = '编辑菜单'
      this.formVisible = true
    },
    remove(node, data) {
      this.$confirm(this.$t('alert.deleteParentConfirm'), this.$t('alert.tooltip'), {
        confirmButtonText: this.$t('button.sure'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'warning'
      }).then(() => {
        remove({
          id: node.data.id,
          site_id: data.site_id
        }).then(response => {
          this.$message({
            message: this.$t('alert.deleteSuccess'),
            type: 'success'
          })
          this.fetchData()
        })
      }).catch(() => {
      })
    },
    addRootMenu() {
      this.resetForm()
      this.formTitle = '添加菜单'
      this.form.component = 'Layout'
      this.formVisible = true
      this.isAdd = true
    },
    cancel() {
      this.formVisible = false
      // 移除表单项的校验结果
      this.$refs.form.clearValidate()
    },
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id === 0) {
            create(this.form).then(response => {
              this.$message({
                message: this.$t('alert.optionSuccess'),
                type: 'success'
              })
              this.fetchData()
              this.formVisible = false
              this.resetForm()
            })
          } else {
            update(this.form).then(response => {
              this.$message({
                message: this.$t('alert.optionSuccess'),
                type: 'success'
              })
              this.fetchData()
              this.formVisible = false
              this.resetForm()
            })
          }
        } else {
          return false
        }
      })
    }

  }

}
