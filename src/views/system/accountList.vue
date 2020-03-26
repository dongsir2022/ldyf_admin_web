<template>
  <div class="app-container">
    <div>
      <el-row :gutter="30" class="block">
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
          <el-button type="primary" icon="el-icon-circle-plus" @click="openAddAccount" plain>添加用户
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
        label="用户名称"
        prop="username"/>
      <el-table-column
        align="center"
        label="登录账号"
        prop="account"/>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openUpdateAccount(scope.row)">修改</el-button>
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

    <el-dialog title="新增管理员" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form :model="account">
        <el-form-item>
          <el-input v-model="account.username" autocomplete="off" placeholder="请输入用户昵称" maxlength="10"
                    show-word-limit></el-input>
        </el-form-item>
        <el-form-item v-if="isAdd">
          <el-input v-model="account.account" autocomplete="off" placeholder="请输入登录账号" maxlength="20"
                    show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="account.password" autocomplete="off" placeholder="请输入用户密码" maxlength="20"
                    show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitInfo" :loading="submitLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {isNotBlank} from "@/utils/utils";
import {invalidLittleBee, restoreLittleBee} from "@/api/littleBee";
import {addAccount, getAccountList, updateAccount} from "@/api/system";

export default {
  name: "accountList",
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      search: {
        status: 0
      },
      account: {
        username: '',
        account: '',
        password: ''
      },
      dialogFormVisible: false,
      isAdd: true,
      submitLoading: false
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
      getAccountList(params).then(response => {
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
    },
    openAddAccount() {
      this.dialogFormVisible = true;
      this.account = {};
      this.isAdd = true;
      this.submitLoading = false;
    },
    openUpdateAccount(row) {
      this.dialogFormVisible = true;
      this.submitLoading = false;
      this.isAdd = false;
      this.account['id'] = row.id;
      this.account['username'] = row.username;
    },
    submitInfo() {
      this.submitLoading = true;
      if (this.isAdd) {
        addAccount(this.account).then(res => {
          this.submitLoading = false;
          this.$message({
            message: this.$t('alert.success'),
            type: 'success',
            duration: 1000
          });
          this.dialogFormVisible = false;
          this.fetchData();
        })
      } else {
        updateAccount(this.account).then(res => {
          this.submitLoading = false;
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
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
