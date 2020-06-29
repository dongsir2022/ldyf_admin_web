<template>
  <div class="app-container">
    <div class="block">
      <el-button
        v-if="!$route.meta.readOnly"
        class="filter-item"
        type="primary"
        icon="el-icon-circle-plus"
        @click="addRole"
      >添加用户组
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-refresh"
        :loading="loading"
        @click="fetchData()"
      >刷新
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        min-width="30"
        label="用户组"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="描述"
      >
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="权限"
      >
        <template slot-scope="scope">
          {{ scope.row.menus_long }}
        </template>
      </el-table-column>

      <el-table-column
        v-if="!$route.meta.readOnly"
        align="center"
        width="250"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="roleAddMenus(scope.row.id)"
          >访问授权
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="updateRole(scope.row)"
          >编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="deleteRole(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog width="40%" title="添加用户组" :visible.sync="dialogFormVisible" class="user-dialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="name" label="用户组">
          <el-input v-model="form.name" placeholder="请填写用户组名" auto-complete="off" class="input-tx" />
        </el-form-item>
        <el-form-item prop="description" label="描述">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="2"
            placeholder="请填写该用户组描述"
            auto-complete="off"
            class="input-tx"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" :loading="assignLoading" @click="submitForm">{{ $t('button.submit') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./role.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
