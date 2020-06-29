<template>
  <el-card v-loading="loading" shadow="always">
    <el-divider content-position="left">主体信息</el-divider>
    <el-row>
      <el-col :span="12">
        <el-form :label-width="labelWidth">
          <el-row>
            <el-form-item label="商户名称：">
              {{ data.merchant_info.merchant_name }}
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="营业执照编号：">
                {{ data.merchant_info_ext.business_license }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法人姓名：">
                {{ data.merchant_info_ext.business_person }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row />
          <el-row>
            <el-col :span="24">
              <el-form-item label="营业执照有效期限：">
                {{ data.merchant_info_ext.business_period_begin }} 至 {{ data.merchant_info_ext.business_period_end }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="经营省市区：">
                {{ data.merchant_info_ext.business_province }}-{{ data.merchant_info_ext.business_city }}-{{ data.merchant_info_ext.business_area }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="经营详细地址：">
                {{ data.merchant_info_ext.business_address }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-row>
          <el-col>
            <el-image
              style="width: 400px; height: 250px"
              :src="data.merchant_info_ext.business_photo"
              :preview-src-list="[data.merchant_info_ext.business_photo]"
            />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider content-position="left">联系人信息</el-divider>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col :span="6">
          <el-form-item label="联系人：">
            {{ data.merchant_info_ext.contact_name }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人类型：">
            {{ data.merchant_info_ext.contact_type|contactTypeDict }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="联系人身份证：">
            {{ data.merchant_info_ext.contact_id_card }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人身份证有效期限：">
            {{ data.merchant_info_ext.contact_id_card_period_begin }} 至
            {{ data.merchant_info_ext.contact_id_card_period_end }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="联系人电话：">
            {{ data.merchant_info_ext.contact_phone }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人邮箱：">
            {{ data.merchant_info_ext.contact_email }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="联系人身份证照片：">
            <el-image
              style="width: 300px; height: 200px"
              :src="data.merchant_info_ext.contact_id_card_before"
              :preview-src-list="[data.merchant_info_ext.contact_id_card_before]"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-image
            style="width: 300px; height: 200px"
            :src="data.merchant_info_ext.contact_id_card_after"
            :preview-src-list="[data.merchant_info_ext.contact_id_card_after]"
          />
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left">结算银行账户信息</el-divider>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col :span="6">
          <el-form-item label="结算银行卡号：">
            {{ data.merchant_info_ext.bank_card_no }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结算银行卡开户行：">
            {{ data.merchant_info_ext.bank_name }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结算银行卡开户支行：">
            {{ data.merchant_info_ext.bank_name_sub }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="结算银行卡账户类型：">
            {{ data.merchant_info_ext.bank_type|bankType }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="结算银行卡照片：">
            <el-image
              style="width: 300px; height: 200px"
              :src="data.merchant_info_ext.bank_photo"
              :preview-src-list="[data.merchant_info_ext.bank_photo]"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left">其它</el-divider>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col :span="6">
          <el-form-item label="商户三方平台编号：">
            {{ data.merchant_info.merchant_out_no }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="微信商户识别号：">
            {{ data.merchant_info.wechat_no }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="支付宝商户识别号：">
            {{ data.merchant_info.alipay_no }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'MerchantInfo',
  filters: {
    contactTypeDict(val) {
      const map = {
        'LEGAL_PERSO': '法人',
        'CONTROLLER': '实际控制人',
        'AGENT': '代理人',
        'OTHER': '其他'
      }
      return map[val]
    },
    bankType(val) {
      const map = {
        'PUBLIC': '对公',
        'PRIVATE': '对私'
      }
      return map[val]
    }
  },
  props: {
    merchantInfo: {
      type: Object,
      default: function() {}
    }
  },
  data() {
    return {
      data: this.merchantInfo,
      labelWidth: '170px',
      loading: true
    }
  },
  watch: {
    merchantInfo() {
      this.data = this.merchantInfo
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
