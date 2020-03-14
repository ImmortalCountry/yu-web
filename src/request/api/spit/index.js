import linkUrl from '@/request/api/linkUrl.js'; // 导入接口域名列表
import axios from '@/request/http.js';

const spit={
  // 保存吐槽内容
  async saveSpit(spit) {
    const {data: res} = await axios.post(`${linkUrl.spitUrl}/spits`,spit);
    return res
  },
  async getSpitList() {
    const {data: res} = await axios.get(`${linkUrl.spitUrl}/spits`);
    return res
  },
}

export default spit;
