<template>
  <div class="app-container">
    <div class="block">
      <el-row>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-circle-plus" @click.native="$parent.openPage('config-split-temp')">添加分润模版</el-button>
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
        label="创建时间"
        prop="create_time"
      />
      <el-table-column
        align="center"
        label="名称"
        prop="split_name"
      />
      <el-table-column
        align="center"
        label="模版ID"
        prop="split_no"
      />
      <el-table-column
        align="center"
        label="分润方式"
        prop="split_type"
      />
      <el-table-column
        align="center"
        label="状态"
      >
        <template slot-scope="scope">
          {{ scope.row.split_status }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="!$route.meta.readOnly"
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="test"
          >详情
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="test"
          >编辑
          </el-button>
          <el-popconfirm
            title="确定删除么？"
            @onConfirm="freezeMerchant(scope.row)"
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

<script src="./split.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common";
</style>
