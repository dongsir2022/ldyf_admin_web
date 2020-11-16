<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10">
        <el-col :span="2">
          <el-button class="filter-item" icon="el-icon-refresh" type="primary" :loading="loading" @click="fetchData">刷新
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
        width="300"
        label="创建时间"
        prop="create_time"
      />
      <el-table-column
        align="center"
        width="300"
        label="文件名称"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.batch_processing_type === 1">二维码批量下载</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="下载地址">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-download" @click="doDownload(scope.row.batch_processing_url)">下载 </el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="300"
        label="创建者"
        prop="create_user"
      />
      <el-table-column
        align="center"
        width="300"
        label="最后跟新时间"
        prop="last_update_time"
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
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
<script src="./downloadCenter.js"/>

<style ref="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
