import wepy from 'wepy'

function getSetting(loading) {
  return new Promise((resolve) => {
    wepy.getSetting()
      .then((res) => {
        wepy.hideLoading()
        if (res.authSetting['scope.userInfo']) {
          loading ? null : wepy.showLoading({ // eslint-disable-line
            title: '登录中',
            mask: true
          })
        }
        resolve()
      })
  })
}

function getLogin() {
  return new Promise((resolve, reject) => {
    wepy.getUserInfo().then((user) => {
      wepy.login().then((res) => {
        let data = {
          code: res.code,
          encryptedData: user.encryptedData,
          iv: user.iv
        }
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
    })
  })
}

export function wxLogin (loading = true) {
  return new Promise((resolve, reject) => {
    Promise.all([getLogin(), getSetting(loading = true)])
    .then((res) => {
      wepy.fetch({...wepy.$api.wxlogin, data: res[0]})
      .then(user => {
        console.log('---user--->', user)
        resolve(user)
      })
    })
    .catch(err => {
      reject(err)
    })
  })
}
