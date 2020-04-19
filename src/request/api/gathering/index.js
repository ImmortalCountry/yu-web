import linkUrl from '@/request/api/linkUrl.js'; // 导入接口域名列表
import axios from '@/request/http.js';

const gathering = {
async gatheringList() {
    const {data: res} = await axios.get(`${linkUrl.gatheringUrl}/gatherings/list`);
    return res
  },
async addGathering(gatheringForm) {
    const {data: res} = await axios.post(`${linkUrl.gatheringUrl}/gatherings`,gatheringForm);
    return res
  },
}
export default gathering;
