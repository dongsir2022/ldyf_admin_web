import { getQueryList } from '@/api/settlement/settlement'
import { isNotBlank } from '@/utils/utils'
import moment from 'moment'
export default {
  name: 'queryList',
  data() {
    return {
      loading: false, // 表格加载
      list: [], // 表格数据
      total: 0, // 总页数
      page: 1, // 当前页
      pageSize: 10, // 每页条数
      searchKey: { completeTime: [] }, // 查询条件
      merchant_id: ''
    }
  },
  created() {
    this.merchant_id = this.$route.params.merchant_id
    this.fetchData()
  },
  methods: {

    // 获取相关订单
    getOrder(row) {
      console.log('getOrder -> row', row)
    },

    // 获取表格数据
    fetchData() {
      this.loading = true
      const data = {
        page_num: this.page,
        page_size: this.pageSize,
        merchant_id: this.merchant_id || ''
      }
      if (isNotBlank(this.searchKey.completeTime) && this.searchKey.completeTime.length === 2) {
        data['start_date'] = moment(this.searchKey.completeTime[0]).format('YYYY-MM-DD HH:mm:ss')
        data['end_date'] = moment(this.searchKey.completeTime[1]).format('YYYY-MM-DD HH:mm:ss')
      }

      // console.log('fetchData -> data', data)
      getQueryList(data).then(res => {
        console.log('fetchData -> res', res)
        this.loading = false
        this.list = res.data
        this.total = res.total
      }).catch(() => {
        this.loading = false
      })
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
