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
        width="200"
        label="完成时间"
        prop="complete_time"
      />
      <el-table-column
        align="center"
        width="300"
        label="商户名称"
        prop="merchant_name"
      />
      <el-table-column
        align="center"
        width="300"
        label="商户识别号"
        prop="merchant_no"
      />
      <el-table-column
        align="center"
        width="200"
        label="费率/封顶"
        prop="rate"
      />
      <el-table-column
        align="center"
        width="200"
        label="交易金额"
      >
        <template slot-scope="scope">
          {{ scope.row.pay_amount|moneyFormat }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        label="收款银行卡号"
        prop="card_no"
      />
      <el-table-column
        align="center"
        width="200"
        label="创建时间"
        prop="create_time"
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
