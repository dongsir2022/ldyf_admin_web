<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"/>

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span class="user-avatar">{{ userInfo.username }}</span>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item @click.native="changeSelfPassword">
            修改密码
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog width="40%" title="修改密码" :visible.sync="dialogFormVisible" class="user-dialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="oldPassword" label="旧密码">
          <el-input v-model="form.old_password" maxlenth="20" type="password" auto-complete="off" class="input-tx"/>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" maxlenth="20" placeholder="12-18位数字大小写字母特殊符号组合" type="password" auto-complete="off" class="input-tx"/>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input v-model="form.confirm_password" placeholder="确认密码" type="password" auto-complete="off" class="input-tx"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" :loading="saveLoading" @click="saveAccount">{{ $t('button.submit') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {createAccount, updatePassword, updateSelfPassword} from "@/api/system/accountApi";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userInfo'
    ])
  },
  data() {
    const validateConfirmPwd = (rule, value, callback) => {
      const password = this.form.password
      const repeatPassword = this.form.confirm_password
      if (password !== repeatPassword || repeatPassword === '') {
        return callback(new Error('重复密码不正确'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      form: {
        'old_password': '',
        'password': '',
        'confirm_password': '',
      },
      saveLoading: false,
      rules: {
        account: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, message: '用户名不能少于3位', trigger: 'blur'},
          {max: 20, message: '用户名不能超过20位', trigger: 'blur'},
          {pattern: /^[a-z1-9][a-z0-9-]+[a-z0-9]$/, message: '请填写小写字母和数字的组合，不能以0开头', trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 1, message: '用户名不能少于3位', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 12, message: '密码不能少于12位', trigger: 'blur'},
          {max: 18, message: '密码不能超过18位', trigger: 'blur'},
          // { pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,20}$/},
          {pattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).*.{12,18}$/, message: '密码规则为数字大小写字母特殊符号的组合', trigger: 'blur'}
        ],
        confirmPassword: [
          {validator: validateConfirmPwd, trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    changeSelfPassword() {
      this.dialogFormVisible = true
    },
    saveAccount() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.saveLoading = true
          this.form.account = this.userInfo.account
          // 修改密码
          updateSelfPassword(this.form).then(res => {
            this.saveLoading = false
            this.$message({
              message: this.$t('alert.optionSuccess'),
              type: 'success'
            })
            this.dialogFormVisible = false
            this.logout()
          }).catch(res => {
            this.saveLoading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
