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
    <el-divider content-position="left">法人信息</el-divider>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col :span="6">
          <el-form-item label="法人姓名：">
            {{ data.merchant_info_ext.contact_name }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="法人身份证：">
            {{ data.merchant_info_ext.contact_id_card }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法人身份证有效期限：">
            {{ data.merchant_info_ext.contact_id_card_period_begin }} 至
            {{ data.merchant_info_ext.contact_id_card_period_end }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="法人电话：">
            {{ data.merchant_info_ext.contact_phone }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="法人邮箱：">
            {{ data.merchant_info_ext.contact_email }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="法人身份证照片：">
            <el-image
              style="width: 300px; height: 200px"
              :src="data.merchant_info_ext.contact_id_card_before"
              :preview-src-list="[data.merchant_info_ext.contact_id_card_before]"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-image
            style="width: 300px; height: 200px;margin-left:30px;"
            :src="data.merchant_info_ext.contact_id_card_after"
            :preview-src-list="[data.merchant_info_ext.contact_id_card_after]"
          />
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left">代办人信息</el-divider>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col :span="6">
          <el-form-item label="代办人名称：">
            {{ data.merchant_info_ext.agent_name }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="代办人电话：">
            {{ data.merchant_info_ext.agent_phone }}
          </el-form-item>
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
          <el-form-item label="结算银行卡开户名：">
            {{ data.merchant_info_ext.account_name }}
          </el-form-item>
        </el-col>
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
    <el-divider content-position="left">商户实景照片</el-divider>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col :span="7">
          <el-form-item label="门头照：">
            <el-image
              style="width: 260px; height: 200px"
              :src="data.merchant_info_ext.business_place_photo"
              :preview-src-list="[data.merchant_info_ext.business_place_photo]"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="内景照：">
            <el-image
              style="width: 260px; height: 200px"
              :src="data.merchant_info_ext.business_house_photo"
              :preview-src-list="[data.merchant_info_ext.business_house_photo]"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="收银台照：">
            <el-image
              style="width: 260px; height: 200px"
              :src="data.merchant_info_ext.business_cashier_photo"
              :preview-src-list="[data.merchant_info_ext.business_cashier_photo]"
            />
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
