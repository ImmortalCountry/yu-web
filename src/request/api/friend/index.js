import linkUrl from '@/request/api/linkUrl.js'; // 导入接口域名列表
import axios from '@/request/http.js';

const friend={
 // 喜欢
  async like(friendId) {
    const {data: res} = await axios.post(`${linkUrl.friendUrl}/friends/like/${friendId}`);
    return res
  },

   // 不喜欢
    async noLike(friendId) {
      const {data: res} = await axios.post(`${linkUrl.friendUrl}/friends/noLike/${friendId}`);
      return res
    },
   // 发送私信
    async sendMessage(arg, receiverId) {
      const {data: res} = await axios.post(`${linkUrl.friendUrl}/friends/sendMessage/${receiverId}`, arg);
      return res
    },
}

export default friend;
