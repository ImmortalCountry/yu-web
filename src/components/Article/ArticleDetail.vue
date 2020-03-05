<template>
  <el-container class="home">
    <!--    头-->
    <el-header>
      <Header></Header>
    </el-header>

    <el-main class="main">
      <div class="main-div">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="header">
              <el-row :gutter="20">
                <div class="user-header">
                  <el-col :span="2">
                    <div style="height: 60px; width: 70px; margin-left: 20px; margin-top: 20px">
                      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                                 style="height: 100%;width: 100%; cursor: pointer"></el-avatar>
                    </div>
                  </el-col>
                </div>
                <div class="user-header" style="height: 60px; width: 70px;">
                  <el-col :span="2">
                    <el-row>
                      <el-col>
                        <div style="width: 300px; margin-top: 25px">
                          {{articleInfo.create_time}}
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <div style="width: 300px; margin-top: 10px">{{authorInfo.name}}xiaoming</div>
                      </el-col>
                    </el-row>
                  </el-col>
                </div>
                <div>
                  <el-col :span="2" push="10" style="margin-top: 25px">
                    <el-button type="success" size="medium">{{buttonInfo}}已关注</el-button>
                  </el-col>
                </div>
              </el-row>
              <div class="text">
                <div class="text-img">
                  <el-image
                    style="width: 100px; height: 100px"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    fit="contain"></el-image>
                </div>
                <div class="text-title">
                  <b>{{articleInfo.title}}</b>
                </div>
                <div class="text-inside">
                  <span>{{articleInfo.content}}</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            第二列sdsa
          </el-col>
        </el-row>
      </div>
    </el-main>

  </el-container>
</template>

<script>
  import axios from 'axios'

  export default {
    components: {
      Header: require('../common/Header.vue').default
    },
    data() {
      return {
        articleInfo: {
          article_id: '',
          content: '',
          title: '',
          img_url: '',
          create_time: ''
        },
        authorInfo: {
          author_id: '',
          name: ''
        },
        is_attention: '',
        buttonInfo: ''
      }
    },
    created() {
      this.init();
      this.getDetail();
    },
    methods: {
      init() {
        console.log(this.$route.query);
        this.authorInfo.author_id = this.$route.query.author_id;
        this.articleInfo.article_id = this.$route.query.article_id;
      },
      async getDetail() {
        axios.defaults.baseURL = '';
        const {data: res} = await axios.get(`http://localhost:9003/article/detail/${this.authorInfo.author_id}/${this.articleInfo.article_id}`);
        if (res.flag) {
          this.authorInfo.name = res.data.author_name;
          this.articleInfo.title = res.data.title;
          this.articleInfo.content = res.data.content;
          this.articleInfo.create_time = res.data.create_time
        }
        // console.log(this.$http);
        // this.$http.defaults.baseURL = '';
        //await this.$http.get(`http:localhost:9003/article/detail/${this.user_id}/${this.article_id}`)
      }
    }
  }
</script>

<style scoped lang="scss">
  .home {
    background-color: #eeeeee;
    height: 100%;
  }

  .main-div {
    margin-left: 20%;
    margin-right: 20%;
    height: 100%;
  }

  .main {
    height: 100%;
  }

  .user-header {
    float: left;
  }

  .header {
    background-color: #ffffff;
    height: 100%;
  }

  .text {
    margin-top: 20px;

    .text-img {
      margin-left: 45%;
    }

    .text-inside {
      margin-top: 30px;
      margin-left: 15%;
    }

    .text-title {
      margin-top: 50px;
      margin-left: 10%;
      font-size: large;
    }
  }
</style>
