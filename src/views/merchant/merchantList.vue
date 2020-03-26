<template>
  <div class="app-container">
    <div>
      <el-row :gutter="30" class="block">
        <el-col :span="8">
          <el-input v-model="search.merchantName" placeholder="商户名称"/>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.merchantPhone" placeholder="商户联系电话"/>
        </el-col>
        <el-col :span="8">
          <el-select v-model="search.status" placeholder="商户状态">
            <el-option
              v-for="item in $parent.statusArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="block">
        <el-col :span="4">
          <el-button type="primary" :loading="listLoading" @click="fetchData" icon="el-icon-search" plain>搜索</el-button>
          <el-button :loading="listLoading" @click="refreshData" icon="el-icon-refresh" plain>重置</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="加载中..."
      border
      fit
      highlight-current-row>
      <el-table-column
        align="center"
        label="商户名称"
        prop="name"/>
      <el-table-column
        align="center"
        label="商户联系电话"
        prop="phone"/>
      <el-table-column
        align="center"
        label="地址"
        prop="address"/>
      <el-table-column
        align="center"
        label="所属区域"
        prop="location"/>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-popconfirm v-if="scope.row.recycle_mark===0" title="确定删除吗？" @onConfirm="invalid(scope.row.id)">
            <el-button type="text" size="small" slot="reference">作废</el-button>
          </el-popconfirm>
          <el-popconfirm v-if="scope.row.recycle_mark===1" title="确定恢复吗？" @onConfirm="restore(scope.row.id)">
            <el-button type="text" size="small" slot="reference">恢复</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination-container">
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

<script>
import {getMerchantList, invalidMerchant, restoreMerchant} from "@/api/merchant";
import {isNotBlank} from "@/utils/utils";

export default {
  name: "merchantList",
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      search: {status: 0}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      let params = {
        page_num: this.page,
        page_size: this.pageSize,
        merchant_name: isNotBlank(this.search.merchantName) ? this.search.merchantName : '',
        merchant_phone: isNotBlank(this.search.merchantPhone) ? this.search.merchantPhone : '',
        status: this.search.status
      };
      this.listLoading = true;
      getMerchantList(params).then(response => {
        this.list = response.data;
        this.listLoading = false
      })
    },
    refreshData() {
      this.search = {status: 0};
      this.fetchData();
    },
    handleCurrentChange(page) {
      this.page = page
      this.fetchData()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.fetchData()
    },
    invalid(id) {
      invalidMerchant(id).then(res => {
        this.$message({
          message: this.$t('alert.success'),
          type: 'success',
          duration: 1000
        });
        this.fetchData();
      })
    },
    restore(id) {
      restoreMerchant(id).then(res => {
        this.$message({
          message: this.$t('alert.success'),
          type: 'success',
          duration: 1000
        });
        this.fetchData();
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
