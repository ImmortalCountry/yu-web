import linkUrl from '@/request/api/linkUrl.js'; // 导入接口域名列表
import axios from '@/request/http.js';

const user = {
  // 模块列表
  async userInfo(id) {
    const {data: res} = await axios.get(`${linkUrl.userUrl}/users/${id}`);
    return res
  },

  // 获取除了 exceptId 的所有用户
    async userList(exceptId) {
      const {data: res} = await axios.get(`${linkUrl.userUrl}/users/userList/${exceptId}`);
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
  // 注册
  async register(registerForm) {
    const {data: res} = await axios.post(`${linkUrl.userUrl}/users/register`, registerForm);
    return res
  },
  // 获取用户详细信息
  async getUserDetailInfo(args) {
    const {data: res} = await axios.post(`${linkUrl.userUrl}/users/detail`, args);
    return res
  },
  // 更新用户信息
  async update(userInfo) {
    const {data: res} = await axios.put(`${linkUrl.userUrl}/users/${userInfo.id}`, userInfo);
    return res
  },
  //修改关注状态
  async attention(userId, targetUserId, amount){
    const {data: res} = await axios.put(`${linkUrl.userUrl}/users/attention/${userId}/${targetUserId}/${amount}`);
        return res
  }
};
export default user;
