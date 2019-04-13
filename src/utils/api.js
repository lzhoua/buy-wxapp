import { config } from './config'
/**
 *
 * @param {string} url
 * @param { GET | POST | DELECT | PUT} method
 * @param {string} token
 */
function createApi(url, method = 'GET', token = false) {
  const httpUrl = config.baseApiUrl + url
  const requestParams = token ? {
    url: httpUrl,
    method: method,
    token: token
  } : {
    url: httpUrl,
    method: method
  }
  return requestParams
}

const api = {
  wxlogin: createApi('/user/getuser/', 'POST', false), // 首次登录
  loginToken: createApi('/user/gomine/', 'POST', false), // 登录
  writeNews: createApi('/news/write_news/', 'POST', true), // 发布帖子
  newsDetail: createApi('/news/show_detail/', 'GET', false), // 帖子详情
  sideComment: createApi('/news/side_comment/', 'POST', true), // 副评论
  mainComment: createApi('/news/main_comment/', 'POST', true), // 主评论
  choicenessNews: createApi('/news/choiceness_news/', 'POST', false), // 精选文章
  swipperNews: createApi('/news/swipper_news/', 'GET', false), // 轮播图帖子数据
  searchNews: createApi('/news/search_news/', 'GET', false), // 社区首页搜索
  showIndexnews: createApi('/news/show_indexnews/', 'GET', false) // 首页获取帖子内容
}

export default api
