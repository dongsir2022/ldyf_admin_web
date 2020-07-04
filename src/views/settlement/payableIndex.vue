<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-select v-model="searchKey.settleStatus" placeholder="结算状态">
            <el-option v-for="item in channelArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="searchKey.merchant_id" filterable remote placeholder="请输入商户名" :remote-method="remoteMethod" :loading="selectloading">
            <el-option v-for="item in options" :key="item.id" :label="item.merchant_name" :value="item.id" />
          </el-select>
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
    <el-table v-loading="loading" :data="list" fit highlight-current-row>
      <el-table-column align="center" label="应付金额">
        <template slot-scope="scope">
          ￥{{ $common.jeFormat(scope.row.payable_fee, 2) }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="清分状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.clear_status===1">待清分</el-tag>
          <el-tag v-if="scope.row.clear_status===2" type="success">清分成功</el-tag>
          <el-tag v-if="scope.row.clear_status===3" type="info">清分失败</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="结算状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.settle_status ===1" type="warning">结算冻结</el-tag>
          <el-tag v-if="scope.row.settle_status ===2" type="info">待结算</el-tag>
          <el-tag v-if="scope.row.settle_status ===3" type="info">结算中</el-tag>
          <el-tag v-if="scope.row.settle_status ===4" type="success">结算成功</el-tag>
          <el-tag v-if="scope.row.settle_status ===5" type="warning">结算失败</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="结算日期">
        <template slot-scope="scope">
          {{ $common.getDateTime('YYYY-MM-DD hh:mm:ss', new Date(scope.row.settle_date)) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" prop="remark" />
      <el-table-column align="center" label="创建时间" prop="create_time" />
      <el-table-column align="center" label="更新时间" prop="last_update_time" />

      <el-table-column v-if="!$route.meta.readOnly" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="getOrder(scope.row)">相关订单
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

<script src="./payable.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
