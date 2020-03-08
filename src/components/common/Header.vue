<template>
  <div>
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
            <el-button type="primary" round size="small" style="height: 100%" @click="writeArticle">写文章</el-button>
          </div>

          <div class="button" v-if="isLogin">
            <el-badge :value="12" class="item">
              <el-button icon="el-icon-message-solid" :circle="true" size="small"
                         style="font-size: large;height: 100%"></el-button>
            </el-badge>
          </div>
          <div class="button" v-if="!isLogin">
            <el-button type="primary" size="small" round style="height: 100%" @click="registerDialogVisible = true">注册
            </el-button>
          </div>
          <div class="button" v-if="!isLogin">
            <el-button type="primary" size="small" round style="height: 100%" @click="loginDialogVisible = true">登录
            </el-button>
          </div>
          <div class="button" v-if="isLogin">
            <el-dropdown trigger="click" style="height: 100%">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                         style="height: 100%; cursor: pointer"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="toMyHouse">个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </div>
      </el-col>
    </el-row>


    <!--登录-->

    <el-dialog
      @close="addDialogClosed"
      title="登录"
      :visible.sync="loginDialogVisible"
      width="50%">
      <!--      内容主题区域-->

      <el-form ref="addFormRef" :model="loginForm" label-width="70px">
        <el-form-item label="手机号">
          <el-input v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
      </el-form>

      <!--      底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </span>
    </el-dialog>

    <!--注册-->

    <el-dialog
      @close="registerDialogClosed"
      title="注册"
      :visible.sync="registerDialogVisible"
      width="50%">
      <!--      内容主题区域-->

      <el-form ref="addFormRef" :model="registerForm" label-width="70px">
        <el-form-item label="手机号">
          <el-input v-model="registerForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="registerForm.code"></el-input>
        </el-form-item>
        <el-button :disabled="isDisabled" @click="sendSms">{{smsInfo}}</el-button>
      </el-form>

      <!--      底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="registerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        icon_url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        moduleList: [],
        activePath: '',
        isLogin: null,
        loginDialogVisible: false,
        registerDialogVisible: false,
        isDisabled: false,
        smsInfo: "发送短信验证码",
        loginForm: {
          mobile: '',
          password: ''
        },
        registerForm: {
          mobile: '',
          code: '',
          password: ''
        },
        user: null
      }
    },
    created() {
      this.init();
      this.getModuleList();
    },
    methods: {
      init() {
        if (window.sessionStorage.getItem("isLogin") === "true") {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }

        this.activePath = window.sessionStorage.getItem('activePath');
        console.log(this.isLogin)
      },
      async getModuleList() {
        // 获取所有模块
        this.$api.base.moduleList().then(res => {
          this.moduleList = res.data;
        })
      },
      // 保存高亮的路径
      saveNavState(activePath) {
        window.sessionStorage.setItem('activePath', activePath);
        this.activePath = activePath
      },
      // 写文章
      writeArticle() {
        if (window.sessionStorage.getItem("isLogin") === "false" || window.sessionStorage.getItem("isLogin") === null) {
          this.$message.success("请先登录");
          this.loginDialogVisible = true;
        } else {
          // this.$router.push('article/write')
          this.$router.push({path:'/article/write'});

        }
      },
      addDialogClosed() {
        this.loginForm.mobile = '';
        this.loginForm.password = '';
      },
      // 注册
      registerDialogClosed() {
        this.registerForm.mobile = '';
        this.registerForm.password = '';
        this.registerForm.sms = '';
        this.smsInfo = "发送短信验证码";
        this.isDisabled = false;
      },
      register() {
        this.$api.user.register(this.registerForm).then(res => {
          if (res.flag === true) {
            this.registerDialogVisible = false;
            this.smsInfo = "发送短信验证码";
            this.isDisabled = false;
            this.$message.success("注册成功");
            this.$router.go(0)
          } else {
            this.$message.success(res.message);
          }
        })
      },
      sendSms() {
        this.isDisabled = true;
        this.smsInfo = "已发送";
      },
      login() {
        this.$api.user.login(this.loginForm).then(res => {
          if (res.flag === true) {
            this.loginDialogVisible = false;
            window.sessionStorage.setItem("token", res.data.token);
            window.sessionStorage.setItem("user", JSON.stringify(res.data.user));
            window.sessionStorage.setItem("isLogin", true);
            this.$message.success("登陆成功");
            this.$router.go(0)
          } else {
            this.$message.success(res.message);
          }
        })
      },
      logout() {
        window.sessionStorage.setItem("token", null);
        window.sessionStorage.setItem("user", null);
        window.sessionStorage.setItem("isLogin", false);
        this.$message.success("退出成功");
        this.$router.go(0)
      },
      // 去个人中心
      toMyHouse() {
        // this.$router.push('user/house')
        this.$router.push({path:'/user/house'})
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

  img {
    max-width: 100%;
    max-height: 100%;
  }

</style>
