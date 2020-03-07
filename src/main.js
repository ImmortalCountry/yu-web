// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/global.css'
import api from '@/request/api'
import store from './store/store.js';
import userUtils from '@/utils/login.js'

Vue.prototype.$api = api

Vue.use(ElementUI);

Vue.config.devtools = true;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  userUtils,
  components: {App},
  template: '<App/>'
})
