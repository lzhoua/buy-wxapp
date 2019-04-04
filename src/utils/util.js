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
