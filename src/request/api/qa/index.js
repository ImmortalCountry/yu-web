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

    // 获取问题详情
          async getQuestion(id) {
                const {data: res} = await axios.get(`${linkUrl.qaUrl}/problems/${id}`);
                return res
    },

    // 添加回复
    async addReply(reply) {
          const {data: res} = await axios.post(`${linkUrl.qaUrl}/replies`, reply);
          return res
    },

    // 获取回复
    async getReplies(id) {
          const {data: res} = await axios.get(`${linkUrl.qaUrl}/replies/${id}`);
          return res
    },

}

export default qa;
