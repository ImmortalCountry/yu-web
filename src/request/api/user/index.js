import linkUrl from '@/request/api/linkUrl.js'; // 导入接口域名列表
import axios from '@/request/http.js';

const user = {
  // 模块列表
  async userInfo(id) {
    const {data: res} = await axios.get(`${linkUrl.userUrl}/users/${id}`);
    return res
  },
};
export default user;
