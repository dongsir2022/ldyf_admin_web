<template>
  <div class="app-container">
    <!-- 按钮 -->
    <div class="block">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-select v-model="searchKey.order_status" clearable placeholder="请选择工单状态">
            <el-option v-for="item in options" :key="item.id" :label="item.anme" :value="item.id" />
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-input v-model="searchKey.order_no" placeholder="工单编号" type="text" maxlength="30" show-word-limit />
        </el-col>
        <el-col :span="3">
          <el-input v-model="searchKey.merchant_id" placeholder="客户编号" type="text" maxlength="30" show-word-limit />
        </el-col>
        <el-col :span="3">
          <el-input v-model="searchKey.trade_device_phone" placeholder="门店手机号" type="text" maxlength="20" show-word-limit />
        </el-col>
        <el-col :span="3">
          <el-input v-model="searchKey.service_type_id" placeholder="服务编号" type="text" maxlength="30" show-word-limit />
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" icon="el-icon-search" :loading="loading" @click="fetchData">查询
          </el-button>
        </el-col>
        <el-col :span="2.5">
          <el-button class="filter-item" type="primary" icon="el-icon-circle-plus-outline" @click="add">新增工单</el-button>
        </el-col>

      </el-row>
    </div>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" fit highlight-current-row>
      <el-table-column align="center" label="工单编号" prop="order_no" width="120" />

      <el-table-column align="center" label="工单内容" width="150">
        <template slot-scope="scope">
          <el-popover placement="top-start" width="200" trigger="hover" :content="scope.row.order_content">
            <div>{{ scope.row.order_content }}</div>
            <div slot="reference" type="text" style="overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.order_content }}</div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" label="工单状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order_status===1" type="info">未解答</el-tag>
          <el-tag v-if="scope.row.order_status===2">已解答</el-tag>
          <el-tag v-if="scope.row.order_status===6">已解决</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商户" prop="trade_device_name" />
      <el-table-column align="center" label="商户电话" prop="trade_device_phone" />

      <el-table-column align="center" label="商户地址" width="150">
        <template slot-scope="scope">
          <el-popover placement="top-start" width="200" trigger="hover" :content="scope.row.trade_device_address">
            <div>{{ scope.row.trade_device_address }}</div>
            <div slot="reference" type="text" style="overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.trade_device_address }}</div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" label="解答经理" prop="account_manager_name" />
      <el-table-column align="center" label="解答经理电话" prop="account_manager_phone" />
      <el-table-column align="center" label="经理解答内容" width="150">
        <template slot-scope="scope">
          <el-popover placement="top-start" width="200" trigger="hover" :content="scope.row.account_answer">
            <div>{{ scope.row.account_answer }}</div>
            <div slot="reference" type="text" style="overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.account_answer }}</div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" prop="remark" />

      <el-table-column align="center" label="创建时间" prop="create_time" />
      <el-table-column align="center" label="最后修改时间" prop="last_update_time" />

      <!-- <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.trade_device_name" type="text" size="mini" @click="bind(scope.row)">绑定云喇叭
          </el-button>
          <el-button v-if="!!scope.row.trade_device_name" type="info" :loading="unbindLoading" size="mini" @click="unbind(scope.row)">解绑云喇叭
          </el-button>
        </template>
      </el-table-column> -->
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
    <el-dialog title="新增工单" :visible.sync="dialogVisible" width="40%">
      <el-form ref="codeForm" :model="codeData" :rules="rules" label-width="60px">

        <el-form-item label="门店编号" prop="trade_device_id" label-width="120px">
          <el-input v-model="codeData.trade_device_id" type="text" maxlength="30" show-word-limit />
        </el-form-item>
        <el-form-item label="客户经理编号" prop="account_manager_id" label-width="120px">
          <el-input v-model="codeData.account_manager_id" type="text" maxlength="30" show-word-limit />
        </el-form-item>
        <el-form-item label="服务编号" prop="service_type_id" label-width="120px">
          <el-input v-model="codeData.service_type_id" type="text" maxlength="30" show-word-limit />
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="120px">
          <el-input v-model="codeData.remark" type="text" maxlength="60" show-word-limit />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" :loading="submitLoading" @click="submit">{{ $t('button.sure') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./info.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
