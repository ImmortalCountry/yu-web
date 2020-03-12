import linkUrl from '@/request/api/linkUrl.js'; // 导入接口域名列表
import axios from '@/request/http.js';

const qa={
 // 问题列表
  async getQuestionList() {
    const {data: res} = await axios.get(`${linkUrl.qaUrl}/problems`);
    return res
  },

   // 模块列表
    async addQuestion(question) {
      const {data: res} = await axios.post(`${linkUrl.qaUrl}/problems`, question);
      return res
    },
}

export default qa;
