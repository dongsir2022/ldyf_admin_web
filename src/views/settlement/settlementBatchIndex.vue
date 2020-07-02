<template>
  <div class="app-container">
    <!-- 查询 -->
    <div class="block">
      <el-row :gutter="10">
        <!-- <el-col :span="3">
          <el-select v-model="searchChannel" placeholder="结算渠道">
            <el-option v-for="item in channelArr" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-col> -->
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
    <el-table
      v-loading="loading"
      :data="list"
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        label="批次号"
        prop="s_batch_no"
      />
      <el-table-column
        align="center"
        label="创建时间"
        prop="create_time"
      />
      <el-table-column
        align="center"
        label="结算金额"
        prop="s_amount"
      />
      <el-table-column
        align="center"
        label="结算渠道"
        prop="s_channel"
      />
      <el-table-column
        align="center"
        label="结果"
        prop="s_result"
      />
      <el-table-column
        align="center"
        label="批次状态"
      >
        <template slot-scope="scope">
          {{ scope.row.s_status|settlementStatusDict }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="!$route.meta.readOnly"
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-popconfirm
            v-if="scope.row.s_status===0"
            title="确定取消结算么？"
            @onConfirm="test"
          >
            <el-button
              slot="reference"
              type="text"
              size="mini"
            >取消结算
            </el-button>
          </el-popconfirm>
          <el-popconfirm
            v-if="scope.row.s_status===0"
            title="确定付款么？"
            @onConfirm="test"
          >
            <el-button
              slot="reference"
              type="text"
              size="mini"
            >付款
            </el-button>
          </el-popconfirm>
          <el-button
            type="text"
            size="mini"
            @click="test"
          >详情
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

<script src="./settlementBatch.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
