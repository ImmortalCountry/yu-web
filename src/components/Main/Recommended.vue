<template>
  <el-container class="recommended-container-home">
    <!--    头-->
    <el-header>
      <el-menu
        style="margin-left: 17%"
        default-active="activePath"
        router
        active-text-color="#409EFF"
        mode="horizontal">
        <el-menu-item :index="'/' + item.path" v-for="item in channelList" :key="item.id"
                      @click="setChannelId(item.id)">
          <span>{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="main">
      <router-view></router-view>
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
      setChannelId(id) {
        this.$store.dispatch("setChannelId", id);
      }
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

  }


  .recommended-container-home {
    margin-top: -20px;
    width: 100%;
    height: 100%;
  }

</style>
