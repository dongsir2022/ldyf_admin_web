<template>
  <div class="app-container">
    <el-row :gutter="20" type="flex" justify="space-between" class="block">
      <el-col>
        <el-card>
          <el-row>
            <el-col>
              <el-row class="majorInfo" type="flex" justify="start" :loading="sumNowLoading">
                <el-col :span="18" class="info">
                  <el-row>
                    <span class="title">今日总交易额</span>
                  </el-row>
                  <el-row>
                    <span class="content">{{ sumNow.total_transaction }} 元</span>
                  </el-row>
                  <el-row class="desc" type="flex" justify="start">
                    <el-col :span="24">
                      <i :class="sumNow.compared>=0?'icon_up':'icon_down'" />
                      <span :class="'content content_up'">{{ (Math.abs(sumNow.compared) * 100).toFixed(2) }}%</span>
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
                    <span class="content">{{ countNow.count_transaction }} 次</span>
                  </el-row>
                  <el-row class="desc" type="flex" justify="start">
                    <el-col :span="24">
                      <i :class="countNow.compared>=0?'icon_up':'icon_down'" />
                      <span :class="'content content_down'">{{ (Math.abs(countNow.compared) * 100).toFixed(2) }}%</span>
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
                    <span class="content">{{ chargeNow.serviceCharge }} 元</span>
                  </el-row>
                  <el-row class="desc" type="flex" justify="start">
                    <el-col :span="24">
                      <i :class="chargeNow.compared>=0?'icon_up':'icon_down'" />
                      <span :class="'content content_up'">{{ (Math.abs(chargeNow.compared) * 100).toFixed(2) }}%</span>
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
                    <span class="content">{{ sumTotal.total_transaction }} 元</span>
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
                    <span class="content">{{ countTotal.count_transaction }} 次</span>
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
                    <span class="content">{{ chargeTotal.serviceCharge }} 元</span>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

    </el-row>

    <!-- 百度地图 -->
    <!-- <baidu-map :map-data="bdMapData" style="width:1200px;height:800px;" /> -->
    <!-- echarts地图 -->
    <echarts :map-data="mapData" style="width:600px;height:800px;" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getQRCodeAddressMessApi } from '@/api/config/qrCodeApi'
import echarts from '@/components/map/Echarts'
// import baiduMap from '@/components/map/baiduMap'

import { getCountForTradeApi, getSumForTradeApi, getSumForServiceChargeApi, getTradeCountApi, getTradeSumApi, getServiceChargeSumApi } from '@/api/indexApi'
export default {
  name: 'Home',
  components: { echarts },
  data() {
    return {
      page: 1,
      mapData: [], // 地图加载数据
      bdMapData: [],
      countNow: {},
      sumNow: {},
      chargeNow: {},
      countTotal: {},
      sumTotal: {},
      chargeTotal: {},
      sumNowLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'userInfo'
    ])
  },
  mounted() {
    this.fetchData()
    this.getCountNow()
    this.getSumNow()
    this.getChargeNow()
    this.getCountTotal()
    this.getSumTotal()
    this.getChargeTotal()
  },
  methods: {
    // 获取每日交易数量
    getCountNow() {
      getCountForTradeApi().then(res => {
        console.log('getCountNow -> res', res)
        this.countNow = res.data
      })
    },
    // 每日交易总额
    getSumNow() {
      this.sumNowLoading = true
      getSumForTradeApi().then(res => {
        console.log('getSumNow -> res', res)
        this.sumNow = res.data
        this.sumNowLoading = false
      }).catch(() => {
        this.sumNowLoading = false
      })
    },
    // 每日交易手续费
    getChargeNow() {
      getSumForServiceChargeApi().then(res => {
        console.log('getChargeNow -> res', res)
        this.chargeNow = res.data
      })
    },
    // 获取交易数量
    getCountTotal() {
      getTradeCountApi().then(res => {
        console.log('getCountTotal -> res', res)
        this.countTotal = res.data
      })
    },
    // 交易总额
    getSumTotal() {
      getTradeSumApi().then(res => {
        console.log('getSumTotal -> res', res)
        this.sumTotal = res.data
      })
    },
    // 交易手续费
    getChargeTotal() {
      getServiceChargeSumApi().then(res => {
        console.log('getChargeTotal -> res', res)
        this.chargeTotal = res.data
      })
    },
    // 获取店铺数据
    fetchData() {
      const data = {
        page_num: this.page,
        page_size: 100
      }
      getQRCodeAddressMessApi(data).then(res => {
        // console.log('fetchData -> res', res)
        const retArr = []
        // const baiduArr = []
        for (const item of res.data) {
          if (item) {
            const arr = [item.longitude, item.latitude]
            // const obj = { lng: item.longitude, lat: item.latitude }
            retArr.push(arr)
            // baiduArr.push(obj)
          }
        }
        // console.log('fetchData -> retArr', retArr)
        this.mapData = this.mapData.concat(retArr)
        // this.bdMapData = this.bdMapData.concat(baiduArr)
        if (res.data && res.data.length) {
          this.page++
          this.fetchData()
        }
      })
    },
    judgePermission: function(str) {
      // 权限判断
      return this.roles.indexOf(str) > -1
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
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
