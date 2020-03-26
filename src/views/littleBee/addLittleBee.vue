<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="top">
      <el-form-item label="姓名" prop="user_name">
        <el-input v-model="form.user_name" maxlength="10" show-word-limit placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="id_card">
        <el-input v-model="form.id_card" maxlength="18" show-word-limit placeholder="请输入身份证号码"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="mobile_phone">
        <el-input v-model="form.mobile_phone" maxlength="11" show-word-limit placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="form.gender" placeholder="请选择性别">
          <el-option
            v-for="item in genderArr"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区域" prop="location">
        <el-cascader
          size="large"
          :options="options"
          v-model="form.location">
        </el-cascader>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit" plain>创建</el-button>
        <el-button @click="$parent.closePage('littleBeeList')" plain>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {addLittleBee} from "@/api/littleBee";
import {isNotBlank} from "@/utils/utils";
import {regionDataPlus, CodeToText} from 'element-china-area-data'

export default {
  name: "addOrder",
  data() {
    return {
      form: {},
      rules: {
        user_name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
        id_card: [{required: true, message: '请输入身份证号码', trigger: 'blur'}],
        mobile_phone: [{required: true, message: '请输入联系电话', trigger: 'blur'}],
        location: [{required: true, message: '请输入区域', trigger: 'blur'}],
        gender: [{required: true, message: '请输入性别', trigger: 'blur'}],
        email: [{type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}]
      },
      loading: false,
      genderArr: [
        '男', '女'
      ],
      options: regionDataPlus,
      selectedOptions: []
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (true) {
          this.loading = true;
          let location = '';
          let locationDesc = '';
          for (let i = 0; i < this.form.location.length; i++) {
            if (isNotBlank(this.form.location[i])) {
              location = this.form.location[i];
              if (i > 0) {
                locationDesc += "|";
              }
              locationDesc += CodeToText[this.form.location[i]];
            }
          }
          let data = {
            user_name: this.form.user_name,
            mobile_phone: this.form.mobile_phone,
            location: location,
            location_desc: locationDesc,
            id_card: this.form.id_card,
            gender: this.form.gender,
            email: isNotBlank(this.email) ? this.email : ''
          }
          addLittleBee(data).then(res => {
            this.loading = false;
            this.$message({
              message: this.$t('alert.success'),
              type: 'success',
              duration: 1000
            });
            this.$parent.closePage('littleBeeList');
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

  .el-cascader {
    width: 100%;
  }
</style>
