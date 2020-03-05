<template>
  <el-container class="home">
    <!--    头-->
    <el-header>
      <el-menu
        default-active="activePath"
        router
        active-text-color="#409EFF"
        mode="horizontal">
        <el-menu-item :index="'/' + item.path" v-for="item in labelList" :key="item.id">
          <span>{{item.label_name}}</span>
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
        labelList: [],
        activePath:''
      }
    },
    created() {
      this.getLabelList();
      //this.activePath = window.sessionStorage.getItem('activePath')
      //this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      async getLabelList() {
        // 获取所有模块
        const {data: res} = await this.$http.get('http://localhost:9001/label');
        if (res.flag) {
          this.labelList = res.data;
        }
      },
      // 保存高亮的路径
      // saveNavState(activePath){
      //   window.sessionStorage.setItem('activePath', activePath);
      //   this.activePath = activePath
      // }
    },

  }
</script>

<style scoped>

</style>
