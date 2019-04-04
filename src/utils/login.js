import wepy from 'wepy'

async function getUserInfo () {
  try {
    return await wepy.getUserInfo()
  } catch (error) {
    console.log('------>', error)
  }
}

export async function getloginCode () {
  try {
    return (await wepy.login()).code
  } catch (error) {
    console.log('------>', error)
  }
}

export function login () {
  return new Promise((resolve, reject) => {
    Promise.all([getUserInfo(), getloginCode()])
    .then((res) => {
      const { encryptedData, iv } = res[0]
      const obj = {
        encryptedData,
        iv,
        code: res[0]
      }
      console.log('------>', obj)
      resolve(obj)
    })
    .catch(err => {
      reject(err)
    })
  })
}
