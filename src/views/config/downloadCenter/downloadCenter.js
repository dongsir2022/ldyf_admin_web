import {queryBatchProcessingListApi} from '@/api/config/downloadCenterApi'
import {batchGenerationQRCodeApi} from "@/api/config/qrCodeApi";

export default {
  name: 'downloadCenterIndex',
  data() {
    return {
      loading: false, // 表格加载
      page: 1, // 表格数据
      total: 0,
      pageSize: 10,
      list: [],
      createLoading: false,
      createVisible: false,
      submitLoading: false,
      createData: {
        count: 1,
        type: '3'
      },
      createTypeList: [
        {value: '1', label: '4G版本'},
        {value: '2', label: 'Wifi版本'},
        {value: '3', label: '正常版本'},
      ],
      createRules: {
        count: [
          {required: true, message: '请输入', trigger: 'blur'},
        ],
        type: [
          {required: true, message: '请选择', trigger: 'blur'},
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      this.loading = true
      const data = {
        page_num: this.page,
        page_size: this.pageSize
      }
      queryBatchProcessingListApi(data).then(res => {
        this.list = res.data
        this.total = res.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 下载
    doDownload(data) {
      if (!data) {
        return
      }
      window.open(data)
    },
    // 分页
    handleCurrentChange(page) {
      this.page = page
      this.fetchData()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.fetchData()
    },
    add() {
      this.createData = {
        count: 1,
        type: '3'
      }
      this.createVisible = true
    },
    addSubmit() {
      this.submitLoading = true
      this.$refs['createForm'].validate((valid) => {
        if (valid) {
          // 批量创建二维码
          batchGenerationQRCodeApi(this.createData).then(res => {
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            this.fetchData()
          }).catch(() => {
          }).finally(() => {
            this.submitLoading = false
            this.createVisible = false
          })
        } else {
          return false;
        }
      });
    },
    close() {
      this.dialogVisible = false
    },
    resetForm() {
      this.$refs.createForm.resetFields()
    },
  }
}
