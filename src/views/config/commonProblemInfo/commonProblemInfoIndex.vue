<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-button class="filter-item" type="primary" icon="el-icon-circle-plus-outline" @click='add'>
            新增
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
        label="编号"
        prop="id"
        width="100"
      />
      <el-table-column
        align="center"
        label="标题"
        width="300"
        prop="problem_title"
      />
      <el-table-column
        align="center"
        label="内容">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="内容"
            width="200"
            trigger="hover"
            :content="scope.row.problem_content">
            <el-button type="text" slot="reference">查看内容</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        prop="create_time"
      />
      <el-table-column
        align="center"
        label="最后修改时间"
        prop="last_update_time"
      />
      <el-table-column
        align="center"
        v-if="!$route.meta.readOnly"
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="update(scope.row.id)">编辑
          </el-button>
          <el-popconfirm
            confirmButtonText='好的'
            cancelButtonText='不用了'
            title="确定删除么？"
            @onConfirm="remove(scope.row.id)">
            <el-button
              slot="reference"
              type="text"
              class="red-text"
              size="mini">删除
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
        @size-change="handleSizeChange"/>
    </div>
    <el-dialog
      title="添加App版本"
      :visible.sync="editVisible"
      width="35%">
      <el-form ref="appVersionForm" :model="editData" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="app_no">
          <el-input v-model="editData.title" maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item label="内容" prop="app_name">
          <el-input v-model="editData.app_name" maxlength="10" show-word-limit/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="close">{{ $t('button.cancel') }}</el-button>
          <el-button type="primary" @click="submit"
                     :loading="submitLoading">{{ $t('button.sure') }}</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script src="./commonProblemInfo.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
