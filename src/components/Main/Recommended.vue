<template>
  <el-container class="home">
    <!--    头-->
    <el-header>
      <el-menu
        default-active="activePath"
        router
        active-text-color="#409EFF"
        mode="horizontal">
        <el-menu-item :index="'/' + item.path" v-for="item in channelList" :key="item.id">
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
</template>

<script>
  export default {
    data() {
      return {
        channelList: [],
        activePath: ''
      }
    },
    created() {
      this.getChannelList();
      //this.activePath = window.sessionStorage.getItem('activePath')
      //this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      getChannelList() {
        // 获取所有模块
        this.$api.article.channelList().then(res => {
          this.channelList = res.data;
        })
      },
      // 保存高亮的路径
      // saveNavState(activePath){
      //   window.sessionStorage.setItem('activePath', activePath);
      //   this.activePath = activePath
      // }
    },

  }
</script>

<style scoped lang="scss">
  .main {
    height: 100%;
    background-color: #ffffff;
  }

  .main-div {
    margin-left: 20%;
    margin-right: 20%;
    background-color: #ffffff;
    height: 100%;
  }

</style>
