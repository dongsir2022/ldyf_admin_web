import { getList, register, removeCloudHorn, disableThing, enableThing } from '@/api/config/cloudHornApi'
// import { isNotBlank } from '@/utils/utils'
export default {
  name: 'cloudHornIndex',
  data() {
    return {
      loading: false, // 表格加载
      list: [], // 表格数据
      total: 0,
      page: 1,
      pageSize: 10,
      searchKey: { device_name: '' },
      dialogVisible: false,
      rules: {
        device_name: [
          { required: true, message: '请输入云喇叭名称', trigger: 'blur' }
        ]
      },
      codeData: {
        device_name: ''
      },
      submitLoading: false,
      undisabledLoading: false,
      removeLoading: false,
      disabledLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取初始数据
    fetchData() {
      this.loading = true
      const data = {
        page_num: this.page,
        page_size: this.pageSize,
        device_name: this.searchKey.device_name
      }

      console.log('fetchData -> data', data)
      getList(data).then(res => {
        console.log('fetchData -> res', res)
        this.list = res.data
        this.total = res.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 注册云喇叭
    add() {
      this.dialogVisible = true
      this.codeData.device_name = ''
    },
    // 删除
    remove(row) {
      console.log('remove -> row', row)
      this.removeLoading = true
      removeCloudHorn(row.id).then(res => {
        console.log('remove -> res', res)
        this.fetchData()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.removeLoading = false
      }).catch(() => {
        this.removeLoading = false
      })
    },
    // 禁用
    disabled(row) {
      console.log('disabled -> row', row)
      this.disabledLoading = true
      disableThing(row.id).then(res => {
        console.log('remove -> res', res)
        this.fetchData()
        this.$message({
          message: '禁用成功',
          type: 'success'
        })
        this.disabledLoading = false
      }).catch(() => {
        this.disabledLoading = false
      })
    },
    // 解禁
    undisabled(row) {
      console.log('undisabled -> row', row)
      this.undisabledLoading = true
      enableThing(row.id).then(res => {
        console.log('remove -> res', res)
        this.fetchData()
        this.$message({
          message: '解禁成功',
          type: 'success'
        })
        this.undisabledLoading = false
      }).catch(() => {
        this.undisabledLoading = false
      })
    },
    // 提交
    submit() {
      this.$refs.codeForm.validate(valid => {
        console.log('submit -> valid', valid)
        if (valid) {
          this.submitLoading = true
          const data = {
            device_name: this.codeData.device_name
          }
          register(data).then(res => {
            this.$message({
              message: '注册成功',
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
    close() {
      this.dialogVisible = false
      this.resetForm()
    },
    resetForm() {
      this.$refs.codeForm.resetFields()
      this.codeData = {
        device_name: ''
      }
    },
    // 分页
    handleCurrentChange(page) {
      this.page = page
      this.fetchData()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.fetchData()
    }
  },
  filters: {
    statusFilter(value) {
      const map = {
        0: '正常',
        1: '冻结'
      }
      return map[value]
    }

  }
}
