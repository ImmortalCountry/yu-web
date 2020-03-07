<template>
  <el-container>
    <el-header>
      <div class="header">
        <el-row :gutter="20">
          <el-col :span="100">
            <el-input v-model="Args.title" placeholder="请输入标题"></el-input>
          </el-col>
          <el-col :span="6">
            <el-select v-model="Args.channel_id" placeholder="文章类别">
              <el-option
                v-for="item in channelList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
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
        channelList: [],
        Args: {
          title: '',
          content: '',
          author_id: '1',
          channel_id: 1
        }
      }
    },
    created() {
      this.getChannelList()
    },
    methods: {
      addArticle() {
        if (window.sessionStorage.getItem("user") !== null || window.sessionStorage.getItem("user") !== "") {
          let user = JSON.parse(window.sessionStorage.getItem("user"))
          this.Args.author_id = user.id;
        }
        this.$api.article.articleSave(this.Args).then(res => {
          this.$message.success("success")
        });
        this.$router.go(0)
      },
      getChannelList() {
        // 获取所有模块
        this.$api.article.channelList().then(res => {
          this.channelList = res.data;
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
