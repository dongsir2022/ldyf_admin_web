<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input v-model='searchKey' clearable class="filter-item input-tx" placeholder="输入商户名称"/>
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click='fetchData' :loading="loading">查询
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column
        align="center"
        label="商户编号"
        prop="merchant_no"/>
      <el-table-column
        align="center"
        label="商户名称"
        prop="merchant_name"/>
      <el-table-column
        align="center"
        label="可用余额"
        prop="merchant_amount_available"/>
      <el-table-column
        align="center"
        label="可提现余额"
        prop="merchant_amount_withdraw"/>
      <el-table-column
        align="center"
        v-if="!$route.meta.readOnly"
        label="操作">
        <template slot-scope="scope">
          <el-popconfirm
            title="确定冻结商户么？" @onConfirm="freezeMerchant(scope.row)">
            <el-button
              slot="reference"
              type="text"
              size="mini">冻结
            </el-button>
          </el-popconfirm>
          <el-button
            type="text"
            @click=""
            size="mini">详情
          </el-button>
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

<script src="./merchantAccount.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
<style lang="scss" scoped>
  .sup-merchant-item {
    margin-right: 20px;
  }
</style>
