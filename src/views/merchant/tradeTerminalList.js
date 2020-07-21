import { getTradeTerminalList } from '@/api/merchant/merchantApi'
import { isNotBlank } from '@/utils/utils'

export default {
  name: 'tradeTerminalIndex',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      page: 1,
      pageSize: 15,
      supTerminalArr: [],
      merchantLevel: 1,
      tradeTerminalStatus: [
        { value: 1, label: '正常' },
        { value: 2, label: '冻结' }
      ],
      search: {
        status: 1
      }
    }
  },
  created() {
    this.search.merchantId = this.$route.params.merchant_id
    this.search.level = 1
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
    fetchData(cb) {
      const data = {
        page_num: this.page,
        page_size: this.pageSize,
        status: this.search.status,
        merchant_id: isNotBlank(this.search.merchantId) ? this.search.merchantId : 0,
        level: isNotBlank(this.search.level) ? this.search.level : 0,
        p_terminal_id: isNotBlank(this.search.pTerminalId) ? this.search.pTerminalId : 0
      }
      this.loading = true
      getTradeTerminalList(data).then(res => {
        if (cb) {
          cb(res)
        } else {
          this.list = res.data
          this.total = res.total
        }
        this.loading = false
      }).catch(error => {
        console.log('fetchData -> error', error)
        this.loading = false
      })
    },
    clearData() {
      this.list = []
      this.total = 0
    },
    subTradeTerminalFetchData(row) {
      const target = this
      this.search.pTerminalId = row.id
      this.search.level = 0
      this.fetchData(function(res) {
        if (res.total) {
          target.supTerminalArr.push(row)
          target.clearData()
          target.list = res.data
          target.total = res.total
        } else {
          target.$message({
            message: '未找到下级交易终端信息',
            type: 'warning'
          })
        }
      })
    },
    gotoTerminalFetchData(row) {
      this.clearData()
      this.loading = true
      if (row.terminal_level === 1) {
        this.supTerminalArr = []
        this.search.level = 1
        this.search.pTerminalId = 0
      } else {
        this.search.pTerminalId = row.id
        this.search.level = 0
        this.supTerminalArr.splice(row.terminal_level - 1, this.supTerminalArr.length - row.terminal_level + 1)
      }
      this.fetchData()
    },
    freezeMerchant(row) {
      this.$message.error('服务不可用')
    },
    info(id) {
      this.$parent.openPage('merchant-tradeTerminal-info', {
        terminal_id: id
      })
    }
  },
  filters: {
    merchantLevelDict(merchantLevel) {
      const map = {
        1: '一级',
        2: '二级',
        3: '三级',
        4: '四级',
        5: '五级'
      }
      return map[merchantLevel]
    }
  }
}
