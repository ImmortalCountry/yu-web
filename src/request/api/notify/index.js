import linkUrl from '@/request/api/linkUrl.js'; // 导入接口域名列表
import axios from '@/request/http.js';

const notify={
  async sendMessage(message) {
    const {data: res} = await axios.post(`${linkUrl.notifyUrl}/notifies/message`, message);
    return res
  },
  async getMessageList() {
    const {data: res} = await axios.get(`${linkUrl.notifyUrl}/notifies/message`);
    return res
  },

}

export default notify;
