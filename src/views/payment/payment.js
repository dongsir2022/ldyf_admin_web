import { getPaymentListApi } from '@/api/payment/paymentApi'
import { currency, isNotBlank } from '@/utils/utils'
import moment from 'moment'

export default {
  name: 'paymentIndex',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 10,
      searchKey: { orderNo: '', completeTime: [] }
    }
  },
  created() {
    this.initSearchCompleteTime()
    this.fetchData()
  },
  methods: {
    search() {
      this.page = 1
      this.fetchData()
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
      if (isNotBlank(this.searchKey.orderNo)) {
        data['order_no'] = this.searchKey.orderNo
      }
      if (isNotBlank(this.searchKey.completeTime) && this.searchKey.completeTime.length === 2) {
        data['start_time'] = moment(this.searchKey.completeTime[0]).format('YYYY-MM-DD HH:mm:ss')
        data['end_time'] = moment(this.searchKey.completeTime[1]).format('YYYY-MM-DD HH:mm:ss')
      } else {
        this.loading = false
        this.initSearchCompleteTime()
        this.$message.error('请选择要查询完成时间范围')
        return
      }
      getPaymentListApi(data).then(res => {
        this.list = res.data
        this.total = res.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    initSearchCompleteTime() {
      this.searchKey.completeTime = []
      this.searchKey.completeTime.push(moment().startOf('day').toDate())
      this.searchKey.completeTime.push(moment().endOf('day').toDate())
    }
  },
  filters: {
    moneyFormat(value) {
      return currency(value, '')
    }
  }
}
