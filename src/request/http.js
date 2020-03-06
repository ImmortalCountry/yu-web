import axios from 'axios'

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
// 创建axios实例
let instance = axios.create({timeout: 1000 * 12});
instance.defaults.baseURL = 'http://localhost:9012'
// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    return res;
  },
  // 请求失败
  error => {
    alert("请求失败啦")
    // const {response} = error;
    // if (response) {
    //   // 请求已发出，但是不在2xx的范围
    //   //errorHandle(response.status, response.data.message);
    //   alert("我错啦")
    //   return Promise.reject(response);
    // } else {
    //   // 处理断网的情况
    //   // eg:请求超时或断网时，更新state的network状态
    //   // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    //   // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    //   // if (!window.navigator.onLine) {
    //   //   store.commit('changeNetwork', false);
    //   // } else {
    //   //   return Promise.reject(error);
    //   // }
    // }
  });

export default instance;
