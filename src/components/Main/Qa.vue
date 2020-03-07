<template>
  <div class="home">
    <div class="content" v-for="item in 40" :key="item">
      <el-card class="box-card">
        <el-row :gutter="20">
          <el-col :span="3">
            <el-button style="color: #8cc5ff" class="textContainer">小明</el-button>
          </el-col>
          <el-col :span="10">
            <el-button class="textContainer">回答于 2017-07-05 15:09</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="13">
            <el-button class="textContainer" @click="questionDetail">sundy为什么厉害！</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3">
            <el-button style="color: blue" class="textContainer">Java</el-button>
          </el-col>
          <el-col :span="3">
            <el-button style="color: red" class="textContainer">点赞 100</el-button>
          </el-col>
          <el-col :span="3">
            <el-button style="color: green" class="textContainer">回答 20</el-button>
          </el-col>
          <el-col :span="2">
            <el-button style="margin-left:200px; width: 400px">浏览量 50 | 2017-07-05 15:09 来自 毕鹏</el-button>
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
        questionList:[],

      }
    },
    methods: {
      questionDetail() {

      },
      getQuestionList(){

      }
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

  .home {
    height: 100%;
  }

  .textContainer {
    width: 100%;
    /*禁止字体超出*/
    overflow: hidden;
    margin: 1px;
  }
</style>
