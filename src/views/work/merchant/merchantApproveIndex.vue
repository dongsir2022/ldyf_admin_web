<template>
  <div class="app-container">
    <merchant-info :merchant-info="merchantInfo" />
    <div class="block">
      <el-card>
        <el-form ref="form" :model="splitForm" label-width="100px">
          <el-divider content-position="left">支付费率</el-divider>
          <el-form-item label="费率:">
            <el-input-number v-model="splitForm.rate" :precision="4" :step="0.0001" :max="0.006" :min="0.0038" />
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div v-if="merchantInfo.merchant_info.approve_status===1" class="block">
      <el-popconfirm title="是否同意该审批？" @onConfirm="agree">
        <el-button slot="reference" type="primary" plain :loading="loading">同意</el-button>
      </el-popconfirm>
      <el-popconfirm title="是否驳回该审批？" @onConfirm="reject">
        <el-button slot="reference" type="danger" plain :loading="loading">驳回</el-button>
      </el-popconfirm>
    </div>
    <div v-if="merchantInfo.merchant_info.approve_status!==1" class="block">
      <el-tag v-if="merchantInfo.merchant_info.approve_status===2" type="success">已同意</el-tag>
      <el-tag v-if="merchantInfo.merchant_info.approve_status===3" type="danger">已驳回</el-tag>
    </div>
  </div>
</template>
<script src="./merchantApprove.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
