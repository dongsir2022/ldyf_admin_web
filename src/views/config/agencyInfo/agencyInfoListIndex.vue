<template>
  <div class="app-container">
    <!-- 空 -->
    <div class="block" />
    <!-- 主体树 -->
    <el-tree v-loading="loading" :data="treedata" default-expand-all node-key="id">
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ data.agency_name }}({{ data.agency_no }})</span>
        <span style="margin-left: 20px">
          <el-button v-if="node.level!==3" type="text" size="mini" @click.stop="() => append(node, data)">添加下属行</el-button>
        </span>
      </span>
    </el-tree>
    <!-- 弹窗 -->
    <el-dialog title="添加下属行" :visible.sync="addAgencyVisible" width="35%">
      <!-- 表单 -->
      <el-form ref="addAgencyForm" :model="addAgencyForm" :rules="rules" label-width="80px">
        <el-form-item label="机构名称" prop="agencyName">
          <el-input v-model="addAgencyForm.agencyName" maxlength="30" show-word-limit />
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAgencyVisible = false">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" :loading="submitLoading" @click="createAgencyInfo">{{ $t('button.sure') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createAgencyInfoApi, getTreeInfoApi } from '@/api/config/agencyInfoApi'
// import { isNotBlank } from '@/utils/utils'

export default {
  name: 'AgencyInfoListIndex',
  data() {
    return {
      treedata: [], // 树的数据
      loading: true, // 加载
      addAgencyVisible: false,
      addAgencyForm: {
        agencyName: '',
        pAgencyId: ''
      },
      rules: {
        agencyName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ]
      },
      submitLoading: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取数据
    getData() {
      getTreeInfoApi().then(res => {
        if (res.data && res.data.length) {
          this.treedata = res.data
        } else {
          this.treedata = []
          this.$message('没有数据')
        }
        this.loading = false
      })
    },
    // 打开弹窗
    append(node, data) {
      if (node.level >= 3) {
        this.$message({
          message: '只允许添加三级',
          type: 'warning'
        })
      } else {
        this.addAgencyVisible = true
        this.addAgencyForm.pAgencyId = data.id
      }
    },
    // 向后台发送表单,并重新拉取数据
    createAgencyInfo() {
      this.submitLoading = true
      const data = {
        agency_name: this.addAgencyForm.agencyName,
        p_agency_id: this.addAgencyForm.pAgencyId
      }
      createAgencyInfoApi(data).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.submitLoading = false
        this.$refs.addAgencyForm.resetFields()
        this.addAgencyVisible = false
        this.getData()
      }).catch(() => {
        this.submitLoading = false
      })
    }
  }

}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
