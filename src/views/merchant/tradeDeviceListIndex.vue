<template>
  <div class="app-container">
    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column
        align="center"
        label="店铺名称"
        prop="device_name"/>
      <el-table-column
        align="center"
        label="店铺联系电话"
        prop="device_phone"/>
      <el-table-column
        align="center"
        label="店铺地址"
        prop="device_address"/>
      <el-table-column
        align="center"
        label="创建时间"
        prop="create_time"/>
      <el-table-column
        align="center"
        label="状态">
        <template slot-scope="scope">
          {{scope.row.device_status|deviceStatusDict}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        v-if="!$route.meta.readOnly"
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="openDeviceOperatorList(scope.row.id)"
            size="mini">查看操作员
          </el-button>
          <el-button
            type="text"
            @click="openUnbindDeviceOperatorList(scope.row.id)"
            size="mini">绑定操作员
          </el-button>
          <el-button
            type="text"
            @click="openCreateDeviceOperator(scope.row.id)"
            size="mini">新增操作员
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
    <el-dialog title="店铺操作员" :visible.sync="deviceOperatorListVisible">
      <el-dialog
        width="30%"
        title="修改密码"
        :visible.sync="deviceOperatorPasswordVisible"
        append-to-body>
        <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules">
          <el-form-item label="密码" prop="password">
            <el-input v-model="passwordForm.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deviceOperatorPasswordVisible = false">取消</el-button>
          <el-button type="primary" :loading="deviceOperatorPasswordLoading" @click="deviceOperatorChangePassword">确定
          </el-button>
        </div>
      </el-dialog>
      <el-table :data="deviceOperatorData" v-loading="deviceOperatorListLoading">
        <el-table-column property="user_no" align="center" label="用户编号"></el-table-column>
        <el-table-column property="user_name" align="center" label="姓名"></el-table-column>
        <el-table-column property="create_time" align="center" label="创建时间"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            {{scope.row.account_lock|deviceOperatorStatusDict}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="openDeviceOperatorPassword(scope.row.id)"
              size="mini">修改密码
            </el-button>
            <el-popconfirm v-if="scope.row.account_lock==1"
                           title="确定冻结账户么？" @onConfirm="freezeDeviceOperator(scope.row.id)">
              <el-button
                slot="reference"
                type="text"
                class="red-text-button"
                size="mini">冻结
              </el-button>
            </el-popconfirm>
            <el-popconfirm v-if="scope.row.account_lock==0"
                           title="确定解冻账户么？" @onConfirm="normalDeviceOperator(scope.row.id)">
              <el-button
                slot="reference"
                type="text"
                class="red-text-button"
                size="mini">解冻
              </el-button>
            </el-popconfirm>
            <el-popconfirm title="确定解除绑定么？" @onConfirm="unbindDeviceOperator(scope.row.id)">
              <el-button
                slot="reference"
                type="text"
                class="red-text-button"
                size="mini">解除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container block">
        <el-pagination
          :current-page="deviceOperatorPage"
          :total="deviceOperatorTotal"
          background
          layout="total, prev, pager, next"
          :page-size="deviceOperatorPageSize"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deviceOperatorListVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="店铺操作员" :visible.sync="unbindDeviceOperatorListVisible">
      <el-table :data="unbindDeviceOperatorData" v-loading="unbindDeviceOperatorListLoading">
        <el-table-column property="user_no" align="center" label="用户编号"></el-table-column>
        <el-table-column property="user_name" align="center" label="姓名"></el-table-column>
        <el-table-column property="create_time" align="center" label="创建时间"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-popconfirm title="确定绑定么？" @onConfirm="bindingDeviceOperator(scope.row.id)">
              <el-button
                slot="reference"
                type="text"
                class="red-text-button"
                size="mini">绑定
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container block">
        <el-pagination
          :current-page="unbindDeviceOperatorPage"
          :total="unbindDeviceOperatorTotal"
          background
          layout="total, prev, pager, next"
          :page-size="unbindDeviceOperatorPageSize"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="unbindDeviceOperatorListVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="30%"
      title="新增操作员"
      :visible.sync="createDeviceOperatorVisible"
      append-to-body>
      <el-form ref="createDeviceOperatorForm" :model="createDeviceOperatorForm" :rules="createDeviceOperatorRules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="createDeviceOperatorForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="createDeviceOperatorForm.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createDeviceOperatorVisible = false">取消</el-button>
        <el-button type="primary" :loading="createDeviceOperatorLoading" @click="createDeviceOperator">确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./tradeDeviceList.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
