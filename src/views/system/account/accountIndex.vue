<template>
  <div class="app-container">
    <div class="block">
      <el-button class="filter-item" type="primary" icon="el-icon-circle-plus" v-if="!$route.meta.readOnly"
                 @click="addAccount">添加用户
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-refresh" @click='getAccountList()'
                 :loading="loading">刷新
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        align="center"
        label="用户名">
        <template slot-scope="scope">
          {{scope.row.account}}
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="姓名">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="所属分组">
        <template slot-scope="scope">
          {{scope.row.role_name}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="所属机构名称"
        prop="agency_name"/>
      <el-table-column
        align="center"
        label="所属机构"
        prop="agency_no"/>
<!--      <el-table-column-->
<!--        align="center"-->
<!--        label="最后登录时间">-->
<!--        <template slot-scope="scope">-->
<!--          {{scope.row.last_login_time}}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        align="center"-->
<!--        label="共计登录次数">-->
<!--        <template slot-scope="scope">-->
<!--          {{scope.row.login_count}}-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column
        align="center"
        v-if="!$route.meta.readOnly"
        label="操作">
        <template slot-scope="scope">
          <template v-if='scope.row.is_admin!=1'>
            <el-button
              type="text"
              @click="resetPassword(scope.row,scope.$index)"
              size="mini">重置密码
            </el-button>
            <el-button
              type="text"
              @click="editRole(scope.row)"
              size="mini">设置权限组
            </el-button>
            <el-button
              type="text"
              @click="deleteAccount(scope.row)"
              size="mini">删除
            </el-button>
          </template>
          <template v-else>
            <el-button
              type="text"
              @click="resetPassword(scope.row,scope.$index)"
              size="mini">重置密码
            </el-button>
          </template>
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

    <el-dialog width="40%" :title="dialogTitle" :visible.sync="dialogFormVisible" class="user-dialog">
      <el-form ref="form" :model="form" :rules='rules' label-width="80px">
        <el-form-item prop="account" label="用户名">
          <el-input :disabled="isUpdate" v-model="form.account" maxlenth='20' placeholder='请填写20位以内的小写字母和数字的组合，不能以0开头'
                    auto-complete="off" class="input-tx"/>
        </el-form-item>

        <el-form-item prop="username" label="姓名">
          <el-input :disabled="isUpdate" v-model="form.username" placeholder='请填写姓名' auto-complete="off"
                    class="input-tx"/>
        </el-form-item>

        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" maxlenth='20' placeholder='6-20位，区分大小写' type="password" auto-complete="off"
                    class="input-tx"/>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input v-model="form.confirm_password" placeholder='确认密码' type="password" auto-complete="off"
                    class="input-tx"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" :loading="saveLoading" @click="saveAccount">{{ $t('button.submit') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog width="40%" title="设置权限组" :visible.sync="dialogRole" class="user-dialog">
      <el-radio-group v-model="roleId">
        <template v-for="item in roleList">
          <el-radio :label="item.id">{{item.name}}</el-radio>
        </template>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRole = false">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" :loading="roleLoading" @click="saveRole">{{ $t('button.submit') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script src="./account.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
