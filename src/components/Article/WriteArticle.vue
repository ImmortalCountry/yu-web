<template>
  <el-container>
    <el-header>
      <div class="header">
        <el-row :gutter="20">
          <el-col :span="100">
            <el-input v-model="Args.title" placeholder="请输入标题"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="addArticle">发布</el-button>
          </el-col>
        </el-row>
      </div>
    </el-header>

    <el-main>
      <div class="textContent">
        <el-input
          type="textarea"
          v-model="Args.content"
          :rows="30"
          placeholder="请输入内容">
        </el-input>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        Args: {
          title: '',
          content: '',
          author_id: '1'
        }
      }
    },
    methods: {
      addArticle() {
        console.log(this.Args);
        this.$api.article.articleSave(this.Args).then(res => {
          console.log(res);
          this.$message.success("success")
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .textContent {
    margin-left: 30%;
    margin-right: 35%;
  }

  .header {
    margin-left: 30%;
    margin-right: 35%;
    margin-top: 20px;
  }

</style>
