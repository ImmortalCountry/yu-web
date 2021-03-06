import linkUrl from '@/request/api/linkUrl.js'; // 导入接口域名列表
import axios from '@/request/http.js';

const user = {
  // 获取用户信息
  async userInfo(id) {
    const {data: res} = await axios.get(`${linkUrl.userUrl}/users/${id}`);
    return res
  },

  // 获取除了 exceptId 的所有用户
    async userList() {
      const {data: res} = await axios.get(`${linkUrl.userUrl}/users/friends`);
      return res
    },
  // 关注信息
  async attentionInfo(targetUserId) {
    const {data: res} = await axios.get(`${linkUrl.userUrl}/users/attention/${targetUserId}`);
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
    const {data: res} = await axios.put(`${linkUrl.userUrl}/users`, userInfo);
    return res
  },
  //修改关注状态
  async attention(targetUserId, amount){
    const {data: res} = await axios.put(`${linkUrl.userUrl}/users/attention/${targetUserId}/${amount}`);
        return res
  },

  // 获取用户排行 Top 10
  async getUsersTop10(){
    const {data: res} = await axios.get(`${linkUrl.userUrl}/users`);
    return res
  },
  // 获取粉丝列表
  async getFansList(){
    const {data: res} = await axios.get(`${linkUrl.userUrl}/users/fans`);
    return res
  },
  // 获取关注列表
  async getFollowersList(){
    const {data: res} = await axios.get(`${linkUrl.userUrl}/users/followers`);
    return res
  },
  // 参加交友
  async joinFriends(mark){
   const {data: res} = await axios.put(`${linkUrl.userUrl}/users/joinFriends/${mark}`);
   return res
  },

};
export default user;
