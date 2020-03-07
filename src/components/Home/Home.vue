<template>
  <el-container class="home">
    <!--    头-->
    <el-header>
      <Header></Header>
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
  .main{
    height: 100%;
  }

</style>
