<template>
  <div class="div-qa">

    <div style="width: 1000px; height: 60px; text-align: center; margin-left:60px; background-color: #13ce66">
      <el-button style="margin-top: 10px" @click="openAddQuestion">发布问题</el-button>
    </div>

    <div class="content" v-for="item in questionList" :key="item.id">
      <el-card class="box-card">
        <el-row :gutter="20">
          <el-col :span="3">
<!--            <el-button style="color: #8cc5ff" class="textContainer">{{item.replyName}}</el-button>-->
          </el-col>
          <el-col :span="10">
            <el-button class="textContainer">最新回答时间：{{$commonUtils.timeTrans(item.replyTime)}}</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="13">
            <el-button class="textContainer" @click="goDetail(item.id)">{{item.title}}</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3">
            <el-button style="color: blue" class="textContainer">{{item.channelName}}</el-button>
          </el-col>
          <el-col :span="3">
            <el-button style="color: red" class="textContainer">点赞 {{item.thumbUp}}</el-button>
          </el-col>
          <el-col :span="3">
            <el-button style="color: green" class="textContainer">回答 {{item.reply}}</el-button>
          </el-col>
          <el-col :span="2">
            <el-button style="margin-left:200px; width: 400px"><span>浏览量 {{item.visits}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{$commonUtils.timeTrans(item.createTime)}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>来自：{{item.nickName}}</span>
            </el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!--发布问题-->

    <el-dialog
      @close="addDialogClosed"
      title="发布问题"
      :visible.sync="qaDialogVisible"
      width="40%">
      <!--      内容主题区域-->
      <el-form ref="addFormRef" :model="questionForm" label-width="70px">
        <el-form-item label="标题">
          <el-input v-model="questionForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" v-model="questionForm.content"></el-input>
        </el-form-item>
      </el-form>

      <!--      底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="qaDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addQuestion">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        qaDialogVisible: false,
        questionForm: {
          title: '',
          content: ''
        },
        questionList: [],

      }
    },
    created() {
      this.getQuestionList();
    },
    methods: {
      goDetail(id) {
        // console.log("进入详情页" + id)
        let routeData = this.$router.resolve({
          path: "/qa/detail",
          query: {
            id: id
          }
        });
        window.open(routeData.href, '_blank');
      },
      getQuestionList() {
        this.$api.qa.getQuestionList().then(res => {
          this.questionList = res.data;
        })
      },
      // 添加问题
      openAddQuestion() {
        this.qaDialogVisible = true;
      },
      addQuestion() {
        this.$api.qa.addQuestion(this.questionForm).then(res => {
          if (res.flag) {
            this.$message.success(res.message);
            this.questionList = res.data;
            this.getQuestionList();
          } else {
            this.$message.error(res.message);
          }
        });
        this.qaDialogVisible = false;
      },
      addDialogClosed() {
        // this.questionForm.title = '';
        // this.questionForm.content = '';
      },
    }
  }
</script>

<style scoped lang="scss">
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    margin-top: 10px;
    width: 1000px;
    margin-left: 60px;
  }

  .div-qa {
    height: 100%;
    margin-left: 17%;
  }

  .textContainer {
    width: 100%;
    /*禁止字体超出*/
    overflow: hidden;
    margin: 1px;
  }
</style>
