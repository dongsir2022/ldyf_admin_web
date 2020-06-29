<template>
  <div class="app-container">
    <el-row :gutter="20" type="flex" justify="space-between" class="block">
      <el-col>
        <el-card>
          <el-row>
            <el-col>
              <el-row class="majorInfo" type="flex" justify="start">
                <el-col :span="18" class="info">
                  <el-row>
                    <span class="title">今日总交易额</span>
                  </el-row>
                  <el-row>
                    <span class="content">100000.00 元</span>
                  </el-row>
                  <el-row class="desc" type="flex" justify="start">
                    <el-col :span="24">
                      <i :class="'icon_up'" />
                      <span :class="'content content_up'">100%</span>
                      <span class="suffix">比昨天</span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col>
        <el-card>
          <el-row>
            <el-col>
              <el-row class="majorInfo" type="flex" justify="start">
                <el-col :span="18" class="info">
                  <el-row>
                    <span class="title">今日总交易笔数</span>
                  </el-row>
                  <el-row>
                    <span class="content">500000 次</span>
                  </el-row>
                  <el-row class="desc" type="flex" justify="start">
                    <el-col :span="24">
                      <i :class="'icon_down'" />
                      <span :class="'content content_down'">10%</span>
                      <span class="suffix">比昨天</span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col>
        <el-card>
          <el-row>
            <el-col>
              <el-row class="majorInfo" type="flex" justify="start">
                <el-col :span="18" class="info">
                  <el-row>
                    <span class="title">今日总交易手续费</span>
                  </el-row>
                  <el-row>
                    <span class="content">5000.00 元</span>
                  </el-row>
                  <el-row class="desc" type="flex" justify="start">
                    <el-col :span="24">
                      <i :class="'icon_up'" />
                      <span :class="'content content_up'">100%</span>
                      <span class="suffix">比昨天</span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col>
        <el-card>
          <el-row>
            <el-col>
              <el-row class="majorInfo" type="flex" justify="start">
                <el-col :span="18" class="info">
                  <el-row>
                    <span class="title">今日总提现金额</span>
                  </el-row>
                  <el-row>
                    <span class="content">90000.00 元</span>
                  </el-row>
                  <el-row class="desc" type="flex" justify="start">
                    <el-col :span="24">
                      <i :class="'icon_down'" />
                      <span :class="'content content_down'">100%</span>
                      <span class="suffix">比昨天</span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" justify="space-between" class="block">
      <el-col>
        <el-card>
          <el-row>
            <el-col>
              <el-row class="majorInfo" type="flex" justify="start">
                <el-col :span="18" class="info">
                  <el-row>
                    <span class="title">总交易额</span>
                  </el-row>
                  <el-row>
                    <span class="content">10000000.00 元</span>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col>
        <el-card>
          <el-row>
            <el-col>
              <el-row class="majorInfo" type="flex" justify="start">
                <el-col :span="18" class="info">
                  <el-row>
                    <span class="title">总交易笔数</span>
                  </el-row>
                  <el-row>
                    <span class="content">10000000 次</span>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col>
        <el-card>
          <el-row>
            <el-col>
              <el-row class="majorInfo" type="flex" justify="start">
                <el-col :span="18" class="info">
                  <el-row>
                    <span class="title">总交易手续费</span>
                  </el-row>
                  <el-row>
                    <span class="content">500000.00 次</span>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col>
        <el-card>
          <el-row>
            <el-col>
              <el-row class="majorInfo" type="flex" justify="start">
                <el-col :span="18" class="info">
                  <el-row>
                    <span class="title">待提现总金额</span>
                  </el-row>
                  <el-row>
                    <span class="content">200000.00 元</span>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'roles',
      'userInfo'
    ])

  },
  beforeCreate() {
  },
  created() {

  },
  methods: {
    judgePermission: function(str) {
      // 权限判断
      return this.roles.indexOf(str) > -1
    }

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
<style lang="scss" scoped="scoped">
  .majorInfo {
    .icon {
      margin-top: 10px;
    }

    .info {

      .title {
        width: 98px;
        height: 19px;
        font-size: 14px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
        line-height: 19px;
      }

      .content {
        width: 80px;
        height: 26px;
        font-size: 20px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 37px;
      }

      .desc {
        .icon_up {
          width: 16px;
          height: 20px;
          background: url('~@/assets/image/index_icon_up.png') no-repeat;
          background-size: 100% 80%;
          background-position: top 62% right;
          float: left;
        }

        .icon_down {
          width: 16px;
          height: 20px;
          background: url('~@/assets/image/index_icon_down.png') no-repeat;
          background-size: 100% 80%;
          background-position: top 62% right;
          float: left;
        }

        .content {
          width: 35px;
          height: 19px;
          font-size: 14px;
          font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
          font-weight: bold;
          line-height: 17px;
        }

        .content_up {
          color: rgba(255, 67, 45, 1);
        }

        .content_down {
          color: rgba(16, 139, 14, 1);
        }

        .suffix {
          /*padding-left: 10px;*/
          height: 16px;
          font-size: 12px;
          font-family: MicrosoftYaHei;
          color: rgba(153, 153, 153, 1);
          line-height: 17px;
        }
      }
    }
  }
</style>
