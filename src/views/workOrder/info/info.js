import { getInfoApi } from '@/api/workOrder/infoApi'
// import { isNotBlank } from '@/utils/utils'
export default {
  name: 'qrCodeIndex',
  data() {
    return {
      loading: false, // 表格加载
      list: [], // 表格数据
      total: 0,
      page: 1,
      pageSize: 10,
      searchKey: { order_no: '', merchant_id: '', trade_device_phone: '', order_status: '' },
      options: [{ id: 1, anme: '未解答' }, { id: 2, anme: '已解答' }, { id: 6, anme: '已解决' }]
      // dialogVisible: false,
      // rules: {
      //   trade_device_id: [
      //     { required: true, message: '请输入门店编号', trigger: 'blur' }
      //   ],
      //   account_manager_id: [
      //     { required: true, message: '请输入客户经理编号', trigger: 'blur' }
      //   ]
      // },
      // codeData: {
      //   trade_device_id: '',
      //   account_manager_id: '',
      //   remark: ''
      // },
      // submitLoading: false
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
        order_no: this.searchKey.order_no,
        merchant_id: this.searchKey.merchant_id,
        trade_device_phone: this.searchKey.trade_device_phone,
        order_status: this.searchKey.order_status
      }

      console.log('fetchData -> data', data)
      getInfoApi(data).then(res => {
        console.log('fetchData -> res', res)
        this.list = res.data
        this.total = res.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 新增
    // add() {
    //   this.dialogVisible = true
    //   this.codeData = {
    //     trade_device_id: '',
    //     account_manager_id: '',
    //     remark: ''
    //   }
    // },
    // 提交
    // submit() {
    //   this.$refs.codeForm.validate(valid => {
    //     console.log('submit -> valid', valid)
    //     if (valid) {
    //       this.submitLoading = true
    //       const data = {
    //         trade_device_id: this.codeData.trade_device_id,
    //         account_manager_id: this.codeData.account_manager_id,
    //         remark: this.codeData.remark
    //       }
    //       addApi(data).then(res => {
    //         this.$message({
    //           message: '新增工单成功',
    //           type: 'success'
    //         })
    //         this.fetchData()
    //         this.submitLoading = false
    //         this.dialogVisible = false
    //         this.resetForm()
    //       }).catch(() => {
    //         this.submitLoading = false
    //       })
    //     }
    //   })
    // },
    // close() {
    //   this.dialogVisible = false
    //   this.resetForm()
    // },
    // resetForm() {
    //   this.$refs.codeForm.resetFields()
    //   this.codeData = {
    //     trade_device_id: '',
    //     account_manager_id: '',
    //     remark: ''
    //   }
    // },
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
