import { getWithdrowRecordList } from '@/api/merchant/merchantApi'
import { nameSearch } from '@/api/settlement/settlement'
// import { isNotBlank } from '@/utils/utils'
// import moment from 'moment'

export default {
  name: 'withdrawRecordIndex',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 10,
      searchKey: {
        merchant_id: '',
        completeTime: []
      },
      selectloading: false,
      options: []
    }
  },
  created() {
    // const merchantId = this.$route.params.merchant_id
    // this.searchKey.merchant_id = merchantId || ''
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
        merchant_id: this.searchKey.merchant_id
      }

      console.log('fetchData -> data', data)
      getWithdrowRecordList(data).then(res => {
        console.log('fetchData -> res', res)
        this.loading = false
        this.list = res.data
        this.total = res.total
      }).catch(() => {
        this.loading = false
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
