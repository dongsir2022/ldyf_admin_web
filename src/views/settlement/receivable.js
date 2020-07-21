import { getReceivableList, nameSearch, getTradeListById } from '@/api/settlement/settlement'
import { isNotBlank } from '@/utils/utils'
import moment from 'moment'

export default {
  name: 'settlementReceivable',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 10,
      searchKey: { merchant_id: '', completeTime: [] },
      settle_batch_id: '',
      selectloading: false,
      options: [],
      collect_record_id: '',
      orderLoading: false,
      dialogVisible: false,
      formData: {},
      rules: {}
    }
  },
  created() {
    this.initCompleteTime()

    const merchantId = this.$route.params.merchant_id
    this.searchKey.merchant_id = merchantId

    const settle_batch_id = this.$route.params.settle_batch_id
    this.settle_batch_id = settle_batch_id

    const collect_record_id = this.$route.params.collect_record_id
    this.collect_record_id = collect_record_id

    this.fetchData()
  },
  methods: {
    search() {
      this.page = 1
      this.fetchData()
    },
    // 远程搜索值变化
    remoteMethod(query) {
      console.log('remoteMethod -> query', query)
      if (query !== '') {
        this.selectloading = true
        const data = {
          page_num: this.page,
          page_size: this.pageSize,
          name: query
        }
        nameSearch(data).then(res => {
          console.log('remoteMethod -> res', res)
          this.selectloading = false
          this.options = res.data
        }).catch(() => {
          this.selectloading = false
        })
      } else {
        this.options = []
      }
    },
    // 相关订单
    getOrder(row) {
      console.log('getOrder -> row', row)
      this.orderLoading = true
      const data = {
        trade_id: row.trade_id,
        page_num: this.page,
        page_size: this.pageSize
      }
      getTradeListById(data).then(res => {
        console.log('getOrder -> res', res)
        this.orderLoading = false
        this.dialogVisible = true
        this.formData = res.data[0]
      }).catch(() => {
        this.orderLoading = false
      })
    },
    // 关闭弹窗
    close() {
      this.dialogVisible = false
      this.formData = {}
    },
    // 初始数据获取
    fetchData() {
      this.loading = true
      const data = {
        page_num: this.page,
        page_size: this.pageSize,
        merchant_id: isNotBlank(this.searchKey.merchant_id) ? this.searchKey.merchant_id : '',
        collect_record_id: isNotBlank(this.collect_record_id) ? this.collect_record_id : '',
        settle_batch_id: isNotBlank(this.settle_batch_id) ? this.settle_batch_id : ''
      }
      if (isNotBlank(this.searchKey.completeTime) && this.searchKey.completeTime.length === 2) {
        data['start_date'] = moment(this.searchKey.completeTime[0]).format('YYYY-MM-DD HH:mm:ss')
        data['end_date'] = moment(this.searchKey.completeTime[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      getReceivableList(data).then(res => {
        console.log('fetchData -> res', res)
        this.loading = false
        this.list = res.data
        this.total = res.total
      }).catch(() => {
        this.loading = false
      })
    },
    handleCurrentChange(page) {
      this.page = page
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
    },
    initCompleteTime() {
      this.searchKey.completeTime = []
      this.searchKey.completeTime.push(moment().startOf('day').toDate())
      this.searchKey.completeTime.push(moment().endOf('day').toDate())
    }
  },
  filters: {
    settlementStatusDict(value) {
      const map = {
        1: '已结算',
        0: '未结算'
      }
      return map[value]
    },
    tradeFilter(value) {
      const map = {
        1: '初始化',
        2: '清分中',
        3: '清分成功',
        4: '清分失败',
        5: '等待指令清分',
        6: '取消'
      }
      return map[value]
    },
    reconciliationFilter(value) {
      const map = {
        1: '待对账',
        2: '对账完成',
        3: '对账错误',
        4: '跳过对账'
      }
      return map[value]
    }
  }
}
