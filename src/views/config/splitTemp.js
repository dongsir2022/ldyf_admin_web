export default {
  name: 'splitTempIndex',
  data() {
    return {
      active: 1,
      infoForm: {},
      settingForm: {},
      levelArr: [
        { label: '1级', value: 1 },
        { label: '2级', value: 2 },
        { label: '3级', value: 3 },
        { label: '4级', value: 4 },
        { label: '5级', value: 5 }
      ]
    }
  },
  methods: {
    infoNext() {
      this.active = 2
    },
    gotoInfo() {
      this.active = 1
    },
    submit() {
      this.active = 2
    }
  },
  filters: {
    dict(value) {
      let map = {
        1: '%',
        2: '元'
      }
      return map[value]
    }
  }
}
