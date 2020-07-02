import { getWithdrowRecordList } from '@/api/merchant/merchantApi'
import { isNotBlank } from '@/utils/utils'
import moment from 'moment'

export default {
  name: 'withdrawRecordIndex',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 15,
      searchKey: {
        merchant_id: '',
        completeTime: []
      }
    }
  },
  created() {
    this.initSearchCompleteTime()
    const merchantId = this.$route.params.merchant_id
    this.searchKey.merchant_id = merchantId || ''
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
      console.log('completeTime', this.searchKey.completeTime)
      this.loading = true
      const data = {
        page_num: this.page,
        page_size: this.pageSize,
        merchant_id: this.searchKey.merchant_id
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
      console.log('fetchData -> data', data)
      getWithdrowRecordList(data).then(res => {
        this.loading = false
        this.list = res.data
        this.total = res.total
      })
    }
  },
  filters: {
    dict(value) {
      const map = {
        1: '成功',
        2: '失败',
        3: '提现中'
      }
      return map[value]
    }
  }
}
