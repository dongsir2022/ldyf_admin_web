<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-input v-model="searchKey.merchant_id" clearable class="filter-item input-tx" placeholder="输入商户名称&编号" />
        </el-col>
        <el-col :span="7">
          <el-date-picker
            v-model="searchKey.completeTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="创建开始日期"
            end-placeholder="创建结束日期"
          />
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" icon="el-icon-search" :loading="loading" @click="fetchData">查询
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
        label="提现时间"
        prop="create_time"
      />
      <el-table-column
        align="center"
        label="商户ID"
        prop="merchant_no"
      />
      <el-table-column
        align="center"
        label="提现金额"
        prop="withdraw_amount"
      />
      <el-table-column
        align="center"
        label="提现手续费"
        prop="withdraw_fee"
      />
      <el-table-column
        align="center"
        label="实际到账金额"
        prop="withdraw_real_amount"
      />
      <el-table-column
        align="center"
        label="提现卡号"
        prop="withdraw_bank_no"
      />
      <el-table-column
        align="center"
        label="提现状态"
      >
        <template slot-scope="scope">
          {{ scope.row.withdraw_status|dict }}
        </template>
      </el-table-column>
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

<script src="./withdrawRecord.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
