<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"/>
    </transition>
  </section>
</template>

<script>
import {isNotBlank} from "@/utils/utils";

export default {
  name: 'AppMain',
  data() {
    return {
      statusArr: [
        {value: 0, label: '正常'},
        {value: 1, label: '作废'}
      ]
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  methods: {
    closePage(name, params) {
      const view = {
        name: this.$route.name,
        path: this.$route.path
      };
      this.$store.dispatch('tagsView/delView', view).then(({visitedViews}) => {
        if (isNotBlank(name)) {
          this.$router.push({
            name: name,
            params: params
          })
        }
      })
    },
    openPage(name, params) {
      this.$router.push({
        name: name,
        params: params
      })
    }
  }
}
</script>

<style scoped>
  .app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .fixed-header + .app-main {
    padding-top: 50px;
  }
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>
