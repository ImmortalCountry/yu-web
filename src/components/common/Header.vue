<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="logo">
        <img src="./assets/logo.png" height="50" width="50" alt="logo">
      </div>
    </el-col>
    <el-col :span="6">
      <div class="module">
        <el-menu
          default-active="activePath"
          router
          active-text-color="#409EFF"
          mode="horizontal">
          <el-menu-item :index="'/' + item.path" v-for="item in moduleList" :key="item.id"
                        @click="saveNavState('/' + item.path)">
            <span>{{item.module_name}}</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-col>
    <!--搜索与添加区域-->
    <el-col :span="4">
      <div class="input">
        <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="input">
        <div class="button">
          <el-button type="primary" round size="small" style="height: 100%">写文章</el-button>
        </div>

        <div class="button" v-if="loading">
          <el-badge :value="12" class="item">
            <el-button icon="el-icon-message-solid" :circle="true" size="small" style="font-size: large;height: 100%"></el-button>
          </el-badge>
        </div>
        <div class="button" v-if="!loading">
          <el-button type="primary" size="small" round style="height: 100%">注册</el-button>
        </div>
        <div class="button" v-if="!loading">
          <el-button type="primary" size="small" round style="height: 100%">登录</el-button>
        </div>
        <div class="button" v-if="loading">
          <el-dropdown trigger="click" style="height: 100%">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="height: 100%; cursor: pointer"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>
        </div>

      </div>
    </el-col>
  </el-row>

</template>

<script>
  export default {
    data() {
      return {
        icon_url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        moduleList: [],
        activePath: '',
        loading: true
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
    }
  }
</script>

<style scoped lang="scss">
  .input {
    margin-top: 10px;
  }

  .button {
    height: 40px;
    float: left;
    margin-left: 10px;
    margin-bottom: 2px;
  }
  img{
    max-width: 100%;
    max-height: 100%;
  }

</style>
