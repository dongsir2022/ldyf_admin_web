<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-select v-model="searchPayableStatus" placeholder="结算状态">
            <el-option
              v-for="item in channelArr"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-date-picker
            v-model="searchCreateTime"
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
        label="创建时间"
        prop="create_time"
      />
      <el-table-column
        align="center"
        label="商户订单号"
        prop="order_no"
      />
      <el-table-column
        align="center"
        label="应收方"
        prop="payable_side"
      />
      <el-table-column
        align="center"
        label="金额"
        prop="payable_amount"
      />
      <el-table-column
        align="center"
        label="结算状态"
      >
        <template slot-scope="scope">
          {{ scope.row.payable_status|settlementStatusDict }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="!$route.meta.readOnly"
        align="center"
        label="操作"
      >
        <template>
          <el-button
            type="text"
            size="mini"
            @click="test"
          >相关订单
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

<script src="./receivable.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
