import TerminalInfo from '@/components/merchant/terminalInfo'
import { getTradeTerminalInfo } from '@/api/merchant/merchantApi'

export default {
  name: 'terminalInfoIndex',
  components: { TerminalInfo },
  data() {
    return {
      terminalId: '',
      terminalInfo: {
        'bank_account': '',
        'bank_name': '',
        'bank_name_sub': '',
        'bank_type': '',
        'contact_email': '',
        'contact_id_card': '',
        'contact_name': '',
        'contact_phone': '',
        'create_time': '',
        'create_user': '',
        'id': 0,
        'last_update_time': '',
        'last_update_user': '',
        'merchant_id': 0,
        'p_terminal_id': 0,
        'recycle_mark': 0,
        'settle_cycle': '',
        'settle_cycle_day': 0,
        'settle_type': '',
        'split_temp': '',
        'terminal_level': 0,
        'terminal_name': '',
        'terminal_no': '',
        'terminal_out_no': '',
        'terminal_status': 0
      },
      loading: false
    }
  },
  created() {
    const terminalId = this.$route.params.terminal_id
    if (terminalId) {
      this.terminalId = terminalId
      this.fetchData()
    } else {
      this.$message.error('获取交易终端信息错误')
    }
  },
  methods: {
    fetchData() {
      getTradeTerminalInfo(this.terminalId).then(res => {
        this.terminalInfo = res.data
        this.loading = false
      })
    }
  }
}
