<template>
  <div class="app-container">
    <!-- 空 -->
    <div class="block" />
    <!--    树形数据与懒加载-->
    <el-table
      v-loading="loading"
      :data="treedata"
      style="width: 100%"
      row-key="id"
      default-expand-all
      border
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        align="center"
        prop="agency_name"
        label="行社名称"
        width="200"
      />
      <el-table-column
        align="center"
        prop="agency_no"
        label="行社编号"
        width="200"
      />
      <el-table-column
        align="center"
        prop="bank_agency_no"
        label="银行内部机构号"
        width="200"
      />
      <el-table-column
        align="center"
        prop="clear_bank_no"
        label="清算行行号"
        width="200"
      />
      <el-table-column
        align="center"
        prop="pay_bank_no"
        label="支付行行号"
        width="200"
      />
      <el-table-column
        align="center"
        prop="card_no_front"
        label="卡bin"
        width="200"
      />
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.p_agency_id < 2"
            type="primary"
            size="mini"
            @click.stop="() => append(scope.row.p_agency_id, scope)"
          >添加下属行
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog title="添加下属行" :visible.sync="addAgencyVisible" width="35%">
      <!-- 表单 -->
      <el-form ref="addAgencyForm" :model="addAgencyForm" :rules="rules" label-width="120px">
        <el-form-item label="机构名称" prop="agencyName">
          <el-input v-model="addAgencyForm.agencyName" show-word-limit />
        </el-form-item>
        <el-form-item label="银行内部机构号" prop="bankAgencyNo">
          <el-input v-model="addAgencyForm.bankAgencyNo" show-word-limit />
        </el-form-item>
        <el-form-item label="清算行行号" prop="clearBankNo">
          <el-input v-model="addAgencyForm.clearBankNo" show-word-limit />
        </el-form-item>
        <el-form-item label="支付行行号" prop="payBankNo">
          <el-input v-model="addAgencyForm.payBankNo" show-word-limit />
        </el-form-item>
        <el-form-item label="卡bin" prop="cardNoFront">
          <el-input v-model="addAgencyForm.cardNoFront" show-word-limit />
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
        pAgencyId: '',
        bankAgencyNo: '',
        clearBankNo: '',
        payBankNo: '',
        cardNoFront: ''
      },
      rules: {
        agencyName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        bankAgencyNo: [
          { required: true, message: '银行内部机构号', trigger: 'blur' }
        ],
        clearBankNo: [
          { required: true, message: '清算行行号', trigger: 'blur' }
        ],
        payBankNo: [
          { required: true, message: '支付行行号', trigger: 'blur' }
        ],
        cardNoFront: [
          { required: true, message: '卡bin', trigger: 'blur' }
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
    append(id, scope) {
      if (id > 2) {
        this.$message({
          message: '只允许添加三级',
          type: 'warning'
        })
      } else {
        this.addAgencyVisible = true
        this.addAgencyForm.pAgencyId = scope.row.id
      }
    },
    // 向后台发送表单,并重新拉取数据
    createAgencyInfo() {
      this.submitLoading = true
      const data = {
        agency_name: this.addAgencyForm.agencyName,
        bank_agency_no: this.addAgencyForm.bankAgencyNo,
        clear_bank_no: this.addAgencyForm.clearBankNo,
        pay_bank_no: this.addAgencyForm.payBankNo,
        card_no_front: this.addAgencyForm.cardNoFront,
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
