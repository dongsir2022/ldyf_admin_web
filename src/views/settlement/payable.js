import { getPayableList, nameSearch, getTradeListById } from '@/api/settlement/settlement'
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
      channelArr: [{ id: 1, name: '结算冻结' }, { id: 2, name: '待结算' }, { id: 3, name: '结算中' }, { id: 4, name: '结算成功' }, { id: 5, name: '结算失败' }],
      searchKey: { merchant_id: '', settleStatus: 2, completeTime: [] },
      settle_batch_id: '',
      selectloading: false,
      options: [],
      orderLoading: false,
      dialogVisible: false,
      formData: {},
      rules: {}
    }
  },
  created() {
    this.initCompleteTime()
    console.log('created -> this.$route.params', this.$route.params)

    const merchantId = this.$route.params.merchant_id
    this.searchKey.merchant_id = merchantId

    const settle_batch_id = this.$route.params.settle_batch_id
    this.settle_batch_id = settle_batch_id

    const settleStatus = this.$route.params.settleStatus
    switch (settleStatus) {
      case 1:
        this.searchKey.settleStatus = 2
        break
      case 2:
        this.searchKey.settleStatus = 4
        break
      case 3:
        this.searchKey.settleStatus = 5
        break
      default:
        break
    }
    this.fetchData()
  },
  methods: {
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
    // 获取表格数据
    fetchData() {
      this.loading = true
      const data = {
        page_num: this.page,
        page_size: this.pageSize,
        merchant_id: isNotBlank(this.searchKey.merchant_id) ? this.searchKey.merchant_id : '',
        settle_status: this.searchKey.settleStatus,
        settle_batch_id: isNotBlank(this.settle_batch_id) ? this.settle_batch_id : ''
      }
      if (isNotBlank(this.searchKey.completeTime) && this.searchKey.completeTime.length === 2) {
        data['start_date'] = moment(this.searchKey.completeTime[0]).format('YYYY-MM-DD HH:mm:ss')
        data['end_date'] = moment(this.searchKey.completeTime[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      getPayableList(data).then(res => {
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
  },
  filters: {
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
