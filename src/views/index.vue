<template>
  <div class="app-container">
    <el-card class="box-card">
      <p>{{userInfo.role_name}}</p>
      <p>欢迎您，{{userInfo.username}}</p>
    </el-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'home',
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'roles',
        'userInfo'
      ])

    },
    methods: {
      judgePermission: function (str) {
        //权限判断
        return this.roles.indexOf(str) > -1;
      },

    },
    beforeCreate() {
    },
    created() {

    }
  }
</script>
<style type="text/css" scoped="scoped">
  .box-card {
    max-width: 400px;
  }
</style>
