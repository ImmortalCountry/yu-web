import linkUrl from '@/request/api/linkUrl.js'; // 导入接口域名列表
import axios from '@/request/http.js';

const base = {
  // 模块列表
  async moduleList() {
    const {data: res} = await axios.get(`${linkUrl.baseUrl}/modules`);
    return res
  },
};
export default base;
