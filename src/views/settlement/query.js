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
      searchKey: { trade_status: '', reconciliationStatus: '', completeTime: [] }, // 查询条件
      merchant_id: '',
      tradeArr: [{ id: 1, name: '初始化' }, { id: 2, name: '清分中' }, { id: 3, name: '清分成功' }, { id: 4, name: '清分失败' }, { id: 5, name: '等待指令清分' }, { id: 6, name: '取消' }],
      reconciliationArr: [{ id: 1, name: '待对账' }, { id: 2, name: '对账完成' }, { id: 3, name: '对账错误' }, { id: 4, name: '跳过对账' }]
    }
  },
  created() {
    this.initCompleteTime()
    this.merchant_id = this.$route.params.merchant_id
    this.fetchData()
  },
  methods: {
    search() {
      this.page = 1
      this.fetchData()
    },
    // 获取表格数据
    fetchData() {
      this.loading = true
      const data = {
        page_num: this.page,
        page_size: this.pageSize,
        merchant_id: this.merchant_id || '',
        trade_status: this.searchKey.trade_status,
        reconciliationStatus: this.searchKey.reconciliationStatus
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
    },
    initCompleteTime() {
      this.searchKey.completeTime = []
      this.searchKey.completeTime.push(moment().startOf('day').toDate())
      this.searchKey.completeTime.push(moment().endOf('day').toDate())
    }
  }
}
