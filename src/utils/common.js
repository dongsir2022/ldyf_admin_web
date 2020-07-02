
const commonFun = {
  // 获取format格式时间(默认当前，补0)
  getDateTime(format, date) {
    if (!format) {
      format = 'YYYY-MM-DD hh:mm:ss'
    }
    if (!date) {
      date = new Date()
    }
    const YYYY = date.getFullYear()
    const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
    const DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
    const hh = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours())
    const mm = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
    const ss = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
    format = format.replace('YYYY', YYYY)
    format = format.replace('MM', MM)
    format = format.replace('DD', DD)
    format = format.replace('hh', hh)
    format = format.replace('mm', mm)
    format = format.replace('ss', ss)
    // console.log('时间', format)
    return format
  },

  /**
   * 调用方式 this.$dateTime.dateFormat('YYYY-m-dd', new Date('2019-3-4'))
   * @param {*} format
   * @param {*} date
   */
  dateFormat(format = 'YYYY-mm-ss HH:MM:SS', date = new Date()) {
    let ret
    const opt = {
      'Y+': date.getFullYear().toString(), // 年
      'm+': (date.getMonth() + 1).toString(), // 月
      'd+': date.getDate().toString(), // 日
      'H+': date.getHours().toString(), // 时
      'M+': date.getMinutes().toString(), // 分
      'S+': date.getSeconds().toString() // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (const k in opt) {
      ret = new RegExp('(' + k + ')').exec(format)
      if (ret) {
        format = format.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
      }
    }
    return format
  }
}
export default commonFun
