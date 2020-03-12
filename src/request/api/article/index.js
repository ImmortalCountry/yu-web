import linkUrl from '@/request/api/linkUrl.js'; // 导入接口域名列表
import axios from '@/request/http.js'; // 导入http中创建的axios实例


const article = {
  // 获取文章列表
  async getArticleList(channelId, page, size) {
    const {data: res} = await axios.get(`${linkUrl.articleUrl}/articles/${channelId}/${page}/${size}`);
    return res
  },
  async channelList() {
    const {data: res} = await axios.get(`${linkUrl.articleUrl}/channels`);
    return res
  },
  async getArticleDetail(articleId) {
    const {data: res} = await axios.get(`${linkUrl.articleUrl}/articles/detail/${articleId}`);
    return res
  },
  async articleSave(Args) {
    const {data: res} = await axios.post(`${linkUrl.articleUrl}/articles`, Args);
    return res
  },

  async searchArticles(key, page, size) {
    const {data: res} = await axios.get(`${linkUrl.searchUrl}/articles/${key}/${page}/${size}`);
    return res
  },
}

export default article;
