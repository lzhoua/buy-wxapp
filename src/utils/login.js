import wepy from 'wepy'

function getSetting(loading) {
  return new Promise((resolve) => {
    wepy.getSetting()
      .then((res) => {
        wepy.hideLoading()
        if (res.authSetting['scope.userInfo']) {
          loading ? wepy.showLoading({ // eslint-disable-line
            title: '登录中',
            mask: true
          }) : null
        }
        resolve()
      })
  })
}

export async function login (loading = true) {
  try {
    await getSetting(loading)
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
