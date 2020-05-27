import $ from 'jquery'

export function isNotBlank(obj) {
  if (obj === null || obj === undefined || obj === '' || $.trim(obj) === '' || obj === [] || obj === {}) {
    return false
  } else {
    return true
  }
}

export function closePage($this, name, params) {
  const view = {
    name: $this.$route.name,
    path: $this.$route.path
  }
  $this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
    if (isNotBlank(name)) {
      $this.$router.push({
        name: name,
        params: params
      })
    }
  })
}

const digitsRE = /(\d{3})(?=\d)/g

/**
 * value  金额
 * currency 货币符号
 * decimals  保留位数
 */
export function currency(value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  const stringified = Math.abs(value).toFixed(decimals)
  const _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  const i = _int.length % 3
  const head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  const _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  const sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}
