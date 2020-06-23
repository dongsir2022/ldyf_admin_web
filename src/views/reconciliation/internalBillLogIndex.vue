<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-button class="filter-item" type="primary" icon="el-icon-refresh" @click='fetchData'>
            刷新
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      fit
      highlight-current-row>
      <el-table-column
        align="center"
        label="处理步骤"
        prop="exec_name"
      />
      <el-table-column
        align="center"
        label="处理状态"
        prop="exec_status"
      />
      <el-table-column
        align="center"
        label="处理备注"
        prop="exec_remark"
      />
      <el-table-column
        align="center"
        label="创建时间"
        prop="create_time"
      />
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
        @size-change="handleSizeChange"/>
    </div>
  </div>
</template>

<script src="./internalBillLog.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
