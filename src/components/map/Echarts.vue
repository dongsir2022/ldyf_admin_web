<template>
  <div>
    <el-button class="filter-item backBtn" type="primary" icon="el-icon-back" @click="backLevel">返回</el-button>
    <div ref="main" style="width: 100%;height:100%;" />
  </div>
</template>

<script>
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
  name: 'Echarts',
  props: {
    mapData: {
      default: () => { return [] },
      type: Array
    }
  },
  data() {
    return {
      dataRouter,
      mapJson: '',
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
  watch: {
    mapData() {
      this.setOptions()
    }
  },
  mounted() {
    this.map = this.$echarts.init(this.$refs.main)
    window.onresize = this.map.resize
    this.map.on('click', (param) => {
      // console.log('initMap -> param', param)
      event.stopPropagation()// 阻止冒泡

      const cur = this.dataRouter.some((item, index) => {
        return item.name === param.name
      })

      if (cur) {
        this.name = param.name
        this.nameArr.push(this.name)
        // // console.log('initMap -> this.nameArr', this.nameArr)
        this.map.dispose()
        this.map = this.$echarts.init(this.$refs.main)

        this.toNewMap()
      }
    })

    this.mapJson = require(`@/static/${this.name}.json`)
    this.initMap()
    this.setOptions()
  },
  methods: {
    backLevel() {
      // // console.log('back -> this.nameArr', this.nameArr)
      if (this.nameArr.length > 1) {
        this.nameArr.pop()
        this.name = this.nameArr[this.nameArr.length - 1]
        this.toNewMap()
      }
    },
    toNewMap() {
      this.mapJson = require(`@/static/${this.name}.json`)
      this.initMap()
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
        // tooltip: {
        //   trigger: 'item',
        //   formatter: p => {
        // //     // console.log('getMapOpt -> p', p)
        //     return `<div>名称:${p.name}</div><div>经度:${p.value[0]}</div><div>纬度:${p.value[1]}</div><div>级别:${p.value[2]}</div>`
        //   }
        // },
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
          data: this.mapData
        }]
      }
      this.$nextTick(() => {
        this.map.setOption(option)
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
