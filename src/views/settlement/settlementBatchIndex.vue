<template>
  <div class="app-container">
    <!-- 查询 -->
    <div class="block">
      <el-row :gutter="10">
        <el-col :span="7">
          <el-date-picker v-model="searchKey.completeTime" type="datetimerange" range-separator="至" start-placeholder="创建开始日期" end-placeholder="创建结束日期" />
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" icon="el-icon-search" :loading="loading" @click="fetchData">查询
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-table v-loading="loading" :data="list" fit highlight-current-row>
      <el-table-column align="center" label="结算单号">
        <template slot-scope="scope">
          {{ scope.row.settle_no }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="结算状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.settle_status===1">待结算</el-tag>
          <el-tag v-if="scope.row.settle_status===2" type="success">结算成功</el-tag>
          <el-tag v-if="scope.row.settle_status===3" type="danger">结算失败</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="结算日期" prop="settle_date" />

      <el-table-column align="center" label="结算金额">
        <template slot-scope="scope">
          ￥ {{ $common.jeFormat(scope.row.settle_total_fee,2) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="结算笔数" prop="payable_total" />
      <el-table-column align="center" label="创建时间" prop="create_time" />
      <el-table-column align="center" label="更新时间" prop="last_update_time" />

      <el-table-column align="center" label="更新时间" prop="last_update_time" />

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="viewPay(scope.row)">查看应付明细
          </el-button>
          <el-button type="text" size="mini" @click="viewReceive(scope.row)">查看应收明细
          </el-button>
          <el-button type="text" size="mini" @click="viewRecord(scope.row)">查看收款记录
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

<script src="./settlementBatch.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
