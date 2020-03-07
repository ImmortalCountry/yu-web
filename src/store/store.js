import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
let store = new Vuex.Store({
  // 1. state
  state: {
    channelId: '1',
    isLogin: false,
    token: '',
    user: null
  },

  // // 2. getters
  getters: {
    // 参数列表state指的是state数据
    getChannelId(state) {
      return state.channelId;
    },
    getUserInfo(state){
      return state.user;
    }
  },
  // 3. actions
  // 通常跟api接口打交道
  actions: {
    // 设置城市信息
    // 参数列表：{commit, state}
    // state指的是state数据
    // commit调用mutations的方法
    // name就是调用此方法时要传的参数
    setChannelId({commit, state}, id) {
      commit("setChannelId", id);
    },
    setUserInfo({commit, state}, user){
      commit("setUserInfo", user);
    }
  },
  // 4. mutations
  mutations: {
    // state指的是state的数据
    // name传递过来的数据
    setChannelId(state, id) {
      state.channelId = id;//将传参设置给state的channelId
    },
    setUserInfo(state, user){
      console.log("我被设置啦")
      state.user = user;
      console.log(state.user)
    }
  }
});

export default store;
