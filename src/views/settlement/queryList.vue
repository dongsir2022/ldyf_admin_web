<template>
  <div class="app-container">
    <!-- 查询框 -->
    <div class="block">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-date-picker v-model="searchKey.completeTime" type="datetimerange" range-separator="至" start-placeholder="创建开始日期" end-placeholder="创建结束日期" />
        </el-col>
        <el-col :span="3">
          <el-select v-model="searchKey.reconciliationStatus" placeholder="对账状态">
            <el-option v-for="item in reconciliationArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="searchKey.trade_status" placeholder="清分状态">
            <el-option v-for="item in tradeArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-col>

        <el-col :span="2">
          <el-button class="filter-item" type="primary" icon="el-icon-search" :loading="loading" @click="search">查询
          </el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" fit highlight-current-row>
      <el-table-column align="center" label="订单号">
        <template slot-scope="scope">
          {{ scope.row.trade_no }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="网联交易订单号" prop="transaction_id" />

      <el-table-column align="center" label="对账状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.reconciliation_status===1">待对账</el-tag>
          <el-tag v-if="scope.row.reconciliation_status===2" type="success">对账完成</el-tag>
          <el-tag v-if="scope.row.reconciliation_status===3" type="danger">对账错误</el-tag>
          <el-tag v-if="scope.row.reconciliation_status===4" type="info">跳过对账</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="清分状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.trade_status ===1">初始化</el-tag>
          <el-tag v-if="scope.row.trade_status ===2">清分中</el-tag>
          <el-tag v-if="scope.row.trade_status ===3" type="success">清分成功</el-tag>
          <el-tag v-if="scope.row.trade_status ===4" type="danger">清分失败</el-tag>
          <el-tag v-if="scope.row.trade_status ===5" type="info">等待指令清分</el-tag>
          <el-tag v-if="scope.row.trade_status ===6" type="info">取消</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单总金额">
        <template slot-scope="scope">
          ￥ {{ $common.jeFormat(scope.row.total_fee,2) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="应收金额">
        <template slot-scope="scope">
          ￥ {{ $common.jeFormat(scope.row.total_net_fee,2) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="税率">
        <template slot-scope="scope">
          {{ scope.row.pay_rate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手续费">
        <template slot-scope="scope">
          ￥ {{ $common.jeFormat(scope.row.pay_rate_fee,2) }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="对账日期">
        <template slot-scope="scope">
          {{ $common.getDateTime('YYYY-MM-DD', new Date(scope.row.reconciliation_date)) }}
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

<script src="./query.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
