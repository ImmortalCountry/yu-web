<template>
  <div class="div-friend">
    <div style="width: 1000px;">
      <img src="../../assets/page-banner.png">
    </div>
    <div class="content" v-for="item in userList" :key="item.id">
      <el-card class="box-card">
        <el-row :gutter="20">
          <el-col :span="5" style="height: 160px">
            <img style="height: 160px; width: 170px; object-fit: fill" src="../../assets/sg.png"/>
          </el-col>
          <el-col :span="12" style="height: 160px">
            <div class="text"><b>{{item.nickName}}</b></div>
            <div class="text" style="font-size: xx-small; color: #b2bac2">
              <span>年龄：{{item.age}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>性别：{{item.sex}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>职业：{{item.office}}</span>
            </div>
            <div class="text">兴趣：{{item.interest}}</div>
          </el-col>
          <el-col :span="7" style="height: 160px">
            <div class="btn">
              <el-button circle icon="el-icon-view" style="background-color: red" @click="like(item.id)"></el-button>
            </div>
            <div class="btn">
              <el-button circle icon="el-icon-error" @click="noLike(item.id)"></el-button>
            </div>
            <div class="btn">
              <el-button circle icon="el-icon-chat-dot-round"></el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userList: [],
        user: {
          id: '',
        }
      }
    },
    created() {
      let user = this.$sessionUtils.getUserInfo();
      if (user !== null) {
        this.user.id = user.id;
      }
      this.getUserList(this.user.id);
    },
    methods: {
      getUserList(exceptId) {
        this.$api.user.userList(exceptId).then(res => {
          if (res.flag) {
            this.userList = res.data;
          }
        })
      },
      like(friendId) {
        this.$api.friend.like(friendId).then(res => {
          if (res.flag) {
            this.$message.success(res.message);
          }
        })
      },
      noLike(friendId) {
        // this.$api.friend.noLike(friendId).then(res => {
        //   if (res.flag) {
        //     this.$message.success(res.message);
        //   }
        // })
      }
    }
  }
</script>

<style scoped lang="scss">

  .box-card {
    margin-top: 10px;
    width: 1000px;
    height: 200px;
  }

  .div-friend {
    height: 100%;
    margin-left: 17%;
  }

  .text {
    margin-top: 20px;
  }

  .btn {
    width: 20px;
    height: 20px;
    margin-left: 200px;
    margin-top: 25px;
  }
</style>

