<template>
  <div class="app-container">
    <div class="block">
    </div>
    <el-tree
      v-loading="loading"
      :load="loadNode"
      lazy>
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>
              <span>{{ data.agency_name }}({{data.agency_no}})</span>
        </span>
        <span style="margin-right: 550px">
          <el-button
            v-if="node.level!==3"
            type="text"
            size="mini"
            @click.stop="() => append(node,data)">
                添加下属行
              </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog
      title="添加下属行"
      :visible.sync="addAgencyVisible"
      width="35%">
      <el-form ref="addAgencyForm" :model="addAgencyForm" :rules="rules" label-width="80px">
        <el-form-item label="机构名称" prop="agencyName">
          <el-input v-model="addAgencyForm.agencyName" maxlength="30" show-word-limit/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addAgencyVisible = false">{{ $t('button.cancel') }}</el-button>
          <el-button type="primary" @click="createAgencyInfo"
                     :loading="submitLoading">{{ $t('button.sure') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./agencyInfoList.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
