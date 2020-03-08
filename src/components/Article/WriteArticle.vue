<template>
  <div>
    <Header/>
    <el-container>
      <el-header>
        <div class="header">
          <el-row :gutter="20">
            <el-col :span="100">
              <el-input v-model="args.title" placeholder="请输入标题"></el-input>
            </el-col>
            <el-col :span="6">
              <el-select v-model="args.channel_id" placeholder="文章类别">
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
            v-model="args.content"
            :rows="30"
            placeholder="请输入内容">
          </el-input>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        channelList: [],
        args: {
          title: '',
          content: '',
          author_id: '',
          channel_id: 1,
        }
      }
    },
    created() {
      this.getChannelList()
    },
    methods: {
      refreshDetail(article_id) {
        this.$router.push({path: '/article/detail', query: {author_id: this.args.author_id, article_id: article_id}})
      },
      addArticle() {
        // if (window.sessionStorage.getItem("user") !== null || window.sessionStorage.getItem("user") !== "") {
        //   let user = JSON.parse(window.sessionStorage.getItem("user"));
        //   this.args.author_id = user.id;
        // }
        let user = this.$sessionUtils.getUserInfo();
        if (user !== null) {
          this.args.author_id = user.id;
        }
        console.log(this.args.author_id)
        this.$api.article.articleSave(this.args).then(res => {
          if (res.flag) {
            this.$message.success(res.message);
            console.log(res)
            console.log(res.data.id)
            this.refreshDetail(res.data)
          } else {
            this.$message.error(res.message)
          }
        });
      },
      getChannelList() {
        // 获取所有模块
        this.$api.article.channelList().then(res => {
          this.channelList = res.data;
        })
      }
    },
    components: {
      Header: require('../common/Header.vue').default
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
