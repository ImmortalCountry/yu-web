import linkUrl from '@/request/api/linkUrl.js'; // 导入接口域名列表
import axios from '@/request/http.js';

const gathering = {
async gatheringList() {
    const {data: res} = await axios.get(`${linkUrl.gatheringUrl}/gatherings`);
    return res
  },
}
export default gathering;
