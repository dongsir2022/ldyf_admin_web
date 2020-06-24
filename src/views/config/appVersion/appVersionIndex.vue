<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-input v-model="searchKey" clearable class="filter-item input-tx" placeholder="输入收款方" />
        </el-col>
        <el-col :span="7">
          <el-date-picker
            v-model="searchCreateTime"
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
    <div class="block">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-button class="filter-item" type="primary" icon="el-icon-circle-plus-outline" @click="addAppVersion">
            新增App版本
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
        label="App标识"
        prop="app_no"
      />
      <el-table-column
        align="center"
        label="App名称"
        prop="app_name"
      />
      <el-table-column
        align="center"
        label="App类型"
        prop="app_type"
      />
      <el-table-column
        align="center"
        label="App版本号"
        prop="app_version"
      />
      <el-table-column
        align="center"
        label="程序描述"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.app_md5 }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">查看</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
        prop="app_version_status"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.app_version_status===3?'danger':''">
            {{ scope.row.app_version_status|appVersionStatusDict }}
          </el-tag>
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
            @click="updateAppVersion(scope.row)"
          >编辑
          </el-button>
          <el-popconfirm
            v-if="scope.row.app_version_status!==3"
            confirm-button-text="好的"
            cancel-button-text="不用了"
            title="确定禁用么？"
            @onConfirm="disableAppVersion(scope.row)"
          >
            <el-button
              slot="reference"
              type="text"
              class="red-text"
              size="mini"
            >禁用
            </el-button>
          </el-popconfirm>
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            title="确定删除么？"
            @onConfirm="removeAppVersion(scope.row)"
          >
            <el-button
              slot="reference"
              type="text"
              class="red-text"
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
    <el-dialog
      title="添加App版本"
      :visible.sync="appVersionVisible"
      width="35%"
    >
      <el-form ref="appVersionForm" :model="appVersionData" :rules="rules" label-width="80px">
        <el-form-item label="标识" prop="app_no">
          <el-input v-model="appVersionData.app_no" maxlength="20" show-word-limit />
        </el-form-item>
        <el-form-item label="名称" prop="app_name">
          <el-input v-model="appVersionData.app_name" maxlength="10" show-word-limit />
        </el-form-item>
        <el-form-item label="版本号" prop="app_version">
          <el-input v-model="appVersionData.app_version" maxlength="20" show-word-limit />
        </el-form-item>
        <el-form-item label="程序描述" prop="app_md5">
          <el-input
            v-model="appVersionData.app_md5"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            maxlength="150"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="类型" prop="app_type">
          <el-radio-group v-model="appVersionData.app_type">
            <el-radio v-for="item in appTypeArr" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="app_version_status">
          <el-radio-group v-model="appVersionData.app_version_status">
            <el-radio v-for="item in appVersionStatusArr" :key="item.value" :label="item.value">{{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">{{ $t('button.cancel') }}</el-button>
        <el-button
          type="primary"
          :loading="submitLoading"
          @click="submitAppVersion"
        >{{ $t('button.sure') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./appVersion.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
