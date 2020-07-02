import { getPayableList } from '@/api/settlement/settlement'
import { isNotBlank } from '@/utils/utils'
import moment from 'moment'
export default {
  name: 'settlementPayable',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 10,
      channelArr: [{ id: 1, name: '待对账' }, { id: 2, name: '待结算' }, { id: 3, name: '结算中' }, { id: 4, name: '结算成功' }, { id: 5, name: '结算失败' }],
      searchKey: { settleStatus: 2, completeTime: [] },
      merchant_id: ''
    }
  },
  created() {
    this.initSearchCompleteTime()
    const merchantId = this.$route.params.merchant_id
    this.merchant_id = merchantId
    this.fetchData()
  },
  methods: {
    initSearchCompleteTime() {
      this.searchKey.completeTime = []
      this.searchKey.completeTime.push(moment().startOf('day').toDate())
      this.searchKey.completeTime.push(moment().endOf('day').toDate())
    },
    handleCurrentChange(page) {
      this.page = page
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
    },
    fetchData() {
      this.loading = true
      const data = {
        page_num: this.page,
        page_size: this.pageSize,
        merchant_id: this.merchant_id,
        settle_status: this.searchKey.settleStatus
      }
      if (isNotBlank(this.searchKey.completeTime) && this.searchKey.completeTime.length === 2) {
        data['start_date'] = moment(this.searchKey.completeTime[0]).format('YYYY-MM-DD HH:mm:ss')
        data['end_date'] = moment(this.searchKey.completeTime[1]).format('YYYY-MM-DD HH:mm:ss')
      } else {
        this.loading = false
        this.initSearchCompleteTime()
        this.$message.error('请选择要查询完成时间范围')
        return
      }
      getPayableList(data).then(res => {
        this.loading = false
        this.list = res.data
        this.total = res.total
      })
    }
  },
  filters: {
    settlementStatusDict(value) {
      const map = {
        1: '已结算',
        0: '未结算'
      }
      return map[value]
    }
  }
}
