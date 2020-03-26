<template>
  <div class="app-container">
    <div>
      <el-row :gutter="30" class="block">
        <el-col :span="8">
          <el-input v-model="search.name" placeholder="员工姓名"/>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.phone" placeholder="联系电话"/>
        </el-col>
        <el-col :span="8">
          <el-select v-model="search.status" placeholder="员工状态">
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
          <el-button type="primary" :loading="listLoading" icon="el-icon-search" @click="fetchData" plain>搜索</el-button>
          <el-button :loading="listLoading" icon="el-icon-refresh" @click="refreshData" plain>重置</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end" class="block">
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-circle-plus" @click="$parent.openPage('addLittleBee')" plain>添加员工
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
        label="姓名"
        prop="user_name"/>
      <el-table-column
        align="center"
        label="联系电话"
        prop="mobile_phone"/>
      <el-table-column
        align="center"
        label="身份证号码"
        prop="id_card"/>
      <el-table-column
        align="center"
        label="性别"
        prop="gender"/>
      <el-table-column
        align="center"
        label="所属区域">
        <template slot-scope="scope">
          {{scope.row.location_desc | convertLocationDesc}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="update(scope.row.id)">修改</el-button>
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
import {isNotBlank} from "@/utils/utils";
import {getLittleBeeList, invalidLittleBee, restoreLittleBee} from "@/api/littleBee";

export default {
  name: "orderList",
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      search: {
        status: 0
      }
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
        user_name: isNotBlank(this.search.name) ? this.search.name : '',
        mobile_phone: isNotBlank(this.search.phone) ? this.search.phone : '',
        status: isNotBlank(this.search.status) ? this.search.status : 0
      }
      this.listLoading = true
      getLittleBeeList(params).then(response => {
        this.list = response.data
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
    update(id) {
      this.$parent.openPage('updateLittleBee', {
        id: id
      });
    },
    invalid(id) {
      invalidLittleBee(id).then(res => {
        this.$message({
          message: this.$t('alert.success'),
          type: 'success',
          duration: 1000
        });
        this.fetchData();
      })
    },
    restore(id) {
      restoreLittleBee(id).then(res => {
        this.$message({
          message: this.$t('alert.success'),
          type: 'success',
          duration: 1000
        });
        this.fetchData();
      })
    }
  },
  filters: {
    convertLocationDesc(value) {
      if (isNotBlank(value)) {
        return value.replace(/\|/g, " ");
      }
      return '';
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
