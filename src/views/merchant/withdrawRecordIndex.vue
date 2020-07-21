<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="30">
        <el-col :span="4">
          <el-select v-model="searchKey.merchant_id" filterable remote placeholder="请输入商户名" :remote-method="remoteMethod" :loading="selectloading">
            <el-option v-for="item in options" :key="item.id" :label="item.merchant_name" :value="item.id" />
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" icon="el-icon-search" :loading="loading" @click="search">查询
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-table v-loading="loading" :data="list" fit highlight-current-row>
      <el-table-column align="center" label="提现人">
        <template slot-scope="scope">
          {{ scope.row.withdraw_bank_person }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="提现金额">
        <template slot-scope="scope">
          ￥{{ $common.jeFormat(scope.row.withdraw_amount, 2) }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="提现状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.withdraw_status===1">提现中</el-tag>
          <el-tag v-if="scope.row.withdraw_status===2">提现取消</el-tag>
          <el-tag v-if="scope.row.withdraw_status===3" type="success">提现成功</el-tag>
          <el-tag v-if="scope.row.withdraw_status===4" type="info">提现失败</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="提现银行" prop="withdraw_bank_type" />
      <el-table-column align="center" label="银行卡号" prop="withdraw_bank_no" />
      <el-table-column align="center" label="银行预留手机号" prop="withdraw_bank_phone" />

      <el-table-column align="center" label="提现手续费">
        <template slot-scope="scope">
          ￥{{ $common.jeFormat(scope.row.withdraw_fee, 2) }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" prop="create_time" />
      <el-table-column align="center" label="更新时间" prop="last_update_time" />

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
