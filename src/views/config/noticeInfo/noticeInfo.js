import { getNoticeInfoApi, addNoticeInfoApi, uptNoticeInfoApi, delNoticeInfoApi } from '@/api/config/noticeInfoApi'
import editor from '@/components/richtext/index'

export default {
  name: 'noticeInfoIndex',
  components: { editor },
  data() {
    return {
      rules: {
        bulletinTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        bulletinContent: [
          { required: true, message: '请输入详细内容', trigger: 'blur' }
        ]
      },
      loading: false, // 表格加载
      list: [], // 表格数据
      total: 0,
      page: 1,
      pageSize: 15,
      editVisible: false,
      editData: {
        bulletinTitle: '',
        bulletinContent: ''
      },
      editId: '',
      type: 'add',
      submitLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    editorChange(data) {
      console.log('editorChange -> data', data)
      this.editData.bulletinContent = data
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
    // 获取数据
    fetchData() {
      this.loading = true
      const data = {
        page_num: this.page,
        page_size: this.pageSize
      }
      getNoticeInfoApi(data).then(res => {
        console.log('fetchData -> res', res)
        this.list = res.data
        this.total = res.total
        this.loading = false
      })
    },
    // 修改
    update(rowData) {
      console.log('update -> rowData', rowData)
      this.type = 'edit'
      this.editId = rowData.id
      this.editVisible = true
      this.editData.bulletinTitle = rowData.bulletinTitle
      this.editData.bulletinContent = rowData.bulletinContent
    },
    // 删除
    remove(id) {
      delNoticeInfoApi(id).then(res => {
        this.$message({
          message: this.$t('alert.optionSuccess'),
          type: 'success'
        })
        this.fetchData()
      })
    },
    // 新增
    add() {
      this.type = 'add'
      this.editVisible = true
    },
    // 提交
    submit() {
      if (!this.editData.bulletinTitle || !this.editData.bulletinContent) {
        this.$message({
          message: '标题或内容不得为空',
          type: 'info'
        })
        return
      }
      this.submitLoading = true
      if (this.type === 'add') {
        const data = {
          bulletinTitle: this.editData.bulletinTitle,
          bulletinContent: this.editData.bulletinContent
        }
        console.log('submit -> data', data)
        addNoticeInfoApi(data).then(res => {
          console.log('remove -> res', res)
          this.$message({
            message: this.$t('alert.optionSuccess'),
            type: 'success'
          })
          this.fetchData()
          this.submitLoading = false
          this.editVisible = false
          this.resetForm()
        }).catch(res => {
          console.log('submit -> res', res)
          this.$message({
            message: this.$t('alert.error'),
            type: 'fail'
          })
          this.submitLoading = false
        })
      } else if (this.type === 'edit') {
        const data = {
          bulletinTitle: this.editData.bulletinTitle,
          bulletinContent: this.editData.bulletinContent,
          id: this.editId
        }
        uptNoticeInfoApi(data).then(res => {
          console.log('remove -> res', res)
          this.$message({
            message: this.$t('alert.optionSuccess'),
            type: 'success'
          })
          this.fetchData()
          this.submitLoading = false
          this.editVisible = false
          this.resetForm()
          this.editId = ''
        }).catch(res => {
          console.log('submit -> res', res)
          this.$message({
            message: this.$t('alert.error'),
            type: 'fail'
          })
          this.submitLoading = false
        })
      }
    },
    resetForm() {
      this.$refs.noticeForm.resetFields()
      this.editData = {
        bulletinTitle: '',
        bulletinContent: ''
      }
    },
    close() {
      this.editVisible = false
      this.resetForm()
    }
  }
}
