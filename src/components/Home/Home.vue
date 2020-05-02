<template>
  <el-container class="home">
    <!--    头-->
    <el-header>
      <Header></Header>
    </el-header>
    <el-main class="main-container">
        <router-view></router-view>
    </el-main>
  </el-container>

</template>

<script>
  export default {
    // 在components中写入子组件
    components: {
      Header: require('../common/Header.vue').default
    }

  }
</script>

<style scoped lang="scss">
  .home {
    /*background-color: #eeeeee;*/
    height: 100%;
  }
  .main-container{
    height: 100%;
    width: 100%;
    padding: 0px;
    /*background-color: #ee414b;*/
  }

</style>
