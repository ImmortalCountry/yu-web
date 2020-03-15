import axios from 'axios'
import store from '@/store/store.js'

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
// 创建axios实例
let instance = axios.create({timeout: 1000 * 12});
instance.defaults.baseURL = 'http://localhost:9012';
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    // const token = store.state.token;
    const token = "Bearer " + window.sessionStorage.getItem("token");
    // console.log(token)
    // console.log("来啦")
    // config.headers.Authorization = token;
    config.headers['token'] = token;
    return config;
  },
  error => Promise.error(error));


// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    return res;
  });
export default instance;
