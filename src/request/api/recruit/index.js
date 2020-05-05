import linkUrl from '@/request/api/linkUrl.js'; // 导入接口域名列表
import axios from '@/request/http.js';

const recruit={
 // 招聘列表
  async getRecruitList() {
    const {data: res} = await axios.get(`${linkUrl.recruitUrl}/recruits`);
    return res
  },
 // 问题列表
  async addRecruit(recruit) {
    const {data: res} = await axios.post(`${linkUrl.recruitUrl}/recruits`, recruit);
    return res
  },

}

export default recruit;
