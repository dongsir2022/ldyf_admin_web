<template>
  <div class="app-container">
    <!-- 按钮 -->
    <div class="block">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-select v-model="bind_status" clearable placeholder="请选择绑定状态">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" icon="el-icon-search" :loading="loading" @click="search">查询
          </el-button>
        </el-col>
        <el-col :span="2.5">
          <el-button class="filter-item" type="primary" icon="el-icon-circle-plus-outline" @click="add">创建二维码</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" fit highlight-current-row>
      <el-table-column align="center" label="二维码编号" prop="code_no" width="270" />

      <el-table-column align="center" label="二维码图片">
        <template slot-scope="scope">
          <el-image style="width: 50px; height: 50px" :src="scope.row.code_url" fit="cover" :preview-src-list="[scope.row.code_url]" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否绑定店铺">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.trade_device_id===0" type="info">未绑定</el-tag>
          <el-tag v-else>已绑定</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="经度" prop="longitude" />
      <el-table-column align="center" label="纬度" prop="latitude" />

      <el-table-column align="center" label="云喇叭名称" prop="trade_device_name" />

      <el-table-column align="center" label="创建时间" prop="create_time" />
      <el-table-column align="center" label="最后修改时间" prop="last_update_time" />

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.trade_device_name" type="text" size="mini" @click="bind(scope.row)">绑定云喇叭
          </el-button>
          <el-button v-if="!!scope.row.trade_device_name" type="info" :loading="unbindLoading" size="mini" @click="unbind(scope.row)">解绑云喇叭
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
    <el-dialog title="绑定云喇叭" :visible.sync="dialogVisible" width="40%">
      <el-form ref="codeForm" :model="codeData" :rules="rules" label-width="60px" @submit.native.prevent>
        <el-form-item label="云喇叭名称" prop="name" label-width="120px">
          <el-input v-model="codeData.name" type="text" maxlength="16" show-word-limit />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" :loading="submitLoading" @click="submit">{{ $t('button.sure') }}</el-button>
      </span>
    </el-dialog>
    <!-- 弹窗 -->
    <el-dialog title="创建二维码" :visible.sync="createVisible" width="30%">
      <el-form ref="createForm" :model="createData" :rules="createRules" label-width="60px" @submit.native.prevent>
        <el-form-item label="请输入创建数量" prop="name" label-width="120px">
          <el-input-number v-model="createData.count" style="width: 100%" :min="1" :max="9999" :controls="false"></el-input-number>
        </el-form-item>
        <el-form-item label="创建类型" prop="name" label-width="120px">
          <el-select v-model="createData.type" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in createTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" :loading="submitLoading" @click="addSubmit">{{ $t('button.sure') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./qrCode.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
