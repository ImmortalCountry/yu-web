<template>
  <el-container class="div-body">
    <!--    头-->
    <el-header>
      <Header></Header>
    </el-header>
    <el-main class="main-box">
      <el-row>
        <el-col class="title">
          <span style="float:left;text-align: center; font-size: xx-large; height: 100%; width: 100%">
            {{question.title}}
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="content">
          <span style="height: 100%; font-size: large">
            {{question.content}}
          </span>
        </el-col>
      </el-row>

      <el-row v-for="item in replies" :key="item.id">
        <el-divider></el-divider>
        <el-col class="reply">
          <div style="font-size: small; color: #3a8ee6">{{item.nickName}}
            <el-divider direction="vertical"></el-divider>
            <span style="color: #3a8ee6">回答于:</span>
            <el-divider direction="vertical"></el-divider>
            <span style="color: #3a8ee6">{{$commonUtils.timeTrans(item.createTime)}}</span>
          </div>
          <div style="margin-left:20px; font-size: small; margin-top: 8px">{{item.content}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row style="margin-top: 10px">
        <el-col>
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 20}"
            placeholder="请输入内容"
            v-model="reply.content">
          </el-input>
          <el-button @click="addReply" :disabled="!reply.content > 0">回复</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    components: {
      Header: require('../common/Header.vue').default
    },
    data() {
      return {
        user: '',
        question: '',
        replies: [],
        problemId: '',
        reply: {
          problemId: '',
          content: '',
          userId: '',
          nickName: '',
        }
      }
    },
    created() {
      let user = this.$sessionUtils.getUserInfo();
      if (user != null) {
        this.user = user;
      }
      this.init();
    },
    methods: {
      init() {
        let id = this.$route.query.id;
        this.problemId = id;
        this.getQuestion(id);
        this.getReplies(id);
      },
      getQuestion(id) {
        this.$api.qa.getQuestion(id).then(res => {
          if (res.flag) {
            this.question = res.data;
          }
        })
      },
      addReply() {
        this.reply.problemId = this.problemId;
        this.reply.userId = this.user.id;
        this.reply.nickName = this.user.name;
        this.$api.qa.addReply(this.reply).then(res => {
          if (res.flag) {
            this.$message.success(res.message);
            // this.$router.go(0);\
            this.getReplies(this.problemId);
          }
          this.reply.content="";
        })
      },
      getReplies(id) {
        this.$api.qa.getReplies(id).then(res => {
          if (res.flag) {
            this.replies = res.data;
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .main-box {
    margin-left: 200px;
    margin-right: 250px;
    background-color: #eeeeee;
    height: 100%;
  }

  .title {
    /*background-color: #409eff;*/
    height: 30px;
  }

  .content {
    /*background-color: blue;*/
    margin-top: 20px;
  }

  .reply {
    /*background-color: #13ce66;*/
    /*margin-top: 10px;*/
  }

</style>
