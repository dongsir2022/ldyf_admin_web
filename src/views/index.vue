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
    <div><el-button class="filter-item backBtn" type="primary" icon="el-icon-back" @click="backLevel">返回</el-button></div>
    <!-- 地图 -->
    <div class="echarts">
      <div ref="main" style="width: 1000px;height:1200px;" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getQRCodeAddressMessApi } from '@/api/config/qrCodeApi'

const dataRouter = [
  {
    code: '140000',
    name: '山西省',
    namePy: 'shanxi'
  },
  {
    code: '140200',
    name: '大同市',
    namePy: 'datong'
  },
  {
    code: '140500',
    name: '晋城市',
    namePy: 'jincheng'
  },
  {
    code: '140700',
    name: '晋中市',
    namePy: 'jinzhong'
  },
  {
    code: '141000',
    name: '临汾市',
    namePy: 'linfen'
  },
  {
    code: '141100',
    name: '吕梁市',
    namePy: 'lvliang'
  },
  {
    code: '140600',
    name: '朔州市',
    namePy: 'shuozhou'
  },
  {
    code: '140100',
    name: '太原市',
    namePy: 'taiyuan'
  },
  {
    code: '140900',
    name: '忻州市',
    namePy: 'xinzhou'
  },
  {
    code: '140300',
    name: '阳泉市',
    namePy: 'yangquan'
  },
  {
    code: '140800',
    name: '运城市',
    namePy: 'yuncheng'
  },
  {
    code: '140400',
    name: '长治市',
    namePy: 'changzhi'
  }
]
export default {
  name: 'Home',
  data() {
    return {
      page: 1,
      dataRouter,
      map: '', // echarts实例
      mapJson: '',
      mapData: [], // 地图加载数据
      totalData: [], // 全部数据
      name: '山西省',
      nameArr: ['山西省'],
      // moni: [['112.53	', '37.87', 12],
      //   ['112.65', '38.05', 23],
      //   ['112.33', '37.62', 34], ['113.08', '36.18', 5], ['114.2', '39.47', 45]]
      moni: [
        { name: '1', value: ['112.53', '37.87'] },
        { name: '2', value: ['112.65', '38.05'] }
      ]
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

    this.map = this.$echarts.init(this.$refs.main)
    window.onresize = this.map.resize()
    this.map.on('click', (param) => {
      console.log('initMap -> param', param)
      event.stopPropagation()// 阻止冒泡

      const cur = this.dataRouter.some((item, index) => {
        return item.name === param.name
      })

      if (cur) {
        this.name = param.name
        this.nameArr.push(this.name)
        console.log('initMap -> this.nameArr', this.nameArr)
        this.toNewMap()
      }
    })

    this.mapJson = require(`../static/${this.name}.json`)
    this.initMap()
    this.setOptions()
  },
  methods: {
    backLevel() {
      console.log('back -> this.nameArr', this.nameArr)
      if (this.nameArr.length > 1) {
        this.nameArr.pop()
        this.name = this.nameArr[this.nameArr.length - 1]
        this.toNewMap()
      }
    },
    toNewMap() {
      this.mapJson = require(`../static/${this.name}.json`)
      this.initMap()
    },
    // 获取店铺数据
    fetchData() {
      const data = {
        page_num: this.page,
        page_size: 100
      }
      getQRCodeAddressMessApi(data).then(res => {
        console.log('fetchData -> res', res)
        const retArr = []
        for (const item of res.data) {
          if (item) {
            const arr = [item.longitude, item.latitude, 2]
            retArr.push(arr)
          }
        }
        console.log('fetchData -> retArr', retArr)
        this.mapData = this.mapData.concat(retArr)
        this.setOptions()
        // if (res.data && res.data.length) {
        //   this.page++
        //   this.fetchData()
        // }
      })
    },
    // 初始化地图
    initMap() {
      this.$echarts.registerMap(this.name, this.mapJson)

      const option = this.getMapOpt()
      if (option && typeof option === 'object') {
        this.map.setOption(option, true)
      }
      this.map.setOption(option)
      this.setOptions()
    },
    getMapOpt() {
      const option = {
        title: {
          text: this.nameArr.join('-'),
          textStyle: {
            color: '#333333',
            fontStyle: 'normal',
            fontSize: 20
          },
          // subtext: '点击市可以看到该市每个县的店铺分布',
          textAlign: 'center',
          left: 'center',
          top: '20px'
        },
        visualMap: {
          min: 0,
          max: 50,
          // show: false,
          splitNumber: 5,
          itemWidth: '40px',
          itemHeight: '20px',
          top: '20px',
          inRange: {
            color: ['#FACD91', '#74DFB2', '#81D3F8', '#768FDE', '#e9969f'].reverse()
          },
          textStyle: {
            color: '#333'
          }
        },
        geo: {
          map: this.name,
          label: {
            normal: {
              show: true,
              color: '#333333'
            },
            emphasis: {
              show: true,
              color: '#457980'
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#fff',
              borderColor: '#333333',
              borderWidth: 1
            },
            emphasis: {
              areaColor: '#d0ebea', // hover效果
              borderColor: '#457980'
            }
          },
          left: '20%',
          right: '5%',
          top: '5%',
          bottom: '5%'
        },
        tooltip: {
          trigger: 'item',
          formatter: p => {
            // console.log('getMapOpt -> p', p)
            return `<div>名称:${p.name}</div><div>经度:${p.value[0]}</div><div>纬度:${p.value[1]}</div><div>级别:${p.value[2]}</div>`
          }
        },
        legend: {
          orient: 'vertical',
          top: 'top',
          left: 'right',
          data: this.nameArr,
          textStyle: {
            color: '#000'
          }
        },
        series: [{
          type: 'scatter',
          coordinateSystem: 'geo',
          geoIndex: 0,
          symbol: 'pin',
          symbolSize: [20, 30],
          data: []
        }]
      }
      return option
    },
    setOptions() {
      const option = {
        series: [{
          // name: this.name,
          // type: 'scatter',
          // coordinateSystem: 'geo',
          data: this.moni
        }]
      }
      this.$nextTick(() => {
        this.map.setOption(option)
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
