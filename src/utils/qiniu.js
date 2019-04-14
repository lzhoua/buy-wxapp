import qiniuUploader from '../utils/qiniuUploader'
import { md5 } from '../utils/md5'
import wepy from 'wepy'

class Qiniu {
  async qiniuCache () {
    if (!Qiniu.info) {
      Qiniu.info = {
        time: Date.now(),
        token: await this._getQiniuToken()
      }
    }
    if (Date.now() - Qiniu.info.time > (1000 * 60 * 60)) { // token 保存一个小时
      Qiniu.info = {
        token: await this._getQiniuToken(),
        time: Date.now()
      }
    }
    return Qiniu.info
  }

  // 获取七牛云token
  async _getQiniuToken () {
    try {
      this.qiniuToken = (await wepy.fetch({...wepy.$api.getQiniuToken})).data.uptoken
      return this.qiniuToken
    } catch (error) {}
  }

  async uploadImage (imageUrl) {
    await this.qiniuCache()
    let arr = []
    if (typeof imageUrl === 'string') {
      imageUrl = [imageUrl]
    }
    return new Promise((resolve) => {
      for (let i = 0, len = imageUrl.length; i < len; i++) {
        let key = md5(imageUrl[i])
        qiniuUploader.upload(imageUrl[i], (res) => {
          console.log('---121212--->', res)
          arr.push(res.imageURL)
          if (arr.length === len) {
            resolve(arr)
          }
        }, (error) => {
          // reject(error)
          console.log('error: ' + error)
        }, {
          region: 'SCN',
          domain: 'https://bzkdlkaf.bkt.clouddn.com',
          uptoken: Qiniu.info.token,
          key: `${key}.jpg`,
          // shouldUseQiniuFileName: true,
          uptokenFunc: function () {
            return '[yourTokenString]'
          }
        }, (res) => {
          console.log('上传进度', res.progress)
          // console.log('已经上传的数据长度', res.totalBytesSent)
          // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        })
      }
    })
  }
}

export default new Qiniu()
