<template>
  <div class="div-article">
    <el-row :gutter="20" style="height: 100%">

      <!--      左侧列-->
      <el-col :span="18" style="height: 100%">
        <div class="grid-content bg-purple" style="height: 100%"
             v-infinite-scroll="load"
             infinite-scroll-disabled="disabled">
          <el-row style="margin-top: 2px"v-for="item in articleList" :key="item.id">
            <el-col :span="18" style="background-color: #409eff">
              <div class="grid-content bg-purple" style="height: 150px">
                <el-row>
                  <el-col :span="10" style="background-color: blue">作者</el-col>
                  <el-col :span="10" style="background-color: #cf9236">时间</el-col>
                </el-row>

                <el-row style="cursor: pointer" @click.native="goDetail(item.id)">
                  <el-col style="width: 100%; background-color: #8c939d;">
                    <el-link><b style="color: black; font-size: medium">{{item.title}}</b></el-link>
                  </el-col>

                </el-row>

                <el-row style="cursor: pointer" @click.native="goDetail(item.id)">
                  <el-col style="width: 100%;  word-break: break-all;word-wrap: break-word;">
                    {{item.description}}
                  </el-col>

                </el-row>
                <el-row>
                  <el-col>分享</el-col>

                </el-row>
              </div>
            </el-col>
            <el-col :span="6" style="background-color: blue">
              <div class="grid-content bg-purple" style="height: 150px">
                <el-image v-if="item.url !==  null" style="width: 100%; height: 100%" :src="item.url"
                          fit="contain"></el-image>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>


      <!--      右侧列-->
      <el-col :span="6">
        <div class="grid-content bg-purple" style="background-color: #cf9236">
          <div style="height: 200px; background-color: #409eff">
            我是一个广告1
          </div>

          <div style="height: 200px; background-color: #409eff">
            我是一个广告2
          </div>
        </div>
        <!--        作者排行榜-->
        <div style="background-color: #cf9236; height: 100px; overflow:auto">
          <el-row>
            <el-col>作者2</el-col>
          </el-row>
          <el-row>
            <el-col>作者3</el-col>
          </el-row>
          <el-row>
            <el-col>作者4</el-col>
          </el-row>
          <el-row>
            <el-col>作者5</el-col>
          </el-row>
          <el-row>
            <el-col>作者6</el-col>
          </el-row>
          <el-row>
            <el-col>作者7</el-col>
          </el-row>
          <el-row>
            <el-col>作者8</el-col>
          </el-row>
          <el-row>
            <el-col>作者9</el-col>
          </el-row>
          <el-row>
            <el-col>作者10</el-col>
          </el-row>
        </div>

        <!--        作者二维码-->
        <div>
          我是二维码
        </div>
      </el-col>
    </el-row>


  </div>


  <!--    <div class="infinite-list-wrapper" style="overflow:auto">-->
  <!--      <ul-->
  <!--        style="width: 100%"-->
  <!--        class="list"-->
  <!--        v-infinite-scroll="load"-->
  <!--        infinite-scroll-disabled="disabled">-->
  <!--        <li class="list-item" v-for="item in articleList" :key="item.id">-->
  <!--          <div class="context-box">-->
  <!--            <div class="info-box">-->
  <!--              <div class="meta-row">-->
  <!--                <ul>-->
  <!--                  <li>专栏</li>-->
  <!--                  <li>作者</li>-->
  <!--                  <li>时间</li>-->
  <!--                  <li>类别</li>-->
  <!--                </ul>-->
  <!--              </div>-->
  <!--              <div class="title-row" style="cursor: pointer" @click="goDetail(item.user_id, item.id)">-->
  <!--                &lt;!&ndash;              <a style="margin-left: 10px" @click="test"></a>&ndash;&gt;-->
  <!--                <el-link><b style="color: black; font-size: medium">{{item.title}}</b></el-link>-->
  <!--                <div style="color: #b2bac2; font-size: xx-small; width: 250px">{{contentHandler(item.content) + "..."}}-->
  <!--                </div>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </li>-->
  <!--      </ul>-->
  <!--      <p v-if="loading">加载中...</p>-->
  <!--      <p v-if="noMore">没有更多了</p>-->
  <!--    </div>-->
</template>

<script>
  export default {
    watch: {
      getChannelId(val) {
        this.channelId = val;
        this.articleList = [];
        this.count = 1;
        this.totalPages = '';
        this.getArticleList(this.channelId, this.count, 5);
      }
    },
    data() {
      return {
        channelId: '1',
        articleList: [],
        loading: false,
        count: 1,//起始页数值为0
        totalPages: ''//取后端返回内容的总页数
      }
    },
    created() {
      this.getArticleList(this.channelId, this.count, 5)
    },
    computed: {
      noMore() {
        // 当起始页数大于总页数时停止加载
        return this.count >= this.totalPages - 1;
      },
      disabled() {
        return this.loading || this.noMore
      },
      getChannelId() {
        return this.$store.getters.getChannelId;
      }
    },


    methods: {
      contentHandler(content) {
        return content.slice(0, 20);
      },

      getArticleList(channelId, page, size) {
        this.$api.article.getArticleList(channelId, page, size).then(res => {
          this.articleList = this.articleList.concat(res.data.rows);
          this.totalPages = res.data.total;
          this.loading = false;
        })
      },


      load() {
        //滑到底部时进行加载
        this.loading = true;
        setTimeout(() => {
          this.count += 1; //页数+1
          this.getArticleList(this.channelId, this.count, 5); //调用接口，此时页数+1，查询下一页数据
        }, 2000);
      },


      goDetail(article_id) {
        let routeData = this.$router.resolve({
          path: "/article/detail",
          query: {
            article_id: article_id
          }
        });
        window.open(routeData.href, '_blank');
      }
    }
  }
</script>
<style scoped lang="scss">
  .div-article {
    margin-left: 17%;
  }


  .list-item {
    list-style: none;
  }

  .meta-row {
    > ul {
      margin-left: -40px;
      font-size: xx-small;
      color: #b2bac2;

      li {
        float: left;
        margin-right: 5px;
        margin-bottom: 5px;
        list-style: none;
      }
    }

  }

  .title-row {
    clear: both;
  }

  .context-box {
    margin-left: -50px;
    margin-top: 1px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #ffffff;
  }

  .infinite-list-wrapper {
    margin-left: 17%;
    background-color: #ffffff;
    height: 100%;
  }

  p {
    color: #b2bac2;
    text-align: center;
  }

  .div-article {
    height: 100%;
    background-color: #ffffff;
    margin-top: 10px;
    width: 1100px;
  }
</style>
