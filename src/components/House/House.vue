<template>
  <div>
    <Header/>
    <el-container class="home">
      <!--    头-->
      <el-header>
        <el-menu
          router
          style="margin-left: 30%"
          active-text-color="#409EFF"
          mode="horizontal">
          <el-menu-item :index="'/user/house/' + item.path" v-for="item in routerList" :key="item.id">
            <span>{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="main">
        <div class="main-div">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        routerList: [
          {
            path: 'fans',
            name: '粉丝'
          },
          {
            path: 'follow',
            name: '关注了'
          },
          {
            path: 'myself',
            name: '个人信息'
          },
          {
            path: 'messageCenter',
            name: '消息中心'
          }
        ]
      }
    },
    components: {
      Header: require('../common/Header.vue').default
    }
  }
</script>

<style scoped lang="scss">
  .home {
    background-color: #eeeeee;
    height: 100%;
  }

  .main-div {
    margin-left: 20%;
    margin-right: 20%;
    height: 100%;
  }

  .main {
    height: 100%;
  }
</style>
