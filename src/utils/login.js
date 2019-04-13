import wepy from 'wepy'

function getSetting() {
  return new Promise((resolve) => {
    wepy.getSetting()
      .then((res) => {
        wepy.hideLoading()
        if (res.authSetting['scope.userInfo']) {
          wepy.showLoading({ // eslint-disable-line
            title: '登录中',
            mask: true
          })
        }
        resolve()
      })
  })
}

export async function login () {
  try {
    await getSetting()
    const token = (await wepy.getStorage({key: 'token'})).data
    wepy.fetch({
      ...wepy.$api.loginToken,
      data: {
        token: token
      }
    })
    .then(user => {
      const userInfo = user.data.user_data
      wepy.userInfo = userInfo
      console.log('----userInfo-->', userInfo)
      wepy.setStorage({
        key: 'token',
        data: userInfo.token
      })
    })
  } catch (error) {}
}

export function wxLogin (userInfo) {
  return new Promise((resolve) => {
    wepy.login().then(wx => {
      wepy.fetch({
        ...wepy.$api.wxlogin,
        data: {
          code: wx.code,
          encryptedData: userInfo.encryptedData,
          iv: userInfo.iv
        }
      })
      .then(res => {
        resolve(res)
      })
      .catch((err) => {
        console.log('------>', err)
        wepy.Alert.error('登录失败')
      })
    })
    // Promise.all([getLogin(), getSetting(loading = true)])
    // .then((res) => {
    //   wepy.fetch({...wepy.$api.wxlogin, data: res[0]})
    //   .then(user => {
    //     console.log('---user--->', user)
    //     resolve(user)
    //   })
    // })
    // .catch(err => {
    //   reject(err)
    // })
  })
}
