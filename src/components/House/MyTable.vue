<template>
  <div class="my-table">
    <el-row :gutter="20">
      <el-col :span="3"><span class="text-header">手机号</span></el-col>
      <el-col :span="6">
        <el-input disabled v-text="userInfo.mobile"></el-input>
      </el-col>

    </el-row>

    <el-row :gutter="20">
      <el-col :span="3" class="text-header">昵称</el-col>
      <el-col :span="6">
        <el-input v-model="userInfo.nickName"></el-input>
      </el-col>

    </el-row>

    <el-row :gutter="20">
      <el-col :span="3" class="text-header">性别</el-col>
      <el-col :span="6">
        <el-input v-model="userInfo.sex"></el-input>
      </el-col>

    </el-row>

    <el-row :gutter="20">
      <el-col :span="3" class="text-header">工作</el-col>
      <el-col :span="6">
        <el-input v-model="userInfo.office"></el-input>
      </el-col>

    </el-row>

    <el-row :gutter="20">
      <el-col :span="3" class="text-header">生日</el-col>
      <el-col :span="6">
        <el-input v-model="userInfo.birthday"></el-input>
      </el-col>

    </el-row>

    <el-row :gutter="20">
      <el-col :span="3" class="text-header">邮箱</el-col>
      <el-col :span="6">
        <el-input v-model="userInfo.email"></el-input>
      </el-col>

    </el-row>

    <el-row :gutter="20">
      <el-col :span="3" class="text-header">上次登录时间</el-col>
      <el-col :span="6">
        <el-input disabled v-text="this.$commonUtils.timeTrans(userInfo.lastLoginTime)"></el-input>
      </el-col>
    </el-row>

    <div class="div-div">
      <!--      <div style="font-weight: bold;margin-left: 145px">-->
      <!--        兴趣-->
      <!--      </div>-->
      <span style="font-weight: bold;margin-left: 45px;">兴趣</span>
      <textarea style="width: 263px; margin-left: 68px; height: 100px" v-model="userInfo.interest"></textarea>
    </div>

    <div class="div-div">
      <!--      <div style="font-weight: bold;margin-left: 145px">-->
      <!--        兴趣-->
      <!--      </div>-->
      <span style="font-weight: bold; margin-left: 30px; ">个人简介</span>
      <textarea style="width: 263px; margin-left: 51px; height: 100px" v-model="userInfo.personality"></textarea>
    </div>
    <div class="btn">
      <el-button type="primary" @click="update">更新我的资料</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userInfo: {
          nickName:'',
          sex:'',
          email:'',
          interest:'',
          personality:'',
          office:''
        },
      }
    },
    created() {
      let user = JSON.parse(window.sessionStorage.getItem("user"));
      this.$api.user.userInfo(user.id).then(res => {
        if (res.flag) {
          this.userInfo = res.data;
        }
      });
    },
    methods: {
      update() {
        this.$api.user.update(this.userInfo).then(res => {
          if (res.flag) {
            this.$message.success(res.message);
            // setTimeout(this.refresh(), 10000); //延迟1s后再操作sleep()函数
          }
        })
      },
      refresh() {
        this.$router.go(0);
      }
    }
  }
</script>

<style scoped lang="scss">

  el-row {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    font-weight: bold;
  }

  .div-div {
    display: flex;
    justify-content: left;
    align-items: center;
  }

  .btn {
    width: 500px;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .my-table{
    margin-left: 110px;
  }
</style>
