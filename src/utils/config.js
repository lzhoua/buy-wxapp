export const lib = {
  env: 'dev' // 环境 dev: 测试， gray: 灰度， prop: 生产
}

const apiUrls = {
  dev: 'http://101.132.47.14:8000',
  gray: '',
  prop: ''
}

export const config = {
  baseApiUrl: apiUrls[lib.env]
}
