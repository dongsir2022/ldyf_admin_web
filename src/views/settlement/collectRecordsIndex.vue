<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-select v-model="searchKey.merchant_id" filterable remote placeholder="请输入商户名" :remote-method="remoteMethod" :loading="selectloading">
            <el-option v-for="item in options" :key="item.id" :label="item.merchant_name" :value="item.id" />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="searchKey.completeTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="创建开始日期"
            end-placeholder="创建结束日期"
          />
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" icon="el-icon-search" :loading="loading" @click="search">查询
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-table v-loading="loading" :data="list" fit highlight-current-row>
      <el-table-column align="center" label="商户名称">
        <template slot-scope="scope">
          {{ scope.row.merchant_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="商户编号">
        <template slot-scope="scope">
          {{ scope.row.merchant_no }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="收款金额">
        <template slot-scope="scope">
          ￥{{ $common.jeFormat(scope.row.receivable_fee, 2) }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="收款记录状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.collect_status===1">初始化</el-tag>
          <el-tag v-if="scope.row.collect_status===2" type="success">成功</el-tag>
          <el-tag v-if="scope.row.collect_status===3" type="info">失败</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" prop="create_time" />
      <el-table-column align="center" label="更新时间" prop="last_update_time" />

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="viewReceive(scope.row)">查看应收明细
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

<script src="./collectRecords.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
