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
            <div class="main-left">
              <span></span>
            </div>
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
                  <el-row :gutter="20" style="margin-top: 23px"><span>{{this.articleInfo.authorInfo.nickName}}</span>
                  </el-row>
                  <el-row :gutter="20" style="margin-top: 10px"><span>{{this.$commonUtils.timeTrans(articleInfo.createTime)}}</span>
                  </el-row>
                </el-col>

                <el-col :span="3">
                  <el-button v-if="isShowBtn" :type=btnType size="medium" style="margin-top: 28px"
                             @click="attentionHandle"
                             v-text=buttonInfo>
                  </el-button>
                </el-col>
              </el-row>

              <div class="text" style="width: 705px">
                <!--                图片-->
                <div class="text-img">
                  <el-image
                    v-if="articleInfo.image !== null"
                    style="width: 100%; height: 100%;"
                    :src="articleInfo.image"
                    fit="contain"></el-image>
                </div>
                <!--                标题-->
                <div class="text-title">
                  <b>{{articleInfo.title}}</b>
                </div>
                <!--                主题内容-->
                <div class="text-content" id="insert">文章加载中...</div>
              </div>

            </div>
          </el-col>
          <el-col :span="5" style="height: 100%">
            <div class="main-right">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>作者信息</span>
<!--                  <el-button style="float: right; padding: 3px 0" type="text">关注</el-button>-->
                </div>
                <div>
                  <img src="../../assets/ewm.png">
                  <div style="font-size: xx-large">作者：{{articleInfo.authorInfo.nickName}}</div>
                  <div style="font-size: xx-large">工作：{{articleInfo.authorInfo.office}}</div>
                  <div style="font-size: xx-large">粉丝数：{{articleInfo.authorInfo.fansCount}}</div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </div>
  </el-container>
</template>

<script>

  export default {
    components: {
      Header: require('../common/Header.vue').default
    },
    data() {
      return {
        done: '0',
        articleInfo: {
          authorInfo: ''
        },
        // 用户是否关注了作者
        isAttention: 'false',
        buttonInfo: '未关注',
        btnType: '',
        isShowBtn: false,
        userId: '',
        authorId: '',
        nickName: '',
      }
    },
    created() {
      this.init();
      this.getDetail();
      // this.getContent()
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => {
          let insertDiv = document.getElementById("insert");
          if (insertDiv) {
            insertDiv.innerHTML = this.articleInfo.content;
          }
        }, 1000)
      })
    },
    methods: {
      getContent() {
        this.$nextTick(() => {
          let insertDiv = document.getElementById("insert");
          insertDiv.innerHTML = this.articleInfo.content;
        })

      },
      init() {
        this.articleId = this.$route.query.article_id;
        let user = this.$sessionUtils.getUserInfo();
        // 用户不是本文章的作者
        if (user !== null && user.id !== this.authorId) {
          this.isShowBtn = true;
          this.userId = user.id;
        }
      },
      getDetail() {
        this.$api.article.getArticleDetail(this.articleId).then(res => {
          this.articleInfo = res.data;
          this.nickName = res.data.authorInfo.nickName
          this.authorId = this.articleInfo.authorInfo.id;
          this.getAttentionInfo(this.authorId);

        })
      },
      attentionHandle() {
        // 如果关注了就取消关注
        if (this.isAttention === true) {
          this.$api.user.attention(this.authorId, "-1");
        } else {
          // 关注
          this.$api.user.attention(this.authorId, "1");
        }
        this.isAttention = !this.isAttention;
        this.initBtn()
      },
      initBtn() {
        this.btnType = this.isAttention === true ? 'success' : '';
        this.buttonInfo = this.isAttention === false ? '未关注' : '已关注';
      },
      // 获取关注信息，判断是否关注
      getAttentionInfo(targetUserId) {
        this.$api.user.attentionInfo(targetUserId).then(res => {
          this.isAttention = res.data;
          this.initBtn();
        })
      },
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
    /*禁止字体超出*/
    overflow: hidden;
    /*实现字体过长自动换行*/
    word-break: break-all;
    word-wrap: break-word;
  }
</style>
