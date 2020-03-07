import linkUrl from '@/request/api/linkUrl.js'; // 导入接口域名列表
import axios from '@/request/http.js'; // 导入http中创建的axios实例
const article = {
  // 新闻列表
  async articleList(page, size, searchMap) {
    const {data: res} = await axios.post(`${linkUrl.articleUrl}/articles/${page}/${size}`, searchMap);
    return res
  },
  async channelList() {
    const {data: res} = await axios.get(`${linkUrl.articleUrl}/channels`);
    return res
  },
  async articleDetail(authorId, articleId) {
    const {data: res} = await axios.get(`${linkUrl.articleUrl}/articles/detail/${authorId}/${articleId}`);
    return res
  },
  async articleSave(Args) {
    const {data: res} = await axios.post(`${linkUrl.articleUrl}/articles`, Args);
    return res
  },
}

export default article;
