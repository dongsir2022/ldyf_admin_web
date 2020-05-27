import {
  createAppVersionApi,
  disableAppVersionApi,
  getAppVersionDataApi,
  removeAppVersionApi, updateAppVersionApi
} from '@/api/config/appVersionApi'
import da from 'element-ui/src/locale/lang/da'
import { isNotBlank } from '@/utils/utils'

export default {
  name: 'appVersionIndex',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 15,
      appVersionVisible: false,
      appVersionData: {},
      submitLoading: false,
      rules: {
        app_no: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        app_name: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        app_version: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        app_md5: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        app_type: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        app_version_status: [
          { required: true, message: '请选择', trigger: 'blur' }
        ]
      },
      appTypeArr: [{ value: 'IOS', label: '苹果App' }, { value: 'ANDROID', label: '安卓App' }],
      appVersionStatusArr: [{ value: 1, label: '最新' }, { value: 2, label: '启用' }, { value: 3, label: '禁用' }]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
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
      getAppVersionDataApi(data).then(res => {
        this.list = res.data
        this.total = res.total
        this.loading = false
      })
    },
    addAppVersion() {
      this.appVersionVisible = true
    },
    updateAppVersion(data) {
      this.appVersionVisible = true
      this.appVersionData = JSON.parse(JSON.stringify(data))
    },
    submitAppVersion() {
      this.$refs.appVersionForm.validate(valid => {
        if (valid) {
          this.submitLoading = true
          if (isNotBlank(this.appVersionData.id)) {
            updateAppVersionApi(this.appVersionData).then(res => {
              this.$message({
                message: this.$t('alert.optionSuccess'),
                type: 'success'
              })
              this.submitLoading = false
              this.fetchData()
              this.close()
            })
          } else {
            createAppVersionApi(this.appVersionData).then(res => {
              this.$message({
                message: this.$t('alert.optionSuccess'),
                type: 'success'
              })
              this.submitLoading = false
              this.fetchData()
              this.close()
            })
          }
        }
      })
    },
    close() {
      this.appVersionVisible = false
      this.submitLoading = false
      this.appVersionData = {}
      this.$refs.appVersionForm.resetFields()
    },
    removeAppVersion(data) {
      removeAppVersionApi(data.id).then(res => {
        this.$message({
          message: this.$t('alert.optionSuccess'),
          type: 'success'
        })
        this.fetchData()
      })
    },
    disableAppVersion(data) {
      disableAppVersionApi(data.id).then(res => {
        this.$message({
          message: this.$t('alert.optionSuccess'),
          type: 'success'
        })
        this.fetchData()
      })
    }
  },
  filters: {
    appVersionStatusDict(value) {
      const map = {
        1: '最新',
        2: '启用',
        3: '禁用'
      }
      return map[value]
    }
  }
}
