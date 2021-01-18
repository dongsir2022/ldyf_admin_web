<template>
  <div class="app-container">
    <merchant-info :merchant-info="merchantInfo" />
    <div class="block">
      <el-card>
        <el-form ref="form" :model="splitForm" label-width="100px">
          <el-divider content-position="left">支付费率</el-divider>
          <el-form-item label="费率:">
            <el-input-number v-model="splitForm.rate" :precision="4" :step="0.0001" :min="0.0000" />
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="block">
      <el-card>
        <el-form ref="form1" :model="splitForm" label-width="100px">
          <el-divider content-position="left">每日交易限额</el-divider>
          <el-form-item label="限额:">
            <el-input-number v-model="splitForm.trade_limit" :precision="2" :step="0.01" :max="10000000" :min="0.01" />
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div v-if="merchantInfo.merchant_info.approve_status===1" class="block" style="text-align:center;margin-bottom:20px;">
      <el-popconfirm title="是否同意该审批？" @confirm="agree">
        <el-button slot="reference" type="primary" plain :loading="loading">同意</el-button>
      </el-popconfirm>
      <el-popconfirm title="是否驳回该审批？" @confirm="reject">
        <el-button slot="reference" type="danger" plain :loading="loading" style="margin-left:50px;">驳回</el-button>
      </el-popconfirm>
    </div>
    <div v-if="merchantInfo.merchant_info.approve_status!==1" class="block" style="text-align:center;margin-bottom:20px;">
      <el-tag v-if="merchantInfo.merchant_info.approve_status===2" type="success">已同意</el-tag>
      <el-tag v-if="merchantInfo.merchant_info.approve_status===3" type="danger">已驳回</el-tag>
    </div>
  </div>
</template>
<script src="./merchantApprove.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
