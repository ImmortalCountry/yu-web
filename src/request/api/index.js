// 文章模块接口
import article from '@/request/api/article';
import base from '@/request/api/base';
import user from '@/request/api/user'
import gathering from '@/request/api/gathering'
import qa from '@/request/api/qa'

// 其他模块的接口……
/**
 * api接口的统一出口
 */
// 导出接口
export default {
  article,
  base,
  user,
  gathering,
  qa
  // ……
}
