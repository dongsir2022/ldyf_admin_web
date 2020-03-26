<template>
  <div class="app-container">
    <div>
      <el-row :gutter="30" class="block">
        <el-col :span="8">
          <el-input v-model="search.order_no" placeholder="工单编号"/>
        </el-col>
        <el-col :span="8">
          <el-select
            v-model="search.merchant_id"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="querySearchMerchant"
            :loading="loading"
            :clearable="true">
            <el-option
              v-for="item in merchantArr"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.merchant_phone" placeholder="商户联系电话"/>
        </el-col>
      </el-row>
      <el-row :gutter="30" class="block">
        <el-col :span="8">
          <el-select v-model="search.order_status" placeholder="服务类型">
            <el-option
              v-for="item in serviceTypeArr"
              :key="item.id"
              :label="item.description"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="search.order_status" placeholder="订单状态">
            <el-option
              v-for="item in orderStatusArr"
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
      <el-row type="flex" justify="end" class="block">
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-circle-plus" @click="$parent.closePage('addOrder')" plain>创建工单
          </el-button>
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
        label="订单编号"
        prop="order_no"/>
      <el-table-column
        align="center"
        label="商户名称"
        prop="merchant_name"/>
      <el-table-column
        align="center"
        label="商户联系电话"
        prop="merchant_phone"/>
      <el-table-column
        align="center"
        label="维护类型"
        prop="service_type_desc"/>
      <el-table-column
        align="center"
        label="订单状态">
        <template slot-scope="scope">
          {{scope.row.order_status | parseDict(orderStatusDict) }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small">详情</el-button>
          <el-button type="text" size="small" style="color: red">作废</el-button>
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
import {getList} from "@/api/order";
import {getServiceTypeAllList} from "@/api/system";
import {isNotBlank} from "@/utils/utils";
import {searchMerchant} from "@/api/merchant";

export default {
  name: "orderList",
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      search: {},
      orderStatusArr: [
        {value: 1, label: '待接单'},
        {value: 2, label: '已接单'},
        {value: 3, label: '已签到'},
        {value: 4, label: '已录入维修前信息'},
        {value: 5, label: '已录入维修后信息'},
        {value: 6, label: '工单完成'},
      ],
      orderStatusDict: {
        1: '待接单',
        2: '已接单',
        3: '已签到',
        4: '已录入维修前信息',
        5: '已录入维修后信息',
        6: '工单完成',
      },
      serviceTypeArr: [],
      merchantArr: []
    }
  },
  created() {
    this.fetchServiceType();
    this.fetchData();
  },
  methods: {
    fetchServiceType() {
      getServiceTypeAllList().then(res => {
        this.serviceTypeArr = res.data;
      });
    },
    fetchData() {
      this.search['page_num'] = this.page;
      this.search['page_size'] = this.pageSize
      this.listLoading = true
      getList(this.search).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    refreshData() {
      this.search = {};
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
    querySearchMerchant(queryString) {
      if (isNotBlank(queryString)) {
        let params = {search: queryString}
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          searchMerchant(params).then(res => {
            this.merchantArr = res.data;
          })
        }, 200);
      }
    },
  },
  filters: {
    dict: function (dict, value) {
      return this.orderStatusDict[value];
    }
  }
}
</script>
<style type="text/css" scoped="scoped">
  .el-select {
    width: 100%;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
