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
            <el-col :span="10" v-if="data.merchant_info_ext.comproperty && data.merchant_info_ext.comproperty != 4">
              <el-form-item label="统一社会信用代码：">
                {{ data.merchant_info_ext.business_license }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="data.merchant_info_ext.comproperty && data.merchant_info_ext.comproperty != 4">
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
          <!--  新增字段-->
          <el-row>
            <el-form-item label="所属行业：">
              {{ data.merchant_info_ext.mccname }}
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商户性质：">
              {{ data.merchant_info_ext.comproperty|compropertyType }}
            </el-form-item>
          </el-row>
          <!--  商户性质个人时  -->
          <el-form v-if="data.merchant_info_ext.comproperty && data.merchant_info_ext.comproperty != 4" :label-width="labelWidth">
            <el-row>
              <el-form-item label="合同有效日期：">
                {{ data.merchant_info_ext.contractdate }}
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="控股股东姓名：">
                {{ data.merchant_info_ext.holdername }}
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="控股股东身份证：">
                {{ data.merchant_info_ext.holderidno }}
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="控股股东有效期：">
                {{ data.merchant_info_ext.holderexpire }}
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="注册资本：">
                {{ data.merchant_info_ext.registerfund|registerfundType }}
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="员工人数：">
                {{ data.merchant_info_ext.stafftotal|stafftotalType }}
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="经营区域：">
                {{ data.merchant_info_ext.operatelimit|operatelimitType }}
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="经营地段：">
                {{ data.merchant_info_ext.inspect|inspectType }}
              </el-form-item>
            </el-row>
          </el-form>
          <!--  商户性质个人时  -->
          <el-form v-if="data.merchant_info_ext.comproperty && data.merchant_info_ext.comproperty == 4" :label-width="labelWidth">
            <el-row>
                <el-form-item label="经营场所证明文件：">
                  <el-image
                    style="width: 300px; height: 200px;margin-left:30px;"
                    :src="data.merchant_info_ext.bizplacepic"
                    :preview-src-list="[data.merchant_info_ext.bizplacepic]"
                  />
                </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="经营者与店铺门头合照：">
                <el-image
                  style="width: 300px; height: 200px;margin-left:30px;"
                  :src="data.merchant_info_ext.peasonheadpic"
                  :preview-src-list="[data.merchant_info_ext.peasonheadpic]"
                />
              </el-form-item>
            </el-row>
          </el-form>
        </el-form>
      </el-col>
      <el-col :span="6" v-if="data.merchant_info_ext.comproperty && data.merchant_info_ext.comproperty != 4">
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
    <!--    商户性质为企业结算账户对私时-->
    <el-divider v-if="data.merchant_info_ext.comproperty && data.merchant_info_ext.comproperty == 1 && data.merchant_info_ext.bank_type == 'PRIVATE'" content-position="left">企业</el-divider>
    <el-form v-if="data.merchant_info_ext.comproperty && data.merchant_info_ext.comproperty == 1 && data.merchant_info_ext.bank_type == 'PRIVATE'" :label-width="labelWidth">
      <el-row>
        <el-col :span="6">
          <el-form-item label="对公账户号：">
            {{ data.merchant_info_ext.corporate_num }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="对公账户开户省：">
            {{ data.merchant_info_ext.corporate_provice }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="对公账号开户市：">
            {{ data.merchant_info_ext.corporate_city }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="所属银行：">
            {{ data.merchant_info_ext.public_bank_name }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="支付行号：">
            {{ data.merchant_info_ext.bank_payment }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--  法人信息  -->
    <el-divider content-position="left">法人信息</el-divider>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col :span="6">
          <el-form-item label="法人姓名：">
            {{ data.merchant_info_ext.contact_name }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别：">
            {{ data.merchant_info_ext.sex|sexType }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="职业：">
            {{ data.merchant_info_ext.occupation|occupationType }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="地址：">
            {{ data.merchant_info_ext.personaddr }}
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
      <el-row>
        <el-form-item label="手持身份证照片：">
          <el-image
            style="width: 300px; height: 200px"
            :src="data.merchant_info_ext.legalpic"
            :preview-src-list="[data.merchant_info_ext.legalpic]"
          />
        </el-form-item>
      </el-row>
    </el-form>
    <!--  业务联系人  -->
    <el-divider content-position="left">业务联系人信息</el-divider>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col :span="6">
          <el-form-item label="业务联系人姓名：">
            {{ data.merchant_info_ext.busconactperson }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务联系人电话：">
            {{ data.merchant_info_ext.busconacttel }}
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
        <el-col :span="6" v-if="data.merchant_info_ext.bank_type == 'PRIVATE'">
          <el-form-item label="结算人身份证号：">
            {{ data.merchant_info_ext.settidno }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="支付行号：">
            {{ data.merchant_info_ext.cnapsno }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="卡折类型：">
            {{ data.merchant_info_ext.accttp|accttpType }}
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
    <el-divider content-position="left"  v-if="data.merchant_info_ext.comproperty != 4">商户实景照片</el-divider>
    <el-form :label-width="labelWidth"  v-if="data.merchant_info_ext.comproperty != 4">
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
    },
    compropertyType(val) {
      const map = {
        1: '企业',
        3: '个体工商户',
        4: '个人'
      }
      return map[val]
    },
    acctType(val) {
      const map = {
        0: '对私',
        1: '对公'
      }
      return map[val]
    },
    accttpType(val) {
      const map = {
        '00': '借记卡',
        '01': '存折'
      }
      return map[val]
    },
    sexType(val) {
      const map = {
        1: '男',
        2: '女'
      }
      return map[val]
    },
    occupationType(val) {
      const map = {
        1: '国家机关、党群组织、企业、事业单位人员',
        2: '专业技术人员',
        3: '办事人员和有关人员',
        4: '商业、服务业人员',
        5: '农、林、牧、渔、水利业生产人员',
        6: '生产、运输设备操作人员及有关人员',
        7: '军人',
        8: '其他'
      }
      return map[val]
    },
    legalidType(val) {
      const map = {
        '01': '身份证',
        '04': '港澳通行证',
        '05': '台湾通行证'
      }
      return map[val]
    },
    registerfundType(val) {
      const map = {
        1: '注册资本<10w',
        2: '10w<注册资本<20w',
        3: '20w<注册资本<50w',
        4: '50w<注册资本<100w',
        5: '注册资本>100w'
      }
      return map[val]
    },
    stafftotalType(val) {
      const map = {
        1: '员工人数<10',
        2: '10<员工人数<20',
        3: '20<员工人数<50',
        4: '50<员工人数<100',
        5: '员工人数>100'
      }
      return map[val]
    },
    operatelimitType(val) {
      const map = {
        1: '城区',
        2: '郊区',
        3: '边远地区'
      }
      return map[val]
    },
    inspectType(val) {
      const map = {
        1: '商业区',
        2: '工业区',
        3: '住宅区'
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
