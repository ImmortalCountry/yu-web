<template>
  <el-container class="home">
    <!--    头-->
    <el-header>

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
    // 在components中写入子组件
    components: {
      Header: require('../common/Header.vue').default
    },
    data() {
      return {
        moduleList: [],
        activePath: ''
      }
    },
    created() {
      this.getMenuList();
      this.activePath = window.sessionStorage.getItem('activePath')
      //this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      async getMenuList() {
        // 获取所有模块
        const {data: res} = await this.$http.get('http://localhost:9001/module');
        if (res.flag) {
          this.moduleList = res.data;
        }
      },
      // 保存高亮的路径
      saveNavState(activePath) {
        window.sessionStorage.setItem('activePath', activePath);
        this.activePath = activePath
      }
    },

  }
</script>

<style scoped lang="scss">
  .home {
    background-color: #eeeeee;
    height: 100%;
  }

  .el-header {
    background-color: #ffffff;
  }

  .main-div {
    margin-left: 20%;
    margin-right: 20%;
  }
  .input{
    margin-top: 10px;
  }
  .main{
    height: 100%;
  }

</style>
