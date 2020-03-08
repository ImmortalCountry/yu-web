<template>
  <div class="home">
    <div class="content" v-for="item in userDetailInfo.followList" :key="item.id">
      <el-card class="box-card">
        <el-row :gutter="20">
          <el-col :span="5" style="height: 160px">
            <img style="height: 160px; width: 170px; object-fit: fill" src="../../assets/sg.png"/>
          </el-col>
          <el-col :span="12" style="height: 160px">
            <div class="text"><b>{{item.name}}</b></div>
            <div class="text" style="font-size: xx-small; color: #b2bac2">24岁|女|金牛座|软件工程师</div>
            <div class="text">座右铭：我想和你啪啪啪</div>
          </el-col>
          <el-col :span="7" style="height: 160px">
            <div class="btn">
              <el-button :type=btnType size="medium" v-text=buttonInfo @click="attentionHandle(item.id)"></el-button>
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
        user: null,
        args: {
          id: ''
        },
        is_attention: true,
        buttonInfo: '关注',
        btnType: '',
        userDetailInfo: ''
      }
    },
    created() {
      this.initBtn();
      this.user = JSON.parse(window.sessionStorage.getItem("user"));
      this.args.id = this.user.id;
      this.getUserDetailInfo();
    },
    methods: {
      initBtn() {
        this.btnType = this.is_attention === true ? 'success' : '';
        this.buttonInfo = this.is_attention === false ? '未关注' : '已关注';
      },
      attentionHandle(id) {
        this.is_attention = !this.is_attention;
        this.initBtn()
      },
      // // 获取关注信息，判断是否关注
      // getAttentionInfo(userId, targetUserId) {
      //   this.$api.user.attentionInfo(userId, targetUserId).then(res => {
      //     this.is_attention = res.data !== null;
      //     this.initBtn();
      //   })
      // },
      getUserDetailInfo() {
        this.$api.user.getUserDetailInfo(this.args).then(res => {
          // console.log(res)
          this.userDetailInfo = res.data;
        })
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

  .home {
    height: 100%;
  }

  .text {
    margin-top: 20px;
  }

  .btn {
    width: 20px;
    height: 20px;
    margin-left: 200px;
    margin-top: 66px;
  }
</style>
