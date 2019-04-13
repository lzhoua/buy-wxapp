import wepy from 'wepy'

function fetch ({...opt}) {
  let { url, method, token, data, header } = opt

  if (token) {
    header['token'] = wepy.userInfo.token
  }

  header = Object.assign({
    'content-type': 'application/x-www-form-urlencoded'
  }, header)

  let OBJECT = {
    url,
    method,
    data,
    header
  }
  return new Promise((resolve) => {
    wepy.request(OBJECT)
    .then((res) => {
      resolve(res)
      wepy.hideLoading()
    })
    .catch((err) => {
      console.log(err)
      wepy.hideLoading()
    })
  })
}

export default fetch
