<template>
  <div class="app-container">
    <merchant-info v-bind:merchant-info="merchantInfo"/>
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
