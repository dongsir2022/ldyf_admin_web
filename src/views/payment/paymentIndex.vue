<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input v-model="searchKey.orderNo" clearable class="filter-item input-tx" placeholder="输入订单号" />
        </el-col>
        <el-col :span="7">
          <el-date-picker
            v-model="searchKey.completeTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="完成开始时间"
            end-placeholder="完成结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" icon="el-icon-search" :loading="loading" @click="search">查询
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        width="200"
        label="订单编号"
        prop="order_no"
      />
      <el-table-column
        align="center"
        width="100"
        label="支付金额"
      >
        <template slot-scope="scope">
          {{ scope.row.pay_amount|moneyFormat }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="100"
        label="支付状态"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.pay_status === '10A'">支付中</span>
          <span v-if="scope.row.pay_status === '10B'">支付成功</span>
          <el-col :span="1">
            <el-button size="small" type="primary" class="filter-item" v-if="scope.row.pay_status === '10C'" @click="paymentFailed(scope.row)">支付失败</el-button>
          </el-col>

          <span v-if="scope.row.pay_status === '10D'">退款</span>
          <span v-if="scope.row.pay_status === '10E'">已关闭</span>
          <span v-if="scope.row.pay_status === '10F'">已撤销</span>
          <span v-if="scope.row.pay_status === '10G'">交易结束不可退款</span>
          <span v-if="scope.row.pay_status === '10H'">退款-初始化</span>
          <span v-if="scope.row.pay_status === '10I'">退款-失败</span>
          <span v-if="scope.row.pay_status === '10J'">退款-成功</span>
          <!-- {{ scope.row.pay_status|moneyFormat1 }} -->
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="300"
        label="商户识别号"
        prop="merchant_no"
      />
      <el-table-column
        align="center"
        width="200"
        label="交易完成时间"
        prop="complete_time"
      />
      <el-table-column
        align="center"
        width="120"
        label="交易渠道类型"
        prop="order_type"
      />
      <el-table-column
        align="center"
        width="200"
        label="商户外部识别号"
        prop="out_merchant_no"
      />
      <el-table-column
        align="center"
        width="120"
        label="主扫还是被扫"
        prop="pay_type"
      />
      <el-table-column
        align="center"
        width="300"
        label="渠道订单号"
        prop="transaction_Id"
      />
    </el-table>
    <!-- 分页 -->
    <div class="pagination-container block">
      <el-pagination
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        background
        layout="total, sizes, prev, pager, next"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
<script src="./payment.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/common.scss";
</style>
