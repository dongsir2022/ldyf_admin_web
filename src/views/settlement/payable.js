import { getPayableList, nameSearch } from '@/api/settlement/settlement'
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
      options: []
    }
  },
  created() {
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
    getOrder(row) {
      console.log('getOrder -> row', row)
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
    }
  }
}
