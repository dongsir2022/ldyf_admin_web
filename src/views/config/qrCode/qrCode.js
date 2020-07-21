import { getQRCodeListApi, createQRCodeApi, bingTradeDeviceNameApi, unbindDeviceNameApi } from '@/api/config/qrCodeApi'
import { isNotBlank } from '@/utils/utils'
export default {
  name: 'qrCodeIndex',
  data() {
    return {
      loading: false, // 表格加载
      list: [], // 表格数据
      total: 0,
      page: 1,
      pageSize: 10,
      bind_status: '',
      options: [{ id: 0, anme: '未绑定' }, { id: 1, anme: '绑定' }],
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入云喇叭名称', trigger: 'blur' }
        ]
      },
      codeData: {
        name: ''
      },
      submitLoading: false,
      createLoading: false,
      unbindLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    search() {
      this.page = 1
      this.fetchData()
    },
    // 获取初始数据
    fetchData() {
      this.loading = true
      const data = {
        page_num: this.page,
        page_size: this.pageSize,
        bind_status: isNotBlank(this.bind_status) ? this.bind_status : ''
      }

      console.log('fetchData -> data', data)
      getQRCodeListApi(data).then(res => {
        console.log('fetchData -> res', res)
        this.list = res.data
        this.total = res.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 新增
    add() {
      this.createLoading = true
      createQRCodeApi().then(res => {
        this.$message({
          message: '创建成功',
          type: 'success'
        })
        this.fetchData()
        this.createLoading = false
      }).catch(() => {
        this.createLoading = false
      })
    },
    // 绑定云喇叭
    bind(row) {
      console.log('bind -> row', row)
      this.dialogVisible = true
      this.codeData.name = ''
      this.codeData.codeNo = row.code_no
    },
    // 解绑云喇叭
    unbind(row) {
      console.log('unbind -> row', row)
      this.unbindLoading = true
      const data = {
        code_no: row.code_no
      }
      unbindDeviceNameApi(data).then(res => {
        console.log('unbind -> res', res)
        this.fetchData()
        this.unbindLoading = false
        this.$message({
          message: '解绑成功',
          type: 'success'
        })
      }).catch(() => {
        this.unbindLoading = false
      })
    },
    // 提交
    submit() {
      this.$refs.codeForm.validate(valid => {
        console.log('submit -> valid', valid)
        if (valid) {
          this.submitLoading = true
          const data = {
            trade_device_name: this.codeData.name,
            code_no: this.codeData.codeNo
          }
          bingTradeDeviceNameApi(data).then(res => {
            this.$message({
              message: '绑定成功',
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
        bindStatus: false,
        type: '',
        name: '',
        codeNo: ''
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
  }
}
