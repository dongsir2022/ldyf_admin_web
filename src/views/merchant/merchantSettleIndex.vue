<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input v-model="searchKey" clearable class="filter-item input-tx" placeholder="输入商户名称&编号" />
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" icon="el-icon-search" :loading="loading" @click="search">查询
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
        label="商户等级"
      >
        <template slot-scope="scope">
          <el-tag>{{ scope.row.merchant_level|merchantLevelDict }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="结算周期"
        prop="settle_cycle"
      />
      <el-table-column
        align="center"
        label="结算方式"
        prop="settle_type"
      />
      <el-table-column
        align="center"
        label="生效状态"
      >
        <template slot-scope="scope">
          {{ scope.row.settle_status|settleStatusDict }}
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
          >编辑
          </el-button>
          <el-popconfirm
            title="确定删除么？"
            @confirm="test"
          >
            <el-button
              slot="reference"
              type="text"
              size="mini"
            >删除
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

<script src="./merchantSettle.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
