import linkUrl from '@/request/api/linkUrl.js'; // 导入接口域名列表
import axios from '@/request/http.js';

const user = {
  // 模块列表
  async userInfo(id) {
    const {data: res} = await axios.get(`${linkUrl.userUrl}/users/${id}`);
    return res
  },
  // 关注信息
  async attentionInfo(userId, targetUserId) {
    const {data: res} = await axios.get(`${linkUrl.userUrl}/users/attention/${userId}/${targetUserId}`);
    return res
  },
  // 登录
  async login(loginForm) {
    const {data: res} = await axios.post(`${linkUrl.userUrl}/users/login`, loginForm);
    return res
  },

};
export default user;
