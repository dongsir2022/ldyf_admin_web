<template>
  <div class="app-container">
    <div>
      <el-row :gutter="30" class="block">
        <el-col :span="8">
          <el-select v-model="search.status" placeholder="状态">
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
      <el-row type="flex" justify="end" class="block">
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-circle-plus" @click="openDialog" plain>添加类型
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
        label="编号"
        prop="id"/>
      <el-table-column
        align="center"
        label="描述"
        prop="description"/>
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

    <el-dialog title="新增维护类型" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.description" autocomplete="off" placeholder="请输入维护类型描述" maxlength="10"
                    show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addServiceType, getServiceTypeList, invalidServiceType, restoreServiceType} from "@/api/system";

export default {
  name: "serviceTypeList",
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      search: {status: 0},
      dialogFormVisible: false,
      form: {}
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
        status: this.search.status
      };
      this.listLoading = true;
      getServiceTypeList(params).then(response => {
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
      invalidServiceType(id).then(res => {
        this.$message({
          message: this.$t('alert.success'),
          type: 'success',
          duration: 1000
        });
        this.fetchData();
      })
    },
    restore(id) {
      restoreServiceType(id).then(res => {
        this.$message({
          message: this.$t('alert.success'),
          type: 'success',
          duration: 1000
        });
        this.fetchData();
      })
    },
    openDialog() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    submitInfo() {
      addServiceType(this.form).then(res => {
        this.$message({
          message: this.$t('alert.success'),
          type: 'success',
          duration: 1000
        });
        this.dialogFormVisible = false;
        this.fetchData();
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
