<template>
  <div class="app-container">
    <div class="block">
      <el-form :inline="true">
        <el-form-item>
          <el-select v-model="searchKey.settleStatus" placeholder="结算状态">
            <el-option v-for="item in channelArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>        </el-form-item>
        <el-form-item>
          <el-select v-model="searchKey.merchant_id" filterable remote placeholder="请输入商户名" :remote-method="remoteMethod" :loading="selectloading">
            <el-option v-for="item in options" :key="item.id" :label="item.merchant_name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchKey.completeTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="创建开始日期"
            end-placeholder="创建结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button class="filter-item" type="primary" icon="el-icon-search" :loading="loading" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
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
          {{ scope.row.settle_date }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" prop="remark" />
      <el-table-column align="center" label="创建时间" prop="create_time" />
      <el-table-column align="center" label="更新时间" prop="last_update_time" />

      <el-table-column v-if="!$route.meta.readOnly" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" :loading="orderLoading" @click="getOrder(scope.row)">相关订单
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
    <!-- 订单详细 -->
    <el-dialog title="订单详细" :visible.sync="dialogVisible" width="30%">
      <el-form ref="orderForm" :model="formData" :rules="rules" label-width="60px">
        <el-form-item label="订单号" prop="name" label-width="120px">
          <div style="margin-left:30px;">{{ formData.trade_no }}</div>
        </el-form-item>
        <el-form-item label="清分状态" prop="name" label-width="120px">
          <div style="margin-left:30px;">{{ formData.trade_status|tradeFilter }}</div>
        </el-form-item>
        <el-form-item label="对账状态" prop="name" label-width="120px">
          <div style="margin-left:30px;">{{ formData.reconciliation_status|reconciliationFilter }}</div>
        </el-form-item>
        <el-form-item label="总金额" prop="name" label-width="120px">
          <div style="margin-left:30px;">￥ {{ $common.jeFormat(formData.total_fee,2) }}</div>
        </el-form-item>
        <el-form-item label="应收金额" prop="name" label-width="120px">
          <div style="margin-left:30px;">￥ {{ $common.jeFormat(formData.total_net_fee,2) }}</div>
        </el-form-item>
        <el-form-item label="手续费率" prop="name" label-width="120px">
          <div style="margin-left:30px;">{{ formData.pay_rate }}</div>
        </el-form-item>
        <el-form-item label="手续费" prop="name" label-width="120px">
          <div style="margin-left:30px;">￥ {{ $common.jeFormat(formData.pay_rate_fee,2) }}</div>
        </el-form-item>
        <el-form-item label="对账时间" prop="name" label-width="120px">
          <div style="margin-left:30px;">{{ $common.getDateTime('YYYY-MM-DD', new Date(formData.reconciliation_date)) }}</div>
        </el-form-item>
        <el-form-item label="创建时间" prop="name" label-width="120px">
          <div style="margin-left:30px;">{{ formData.create_time }}</div>
        </el-form-item>
        <el-form-item label="更新时间" prop="name" label-width="120px">
          <div style="margin-left:30px;">{{ formData.last_update_time }}</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">关闭</el-button>
        <!-- <el-button type="primary" :loading="submitLoading" @click="submit">{{ $t('button.sure') }}</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script src="./payable.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
