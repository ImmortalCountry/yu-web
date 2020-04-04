import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home/Home.vue"
import Gathering from "../components/Main/Gathering.vue";
import Recommended from "../components/Main/Recommended";
import Qa from "../components/Main/Qa";
import Friend from "../components/Main/Friend";
import Spit from "../components/Main/Spit";
import Recruit from "../components/Main/Recruit";
import Article from "../components/Article/Article";
import ArticleDetail from "../components/Article/ArticleDetail";
import WriteArticle from "../components/Article/WriteArticle";
import House from "../components/House/House";
import Fans from "../components/House/Fans";
import Follow from "../components/House/Follow";
import MyTable from "../components/House/MyTable";
import Search from "../components/Article/searchPage";
import QaDetail from "../components/Main/QaDetail";
import messageCenter from "../components/common/messageCenter";

Vue.use(Router);
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
};
export default new Router({
  mode: 'history',
  base: '',
  routes: [
    {
      path: '/article/write',
      component: WriteArticle
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/',
          component: Recommended,
          redirect: '/welcome/recommended',
          children: [
            {
              path: 'welcome/*',
              component: Article
            }
          ]
        },
        {
          path: '/gathering',
          component: Gathering
        },
        {
          path: '/qa',
          component: Qa
        },
        {
          path: '/friend',
          component: Friend
        },
        {
          path: '/spit',
          component: Spit
        },
        {
          path: '/recruit',
          component: Recruit
        },
        {
          path: '/search',
          component: Search
        }
      ]
    },
    {
      path: '/article/detail',
      component: ArticleDetail
    },
    {
      path: '/qa/detail',
      component: QaDetail
    },
    {
      path: '/user/house',
      component: House,
      redirect: '/user/house/fans',
      children:[
        {
          path:'/user/house/fans',
          component: Fans
        },
        {
          path:'/user/house/follow',
          component: Follow
        },
        {
          path:'/user/house/myself',
          component: MyTable
        },
        {
          path:'/user/house/messageCenter',
          component: messageCenter
        }
      ]
    },
  ]
})
