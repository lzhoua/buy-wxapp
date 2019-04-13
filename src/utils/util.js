import wepy from 'wepy'

/**
 * rpx 转 px
 * @param {numder} rpx
 */
export function toPx(rpx) {
  return (rpx * wepy._sysInfo.windowWidth) / 750
}

/**
 * px 转 rpx
 * @param {number} px
 */
export function toRpx (px) {
  return (750 * px) / wepy._sysInfo.windowWidth
}

/**
 *
 * @param { string } h xxrpx | xxpx
 * @param { string } type px | rpx
 */
export function setViewHeight (h = '0px', type = 'px') {
  const { windowHeight, statusBarHeight } = wepy._sysInfo
  h = h.includes('rpx')
  ? toPx(h.replace(/rpx/, '')) * 1
  : h.replace(/px/, '') * 1
  let result = windowHeight - statusBarHeight - h
  return type === 'px'
    ? result
    : toRpx(result)
}

/**
 *
 * 日期格式化函数
 * @param date 日期
 * @param string 需要返回的格式 例如：YYYY-MM-DD dd-hh-mm-ss
 */

export function timeFormat (date, string) {
  if (date && date.includes && !date.includes('Z')) {
    date = new Date(date.replace('-', '/').replace('-', '/'))
  } else {
    date = new Date(date)
  }
  if (date.toString() === 'Invalid date') {
    return ''
  }
  let year = date.getFullYear()
  let month = ('0' + (date.getMonth() + 1)).substr(-2)
  let day = ('0' + date.getDate()).substr(-2)
  let hour = ('0' + date.getHours()).substr(-2)
  let minute = ('0' + date.getMinutes()).substr(-2)
  let second = ('0' + date.getSeconds()).substr(-2)
  return string
    .replace('yyyy', year)
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('dd', day)
    .replace('hh', hour)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second)
}
