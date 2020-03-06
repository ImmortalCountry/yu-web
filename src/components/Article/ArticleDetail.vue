<template>
  <el-container class="div-body">
    <!--    头-->
    <el-header>
      <Header></Header>
    </el-header>
    <div class="main">
      <el-main class="main-box">
        <el-row :gutter="20" style="height: 100%">
          <el-col :span="5" style="height: 100%">
            <div style="background-color: aqua" class="main-left"><span>左侧</span></div>
          </el-col>
          <el-col :span="12" style="height: 100%">
            <div class="main-center">
              <el-row :gutter="20">
                <el-col :span="3" style="margin-left: 10px;">
                  <div class="center-header">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                               style="height: 100%;width: 100%; cursor: pointer"></el-avatar>
                  </div>
                </el-col>
                <el-col :span="15">
                  <el-row :gutter="20" style="margin-top: 23px"><span>{{authorInfo.author_name}}</span></el-row>
                  <el-row :gutter="20" style="margin-top: 10px"><span>{{articleInfo.create_time}}</span></el-row>
                </el-col>

                <el-col :span="3">
                  <el-button :type=btnType size="medium" style="margin-top: 28px" @click="attention" v-text=buttonInfo>
                  </el-button>
                </el-col>
              </el-row>

              <div class="text" style="width: 705px">
                <!--                图片-->
                <div class="text-img">
                  <el-image
                    style="width: 100%; height: 100%;"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    fit="fill"></el-image>
                </div>
                <!--                标题-->
                <div class="text-title">
                  <b>{{articleInfo.title}}</b>
                </div>
                <!--                主题内容-->
                <div class="text-content">
                  <span>{{articleInfo.content}}</span>
                </div>
              </div>


            </div>
          </el-col>
          <el-col :span="5" style="height: 100%">
            <div style="background-color: blueviolet" class="main-right">右侧</div>
          </el-col>
        </el-row>
      </el-main>
    </div>
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
          author_name: ''
        },
        is_attention: 'false',
        buttonInfo: '未关注',
        btnType: ''
      }
    },
    created() {
      this.init();
      this.getDetail();
      this.getAuthor(this.authorInfo.author_id);
      this.getBtnType();
    },
    methods: {
      init() {
        console.log(this.$route.query);
        this.authorInfo.author_id = this.$route.query.author_id;
        this.articleInfo.article_id = this.$route.query.article_id;
      },
      getDetail() {
        this.$api.article.articleDetail(this.authorInfo.author_id, this.articleInfo.article_id).then(res => {
          this.authorInfo.author_name = res.data.author_name;
          this.articleInfo.title = res.data.title;
          this.articleInfo.content = res.data.content;
          this.articleInfo.create_time = res.data.create_time
        })
        // axios.defaults.baseURL = '';
        // const {data: res} = await axios.get(`articles/detail/${this.authorInfo.author_id}/${this.articleInfo.article_id}`);
        // if (res.flag) {
        //   this.authorInfo.author_name = res.data.author_name;
        //   this.articleInfo.title = res.data.title;
        //   this.articleInfo.content = res.data.content;
        //   this.articleInfo.create_time = res.data.create_time
        // }
        // console.log(this.$http);
        // this.$http.defaults.baseURL = '';
        //await this.$http.get(`http:localhost:9003/article/detail/${this.user_id}/${this.article_id}`)
      },
      getAuthor(id) {
        this.$api.user.userInfo(id).then(res => {
          this.authorInfo.author_name = res.data.nick_name;
          this.authorInfo.author_id = res.data.id;

        })
      },
      attention() {
        this.is_attention = !this.is_attention;
        this.getBtnType();
        if (this.is_attention === false) {
          this.buttonInfo = "未关注"
        } else {
          this.buttonInfo = "已关注"
        }
      },
      getBtnType(){
        this.btnType = this.is_attention === true ? 'success':'';
      }
    }
  }
</script>

<style scoped lang="scss">
  .main {
    background-color: #eeeeee;
    height: 100%;
  }

  .main-box {
    margin-left: 200px;
    margin-right: 250px;
    background-color: #eeeeee;
    height: 100%;
  }

  .main-left {
    text-align: center;
    height: 100%;
  }

  .main-center {
    height: 100%;
    background-color: #ffffff;
  }

  .main-right {
    height: 100%;
  }

  .center-header {
    margin-top: 10px;
    width: 66px;
    height: 66px;
  }

  .text-img {
    padding: 5px;
    width: 60%;
    margin: 0 auto
  }

  .text-title {
    margin-top: 30px;
    margin-left: 30px;
  }

  .text-content {
    margin-top: 20px;
    margin-left: 30px;
  }
</style>
