<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10" type="flex">
        <el-col :span="3">
          <el-select v-model="search.status" placeholder="请选择审批状态">
            <el-option
              v-for="item in approveStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
        label="商户三方编号"
        width="200"
        prop="merchant_out_no"
      />
      <el-table-column
        align="center"
        label="商户名称"
        width="200"
        prop="merchant_name"
      />
      <el-table-column
        align="center"
        label="商户内部编号"
        width="300"
        prop="merchant_no"
      />
      <el-table-column
        align="center"
        label="审批状态"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.approve_status|approveStatusDict }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        prop="create_time"
      />
      <el-table-column
        align="center"
        label="最后更新时间"
        prop="last_update_time"
      />
      <el-table-column
        align="center"
        label="最后更新人"
        prop="last_update_user"
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
            @click="approve(scope.row.id)"
          >审批
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
<script src="./merchantApproveList.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
