<template>
  <div class="login-container">
    <el-card class="login-panel" shadow="always">
      <el-row style="height: 600px;">
        <el-col :span="14" class="login-icon">
          <img class="login-icon-img" src="@/assets/image/chatu.png" alt="404">
        </el-col>
        <el-col :span="10" class="login-form-panel">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left">
            <el-form-item>
              <span class="login-form-title">工单系统</span>
            </el-form-item>
            <el-form-item prop="username">
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="用户名"
                name="username"
                type="text"
                auto-complete="on"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                name="password"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              class="submit"
              @click.native.prevent="handleLogin">登录
            </el-button>
          </el-form>
        </el-col>
      </el-row>
      <div class="login-form-panel">

      </div>
      <div></div>
    </el-card>
  </div>
</template>

<script>
import {validUsername} from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({path: this.redirect || '/'})
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>
  .login-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-image: url("~img/bg@2x.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    display: flex;

    .login-panel {
      margin: auto;
      height: 600px;
      width: 1000px;
      padding: 30px;
      border-radius: 25px;

      .login-icon {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .login-icon-img {
          width: 400px;
          height: 320px;
        }
      }

      .login-form-panel {
        height: 100%;
        display: flex;
        align-items: center;

        .login-form {
          height: 430px;
          width: 280px;

          .login-form-title {
            width: 100%;
            height: 44px;
            font-size: 44px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 90px;
          }

          .submit {
            margin-top: 30px;
            width: 220px;
            height: 40px;
            background: rgba(0, 102, 180, 1);
            border: 1px solid rgba(26, 114, 254, 1);
            border-radius: 33px;
          }
        }
      }
    }
  }
</style>
