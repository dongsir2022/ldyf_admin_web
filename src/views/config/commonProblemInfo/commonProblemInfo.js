import { delCommonProblemInfoApi, getCommonProblemInfoListApi, addCommonProblemInfoApi, uptCommonProblemInfoApi } from '@/api/config/commonProblemInfo'
import editor from '@/components/richtext/index'

export default {
  name: 'commonProblemInfoIndex',
  components: { editor },
  data() {
    return {
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入详细内容', trigger: 'blur' }
        ]
      },
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 15,
      editVisible: false,
      editData: {
        title: '',
        content: ''
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
      this.editData.content = data
    },
    handleCurrentChange(page) {
      this.page = page
      this.fetchData()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.fetchData()
    },
    fetchData() {
      this.loading = true
      const data = {
        page_num: this.page,
        page_size: this.pageSize
      }
      getCommonProblemInfoListApi(data).then(res => {
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
      this.editData.title = rowData.problem_title
      this.editData.content = rowData.problem_content
    },
    // 删除
    remove(id) {
      delCommonProblemInfoApi(id).then(res => {
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
      if (!this.editData.title || !this.editData.content) {
        this.$message({
          message: '标题或内容不得为空',
          type: 'info'
        })
        return
      }
      this.submitLoading = true
      if (this.type === 'add') {
        const data = {
          problem_title: this.editData.title,
          problem_content: this.editData.content
        }
        console.log('submit -> data', data)
        addCommonProblemInfoApi(data).then(res => {
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
          problem_title: this.editData.title,
          problem_content: this.editData.content,
          id: this.editId
        }
        uptCommonProblemInfoApi(data).then(res => {
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
      this.$refs.problemForm.resetFields()
      this.editData = {
        title: '',
        content: ''
      }
    },
    close() {
      this.editVisible = false
      this.resetForm()
    }
  }
}