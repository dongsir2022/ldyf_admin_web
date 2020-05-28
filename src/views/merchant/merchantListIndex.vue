<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10" type="flex">
        <el-col :span="6">
          <el-input v-model='search.merchantName' clearable class="filter-item input-tx" placeholder="输入商户名称"/>
        </el-col>
        <el-col :span="3">
          <el-select v-model="search.status" placeholder="请选择商户状态">
            <el-option
              v-for="item in merchantStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        label="商户三方编号"
        prop="merchant_out_no"/>
      <el-table-column
        align="center"
        label="创建时间"
        prop="create_time"/>
      <el-table-column
        align="center"
        v-if="!$route.meta.readOnly"
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="info(scope.row.id)"
            size="mini">查看详情
          </el-button>
          <el-button
            type="text"
            @click="subTradeTerminal(scope.row.id)"
            size="mini">查看交易终端
          </el-button>
          <el-popconfirm v-if="scope.row.merchant_status==1"
                         title="确定冻结商户么？" @onConfirm="freezeMerchant(scope.row.id)">
            <el-button
              slot="reference"
              type="text"
              class="red-text-button"
              size="mini">冻结
            </el-button>
          </el-popconfirm>
          <el-popconfirm v-if="scope.row.merchant_status==2"
                         title="确定解冻商户么？" @onConfirm="normalMerchant(scope.row.id)">
            <el-button
              slot="reference"
              type="text"
              class="red-text-button"
              size="mini">解冻
            </el-button>
          </el-popconfirm>
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

<script src="./merchantList.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
<style lang="scss" scoped>
  .sup-merchant-item {
    margin-right: 20px;
  }
</style>
