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
    <!-- 地图 -->
    <div class="echarts">
      <div ref="main" style="width: 1000px;height:1300px;" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import shanxi from '@/assets/echarts/山西省.json'
import datong from '@/assets/echarts/大同市.json'
import jincheng from '@/assets/echarts/晋城市.json'
import jinzhong from '@/assets/echarts/晋中市.json'
import linfen from '@/assets/echarts/临汾市.json'
import lvliang from '@/assets/echarts/吕梁市.json'
import shuozhou from '@/assets/echarts/朔州市.json'
import taiyuan from '@/assets/echarts/太原市.json'
import xinzhou from '@/assets/echarts/忻州市.json'
import yangquan from '@/assets/echarts/阳泉市.json'
import yuncheng from '@/assets/echarts/运城市.json'
import changzhi from '@/assets/echarts/长治市.json'

const dataRouter = [
  {
    code: '140000',
    name: '山西省',
    namePy: 'shanxi',
    source: shanxi
  },
  {
    code: '140200',
    name: '大同市',
    namePy: 'datong',
    source: datong
  },
  {
    code: '140500',
    name: '晋城市',
    namePy: 'jincheng',
    source: jincheng
  },
  {
    code: '140700',
    name: '晋中市',
    namePy: 'jinzhong',
    source: jinzhong
  },
  {
    code: '141000',
    name: '临汾市',
    namePy: 'linfen',
    source: linfen
  },
  {
    code: '141100',
    name: '吕梁市',
    namePy: 'lvliang',
    source: lvliang
  },
  {
    code: '140600',
    name: '朔州市',
    namePy: 'shuozhou',
    source: shuozhou
  },
  {
    code: '140100',
    name: '太原市',
    namePy: 'taiyuan',
    source: taiyuan
  },
  {
    code: '140900',
    name: '忻州市',
    namePy: 'xinzhou',
    source: xinzhou
  },
  {
    code: '140300',
    name: '阳泉市',
    namePy: 'yangquan',
    source: yangquan
  },
  {
    code: '140800',
    name: '运城市',
    namePy: 'yuncheng',
    source: yuncheng
  },
  {
    code: '140400',
    name: '长治市',
    namePy: 'changzhi',
    source: changzhi
  }
]
export default {
  name: 'Home',
  data() {
    return {
      dataRouter,
      echartObj: {}, // echarts实例
      mapData: [], // 地图加载数据
      totalData: [], // 全部数据
      code: '140000',
      option: {
        title: {
          text: '山西省客户分布图',
          top: '3%',
          left: '5%',
          textStyle: {
            fontSize: 18,
            fontWeight: 400,
            color: '#b6d7ff'
          }
        },
        legend: {
          orient: 'vertical',
          top: '9%',
          left: '5%',
          icon: 'circle',
          data: [],
          selectedMode: 'single',
          selected: {},
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 30,
          inactiveColor: '#b6d7ff',
          textStyle: {
            color: '#ec808d',
            fontSize: 14,
            fontWeight: 300,
            padding: [0, 0, 0, 15]
          }
        },
        visualMap: {
          min: 0,
          max: 500,
          show: false,
          splitNumber: 5,
          inRange: {
            color: ['#FACD91', '#74DFB2', '#81D3F8', '#768FDE', '#e9969f'].reverse()
          },
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: '山西',
          label: {
            normal: {
              show: true,
              color: '#000'
            },
            emphasis: {
              show: true,
              color: '#fff'
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#8db200',
              borderColor: '#6367ad',
              borderWidth: 1
            },
            emphasis: {
              areaColor: '#feb6aa' // hover效果
            }
          },
          left: '5%',
          right: '5%',
          top: '5%',
          bottom: '5%'
        },
        series: [{
          name: '年度总项目数据查询',
          type: 'map',
          geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
          data: []
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'userInfo'
    ])
  },
  mounted() {
    // this.echartObj = this.$echarts.init(this.$refs.main)
    // const map = this.getJson(this.code)
    // if (map) {
    //   this.initEcharts(this.totalData, map[0].source)
    // } else {
    //   this.$message({
    //     message: '地图json未找到',
    //     type: 'fail'

    //   })
    // }

    // this.echartObj.on('legendselectchanged', params => {
    //   this.radioActive = Object.keys(this.radioList).filter(item => this.radioList[item] === params.name)[0]
    //   this.echartObj.clear()
    //   this.echartObj.setOption(this.getOptions())
    // })
    // window.addEventListener('resize', () => {
    //   if (this.echartObj && this.echartObj.resize) {
    //     this.echartObj.resize()
    //   }
    // })
  },
  methods: {
    // 地图json
    getJson(code) {
      const curData = this.dataRouter.find((item, index) => {
        return item.code === code
      })
      return curData
    },
    getOptions() {
      this.setOptions('legend', {
        data: Object.values(this.radioList),
        selected: (list => {
          const obj = {}
          Object.keys(list).map((item, index) => {
            obj[list[item]] = item === this.radioActive
          })
          return obj
        })(this.radioList)
      })
      this.setOptions('series', (() => {
        const arr = []
        Object.values(this.radioList)
          .map((item, index) => {
            arr[this.radioList[this.radioActive] === item ? 'unshift' : 'push']({
              name: item,
              type: 'map',
              geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
              data: this.getSeriesData(item)
            })
          })
        return arr
      })())
      return this.option
    },
    getSeriesData(item) {
      // return this.radioList[this.radioActive] === item ? Json.features.map(item => {
      //   return {
      //     name: item.properties.name,
      //     value: Math.ceil(Math.random() * 500),
      //     obj: {
      //       a: Math.ceil(Math.random() * 500),
      //       b: Math.ceil(Math.random() * 500),
      //       c: Math.ceil(Math.random() * 500),
      //       d: Math.ceil(Math.random() * 500)
      //     }
      //   }
      // }) : []
    },
    setOptions(objKey, objVal) {
      if (this.option[objKey] && typeof this.option[objKey] === 'object' && !Array.isArray(this.option[objKey])) {
        this.option[objKey] = Object.assign(this.option[objKey], objVal)
      } else {
        this.option[objKey] = objVal
      }
      this.$set(this.option, objKey, this.option[objKey])
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
