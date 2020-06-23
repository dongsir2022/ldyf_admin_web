<template>
  <div class="app-container">
    <merchant-info v-bind:merchant-info="merchantInfo"/>
    <div class="block">
      <el-card>
        <el-form ref="form" :model="splitForm" label-width="100px">
          <el-divider content-position="left">支付费率</el-divider>
          <el-form-item label="费率:">
            <el-input-number v-model="splitForm.rate" :precision="4" :step="0.0001" :max="0.006" :min="0.002"/>
          </el-form-item>
          <el-divider content-position="left">代理商配置</el-divider>
          <el-form-item label="代理商姓名:">
            {{agentUser.contact_name}}
          </el-form-item>
          <el-form-item label="分润:">
            <el-input-number v-model="splitForm.agent" :precision="5" :step="0.00001" :max="0.001" :min="0.00000"/>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="block" v-if="merchantInfo.merchant_info.approve_status===1">
      <el-popconfirm title="是否同意该审批？" @onConfirm="agree">
        <el-button type="primary" plain slot="reference" :loading="loading">同意</el-button>
      </el-popconfirm>
      <el-popconfirm title="是否驳回该审批？" @onConfirm="reject">
        <el-button type="danger" plain slot="reference" :loading="loading">驳回</el-button>
      </el-popconfirm>
    </div>
    <div class="block" v-if="merchantInfo.merchant_info.approve_status!==1">
      <el-tag type="success" v-if="merchantInfo.merchant_info.approve_status===2">已同意</el-tag>
      <el-tag type="danger" v-if="merchantInfo.merchant_info.approve_status===3">已驳回</el-tag>
    </div>
  </div>
</template>
<script src="./merchantApprove.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
