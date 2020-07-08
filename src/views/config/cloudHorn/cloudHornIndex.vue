<template>
  <div class="app-container">
    <!-- 按钮 -->
    <div class="block">
      <el-row :gutter="10">
        <el-col :span="7">
          <el-input v-model="searchKey.device_name" placeholder="云喇叭名称" type="text" maxlength="30" show-word-limit />
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" icon="el-icon-search" :loading="loading" @click="fetchData">查询
          </el-button>
        </el-col>
        <el-col :span="2.5">
          <el-button class="filter-item" type="primary" icon="el-icon-circle-plus-outline" @click="add">注册云喇叭</el-button>
        </el-col>

      </el-row>
    </div>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" fit highlight-current-row>
      <el-table-column align="center" label="云喇叭名称" prop="device_name" width="120" />

      <el-table-column align="center" label="云喇叭状态">
        <template slot-scope="scope">
          {{ scope.row.device_statue|statusFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="商户名称" prop="merchant_name" />
      <el-table-column align="center" label="平台名称" prop="plat_name" />

      <el-table-column align="center" label="经度" prop="longitude" />
      <el-table-column align="center" label="纬度" prop="latitude" />

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" :loading="removeLoading" @click="remove(scope.row)">删除
          </el-button>
          <el-button v-if="scope.row.device_statue===0" type="text" size="mini" :loading="disabledLoading" @click="disabled(scope.row)">禁用
          </el-button>
          <el-button v-if="scope.row.device_statue===1" type="info" :loading="undisabledLoading" size="mini" @click="undisabled(scope.row)">解禁
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
    <!-- 弹窗 -->
    <el-dialog title="注册云喇叭" :visible.sync="dialogVisible" width="40%">
      <el-form ref="codeForm" :model="codeData" :rules="rules">
        <el-form-item label="云喇叭名称" prop="device_name" label-width="100px">
          <el-input v-model="codeData.device_name" type="text" maxlength="14" show-word-limit />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" :loading="submitLoading" @click="submit">{{ $t('button.sure') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./cloudHorn.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
