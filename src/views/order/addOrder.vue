<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="top">
      <el-form-item label="商户名称" prop="merchant_id">
        <el-select
          v-model="form.merchant_id"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="querySearchMerchant"
          :loading="loading"
          :clearable="true"
          @change="fetchLocationLittleBee">
          <el-option
            v-for="item in merchantArr"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维护类型" prop="service_type_id">
        <el-select v-model="form.service_type_id" filterable placeholder="请选择维护类型">
          <el-option
            v-for="item in serviceTypeArr"
            :key="item.id"
            :label="item.description"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报修详情" prop="remark">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入报修详情"
          v-model="form.remark">
        </el-input>
      </el-form-item>
      <el-form-item label="派遣人员" prop="little_bee_id">
        <el-select v-model="form.little_bee_id" filterable placeholder="请选择派遣人员">
          <el-option
            v-for="item in littleBeeArr"
            :key="item.id"
            :label="item.user_name"
            :value="item.id">
            <span style="float: left">{{ item.user_name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">已派遣工单{{ item.order_count }}个</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit" plain>创建</el-button>
        <el-button @click="$parent.closePage('orderList')" plain>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {searchMerchant} from "@/api/merchant";
import {isNotBlank} from "@/utils/utils";
import {getServiceTypeAllList} from "@/api/system";
import {getLocationLittleBeeList} from "@/api/littleBee";
import {addOrder} from "@/api/order";

export default {
  name: "addOrder",
  data() {
    return {
      form: {},
      merchantArr: [],
      serviceTypeArr: [],
      littleBeeArr: [],
      loading: false,
      rules: {
        merchant_id: [{required: true, message: '请输入商户', trigger: 'blur'}],
        service_type_id: [{required: true, message: '请输入维护类型', trigger: 'blur'}],
        remark: [{required: true, message: '请输入维修详情', trigger: 'blur'}],
        little_bee_id: [{required: true, message: '请输入派遣人员', trigger: 'blur'}],
      }
    }
  },
  created() {
    this.fetchMerchant();
    this.fetchServiceType();
  },
  methods: {
    fetchServiceType() {
      getServiceTypeAllList().then(res => {
        this.serviceTypeArr = res.data;
      });
    },
    fetchLocationLittleBee() {
      console.log("fetch")
      if (isNotBlank(this.form.merchant_id)) {
        getLocationLittleBeeList(this.form.merchant_id).then(res => {
          this.littleBeeArr = res.data;
        })
      }
    },
    fetchMerchant() {
      let params = {search: ''};
      searchMerchant(params).then(res => {
        this.merchantArr = res.data;
      })
    },
    querySearchMerchant(queryString) {
      if (isNotBlank(queryString)) {
        let params = {search: queryString}
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          searchMerchant(params).then(res => {
            this.merchantArr = res.data;
          })
        }, 200);
      }
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          addOrder(this.form).then(res => {
            this.loading = false;
            this.$message({
              message: this.$t('alert.success'),
              type: 'success',
              duration: 1000
            });
            this.$parent.closePage('orderList');
          })
        }
      })
    }
  }
}
</script>

<style type="text/css" scoped="scoped">
  .el-form {
    width: 600px;
  }

  .el-select {
    width: 100%;
  }
</style>
