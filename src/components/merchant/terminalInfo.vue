<template>
  <el-card shadow="always" v-loading="loading">
    <el-divider content-position="left">主体信息</el-divider>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col :span="12">
          <el-form-item label="交易终端名称：">
            {{data.terminal_name}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="交易终端等级：">
            {{data.terminal_level}}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left">联系人信息</el-divider>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col :span="6">
          <el-form-item label="联系人：">
            {{data.contact_name}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="联系人身份证：">
            {{data.contact_id_card}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人电话：">
            {{data.contact_phone}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人邮箱：">
            {{data.contact_email}}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left">结算银行账户信息</el-divider>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col :span="6">
          <el-form-item label="结算银行卡号：">
            {{data.bank_account}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结算银行卡开户行：">
            {{data.bank_name}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结算银行卡开户支行：">
            {{data.bank_name_sub}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="结算银行卡账户类型：">
            {{data.bank_type|bankType}}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left">其它</el-divider>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col :span="6">
          <el-form-item label="商户三方平台编号：">
            {{data.terminal_out_no}}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>

export default {
  name: 'terminalInfo',
  props: ['terminalInfo'],
  data() {
    return {
      data: {
        "bank_account":"",
        "bank_name":"",
        "bank_name_sub":"",
        "bank_type":"",
        "contact_email":"",
        "contact_id_card":"",
        "contact_name":"",
        "contact_phone":"",
        "create_time":"",
        "create_user":"",
        "id":0,
        "last_update_time":"",
        "last_update_user":"",
        "merchant_id":0,
        "p_terminal_id":0,
        "recycle_mark":0,
        "settle_cycle":"",
        "settle_cycle_day":0,
        "settle_type":"",
        "split_temp":"",
        "terminal_level":0,
        "terminal_name":"",
        "terminal_no":"",
        "terminal_out_no":"",
        "terminal_status":0
      },
      labelWidth: '170px',
      loading: true
    }
  },
  created() {
    console.log(this.data)
  },
  watch: {
    // terminalInfo() {
    //   this.data = this.terminalInfo
    //   console.log(this.data)
    //   this.loading = false
    // }
  },
  filters: {
    bankType(val) {
      const map = {
        'PUBLIC': '对公',
        'PRIVATE': '对私'
      }
      return map[val]
    },
    terminalLevelDict(merchantLevel) {
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
</script>

<style scoped>

</style>
