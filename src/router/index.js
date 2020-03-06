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
import WriteArticle from "../components/Article/WriteArticle"

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '',
  routes: [
    {
      path: '/welcome/article/write',
      redirect: '/article/write',
    },
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
              path: 'welcome/recommended',
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
      ]
    },
    {
      path: '/article/detail',
      component: ArticleDetail
    },
    {
      path: '**/article/write',
      redirect: "/article/write"
    }
  ]
})
