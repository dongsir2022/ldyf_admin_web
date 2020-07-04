import { getSettlementBatchList } from '@/api/settlement/settlement'
import { isNotBlank } from '@/utils/utils'
import moment from 'moment'

export default {
  name: 'settlementBatch',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 10,
      merchant_id: '',
      searchKey: { completeTime: [] }
    }
  },
  created() {
    this.initSearchCompleteTime()
    const merchantId = this.$route.params.merchant_id
    this.merchant_id = merchantId
    this.fetchData()
  },
  mounted() {
    console.log('mounted', this.$parent)
  },
  methods: {
    // 初始化时间框参数
    initSearchCompleteTime() {
      this.searchKey.completeTime = []
      this.searchKey.completeTime.push(moment().startOf('day').toDate())
      this.searchKey.completeTime.push(moment().endOf('day').toDate())
    },
    // 获取表格数据
    fetchData() {
      console.log('completeTime', this.searchKey.completeTime)
      this.loading = true
      const data = {
        page_num: this.page,
        page_size: this.pageSize,
        merchant_id: isNotBlank(this.merchant_id) ? this.merchant_id : ''
      }
      if (isNotBlank(this.searchKey.completeTime) && this.searchKey.completeTime.length === 2) {
        data['start_date'] = moment(this.searchKey.completeTime[0]).format('YYYY-MM-DD HH:mm:ss')
        data['end_date'] = moment(this.searchKey.completeTime[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      // console.log('fetchData -> data', data)
      getSettlementBatchList(data).then(res => {
        console.log('fetchData -> res', res)
        this.loading = false
        this.list = res.data
        this.total = res.total
      }).catch(() => {
        this.loading = false
      })
    },
    // 查看应付明细
    viewPay(row) {
      console.log('viewPay -> row', row)
      this.$parent.openPage('settlement-payable', {
        settle_batch_id: row.id,
        settleStatus: row.settle_status
      })
    },
    // 查看应收明细
    viewReceive(row) {
      console.log('viewPay -> row', row)
      this.$parent.openPage('settlement-receivable', {
        settle_batch_id: row.id
      })
    },
    // 查看收款记录
    viewRecord(row) {
      console.log('viewPay -> row', row)
      this.$parent.openPage('settlement-collect-records', {
        settle_batch_id: row.id
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
