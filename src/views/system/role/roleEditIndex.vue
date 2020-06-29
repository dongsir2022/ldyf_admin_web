<template>
  <div class="app-container">
    <div v-if="isLoadData">
      <div class="block">
        {{ roleInfo.name }}
      </div>
      <el-form>
        <el-form-item>
          <table class="role-wp" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td class="label">菜单权限</td>
              <td>
                <el-tree
                  ref="tree"
                  :data="menuTree"
                  node-key="id"
                  :props="defaultProps"
                  highlight-current
                  default-expand-all
                  show-checkbox
                  :default-checked-keys="defaultMenuIds"
                  :check-strictly="true"
                  @check-change="handleCheckChange"
                  @check="handleCheck"
                >
                  <span slot-scope="{ node, data }" class="custom-tree-node">
                    <span>{{ data.title }}</span>
                    <span v-if="data.type===2" style="margin-left: 20px;">
                      <el-switch
                        v-model="data.read_only"
                        active-text="是否只能查看"
                        active-color="#13ce66"
                        :active-value="1"
                        :inactive-value="0"
                      />
                    </span>
                  </span>
                </el-tree>
              </td>
            </tr>
          </table>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button @click="$parent.closePage('system-role')">取消</el-button>
          <el-button :loading="loading" type="primary" @click="submitRole">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="loadingBox">
      <span class="el-icon-loading" />
    </div>
  </div>
</template>

<script src="./roleEdit.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
<style type="text/css" scoped="scoped">
  .per-wp:last-child .per-box {
    border: 0;
  }

  .role-wp {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
  }

  .role-wp .label {
    width: 100px;
  }

  .role-wp td {
    text-align: left;
    padding: 10px;
    border: 1px solid #ddd;
  }

  .btn-box {
    text-align: center;
  }
</style>
