<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10" type="flex">
        <el-col :span="6">
          <el-input v-model="search.merchantName" clearable class="filter-item input-tx" placeholder="输入商户名称" />
        </el-col>
        <el-col :span="3">
          <el-select v-model="search.status" placeholder="请选择商户状态">
            <el-option
              v-for="item in merchantStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
      border
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        label="商户编号"
        prop="merchant_no"
      />
      <el-table-column
        align="center"
        label="商户名称"
        prop="merchant_name"
      />
      <el-table-column
        align="center"
        label="商户三方编号"
        prop="merchant_out_no"
      />
      <el-table-column align="center" label="商户限额">
        <template slot-scope="scope">
          ￥{{ $common.jeFormat(scope.row.trading_limit, 2) }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        prop="create_time"
      />
      <el-table-column
        v-if="!$route.meta.readOnly"
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="info(scope.row.id)"
          >查看详情
          </el-button>
          <el-button v-if="scope.row.split_status===2" type="text" :loading="splitLoading" size="mini" @click="openSplitAuth(scope.row)">开通分账权限
          </el-button>
          <el-button type="text" :loading="alterLoading" size="mini" @click="alter(scope.row)">商户修改限额
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="subTradeTerminal(scope.row.id)"
          >交易终端管理
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="tradeDeviceList(scope.row.id)"
          >门店管理
          </el-button>
          <el-popconfirm
            v-if="scope.row.merchant_status==1"
            title="确定冻结商户么？"
            @onConfirm="freezeMerchant(scope.row.id)"
          >
            <el-button
              slot="reference"
              type="text"
              class="red-text-button"
              size="mini"
            >冻结
            </el-button>
          </el-popconfirm>
          <el-popconfirm
            v-if="scope.row.merchant_status==2"
            title="确定解冻商户么？"
            @onConfirm="normalMerchant(scope.row.id)"
          >
            <el-button
              slot="reference"
              type="text"
              class="red-text-button"
              size="mini"
            >解冻
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
    <!-- 弹窗 -->
    <el-dialog title="商户修改限额" :visible.sync="dialogVisible" width="40%">
      <el-form ref="codeForm" :model="codeData" :rules="rules" label-width="60px">
        <el-form-item label="限额" prop="amount">
          <el-input v-model="codeData.amount" type="number" max="999999999.99" min="0.00" step="3" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" :loading="submitLoading" @click="submit">{{ $t('button.sure') }}</el-button>
      </span>
    </el-dialog>
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
