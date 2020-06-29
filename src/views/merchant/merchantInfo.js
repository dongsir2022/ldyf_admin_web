import MerchantInfo from '@/components/merchant/merchantInfo'
import { getMerchantInfo } from '@/api/merchant/merchantApi'

export default {
  name: 'merchantInfoIndex',
  components: { MerchantInfo },
  data() {
    return {
      merchantId: '',
      merchantInfo: {
        'merchant_info': {
          'alipay_no': '',
          'approve_status': 0,
          'merchant_name': '',
          'merchant_no': '',
          'merchant_out_no': '',
          'wechat_no': ''
        },
        'merchant_info_ext': {
          'bank_card_no': '',
          'bank_name': '',
          'bank_name_sub': '',
          'bank_photo': '',
          'bank_type': '',
          'business_address': '',
          'business_area': '',
          'business_city': '',
          'business_license': '',
          'business_period_begin': '',
          'business_period_end': '',
          'business_person': '',
          'business_photo': '',
          'business_province': '',
          'contact_email': '',
          'contact_id_card': '',
          'contact_id_card_after': '',
          'contact_id_card_before': '',
          'contact_id_card_period_begin': '',
          'contact_id_card_period_end': '',
          'contact_name': '',
          'contact_phone': '',
          'contact_type': '',
          'create_time': '',
          'create_user': ''
        }
      },
      loading: false
    }
  },
  created() {
    const merchantId = this.$route.params.merchant_id
    if (merchantId) {
      this.merchantId = merchantId
      this.fetchData()
    } else {
      this.$message.error('获取商户信息错误')
    }
  },
  methods: {
    fetchData() {
      getMerchantInfo(this.merchantId).then(res => {
        this.merchantInfo = res.data
        this.loading = false
      })
    }
  }
}
