import { createAgencyInfoApi, getAgencyInfoListApi, getTreeInfoApi } from '@/api/config/agencyInfoApi'
import { isNotBlank } from '@/utils/utils'
// 备注：该页面已弃用
export default {
  name: 'agencyInfoListIndex',
  data() {
    return {
      data: [],
      loading: false,
      addAgencyVisible: false,
      addAgencyForm: {
        agencyName: '',
        pAgencyId: ''
      },
      rules: {
        agencyName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ]
      },
      submitLoading: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getTreeInfoApi().then(res => {
        if (res.data && res.data.length) {
          this.data = res.data
        } else {
          this.data = []
          this.$message('没有数据')
        }
      })
    },
    fetchData(pId, cb) {
      const data = {
        page_num: 1,
        page_size: 200,
        p_agency_id: isNotBlank(pId) ? pId : 0
      }
      getAgencyInfoListApi(data).then(res => {
        cb(res.data)
      })
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        const target = this
        target.loading = true
        this.fetchData(0, function(data) {
          target.loading = false
          return resolve(data)
        })
      } else {
        this.fetchData(node.data.id, function(data) {
          return resolve(data)
        })
      }
    },
    append(node, data) {
      if (node.level === 3) {
        this.$message({
          message: '只允许添加三级',
          type: 'warning'
        })
      } else {
        this.addAgencyVisible = true
        this.addAgencyForm.pAgencyId = data.id
      }
    },
    createAgencyInfo() {
      this.submitLoading = true
      const data = {
        agency_name: this.addAgencyForm.agencyName,
        p_agency_id: this.addAgencyForm.pAgencyId
      }
      createAgencyInfoApi(data).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.submitLoading = false
        this.$refs.addAgencyForm.resetFields()
        this.addAgencyVisible = false
      }).catch(() => {
        this.submitLoading = false
      })
    }
  }

}
