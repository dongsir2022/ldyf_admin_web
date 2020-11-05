<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10" type="flex" justify="space-between">
        <el-col :span="16">
          <el-badge
            v-for="supTerminal in supTerminalArr"
            :key="supTerminal.id"
            :value="supTerminal.terminal_level"
            class="sup-merchant-item"
            type="primary"
          >
            <el-button size="small" @click="gotoTerminalFetchData(supTerminal)">{{ supTerminal.terminal_name }}
            </el-button>
          </el-badge>
        </el-col>
        <el-col :span="6">
          <el-input v-model="search.tradeTerminalName" clearable class="filter-item input-tx" placeholder="输入商户名称" />
        </el-col>
        <el-col :span="3">
          <el-select v-model="search.status" placeholder="请选择交易终端状态">
            <el-option
              v-for="item in tradeTerminalStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" icon="el-icon-search" :loading="loading" @click="search1">查询
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
        label="交易终端编号"
        width="300"
        prop="terminal_no"
      />
      <el-table-column
        align="center"
        label="交易终端名称"
        width="300"
        prop="terminal_name"
      />
      <el-table-column
        align="center"
        width="150"
        label="交易终端等级"
      >
        <template slot-scope="scope">
          <el-tag>{{ scope.row.terminal_level|merchantLevelDict }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="交易终端三方编号"
        width="300"
        prop="terminal_out_no"
      />
      <el-table-column
        align="center"
        width="200"
        label="创建时间"
        prop="create_time"
      />
      <el-table-column
        v-if="!$route.meta.readOnly"
        fixed="right"
        align="center"
        width="300"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="test"
          >编辑
          </el-button>
          <el-popconfirm
            title="确定冻结商户么？"
            @onConfirm="freezeMerchant(scope.row)"
          >
            <el-button
              slot="reference"
              type="text"
              size="mini"
            >冻结
            </el-button>
          </el-popconfirm>
          <el-button
            type="text"
            size="mini"
            @click="info(scope.row.id)"
          >查看详情
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="subTradeTerminalFetchData(scope.row)"
          >下级子商户
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

<script src="./tradeTerminalList.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
<style lang="scss" scoped>
  .sup-merchant-item {
    margin-right: 20px;
  }
</style>
