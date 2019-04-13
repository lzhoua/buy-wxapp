/**
 * 消息提示
 */
export default class Alert {
  static toast (title = '消息提示', duration = 2000, mask = true) {
    wx.hideLoading()
    wx.showToast({
      icon: 'none',
      mask: mask,
      title: title,
      duration: duration
    })
  }

  /**
   * 错误提示
   * @param {提示文字} title
   * @param {时间} duration
   * @param {是否显示透明层} mask
   */
  static error (title = '失败', image = '/image/icon_fail@2x.png', duration = 2000, mask = true) {
    wx.hideLoading()
    wx.showToast({
      image: image,
      mask: mask,
      title: title,
      duration: duration
    })
  }

  /**
   * 成功提示
   * @param {提示文字} title
   * @param {时间} duration
   * @param {是否显示透明层} mask
   */
  static success (title = '成功', mask = true, duration = 2000, image) {
    wx.hideLoading()
    wx.showToast({
      image: image || '/image/icon_succeed@2x.png',
      mask: mask,
      title: title,
      duration: duration
    })
  }
  /**
   * 成功提示
   * @param {提示文字} title
   * @param {时间} duration
   * @param {是否显示透明层} mask
   */
  static warning (title = '警告', mask = true, duration = 2000, image) {
    wx.hideLoading()
    wx.showToast({
      image: image || '/image/icon_fail@2x.png',
      mask: mask,
      title: title,
      duration: duration
    })
  }

  /**
   * 加载中
   * @param {提示文字} title
   * @param {是否显示透明层} mask
   */
  static loading (title = '加载中', mask = true) {
    wx.hideLoading()
    wx.showLoading({
      title: title,
      mask: mask
    })
  }

  static modal (content = '提示内容', params = {showCancel: true}) {
    wx.hideLoading()
    let that = this
    return new Promise((resolve) => {
      wx.showModal({
        content: content,
        showCancel: params.showCancel,
        cancelText: params.cancelText || '取消',
        cancelColor: params.cancelColor || '#000000',
        confirmText: params.confirmText || '确认',
        confirmColor: params.confirmColor || '#3cc51f',
        success: function (res) {
          if (res.confirm) {
            resolve(true)
          } else if (res.cancel) {
            resolve(false)
          }
        },
        fail: function () {
          that.error('调用接口失败')
        }
      })
    })
  }
}
