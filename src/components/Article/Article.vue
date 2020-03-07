<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
      <li class="list-item" v-for="item in articleList " :key="item.id">
        <div class="context-box">
          <div class="info-box">
            <div class="meta-row">
              <ul>
                <li>专栏</li>
                <li>作者</li>
                <li>时间</li>
                <li>类别</li>
              </ul>
            </div>
            <div class="title-row" style="cursor: pointer" @click="goDetail(item.user_id, item.id)">
              <!--              <a style="margin-left: 10px" @click="test"></a>-->
              <el-link><b style="color: black; font-size: medium">{{item.title}}</b></el-link>
              <div style="color: #b2bac2; font-size: xx-small; width: 250px">{{contentHandler(item.content) + "..."}}</div>
            </div>
          </div>
        </div>
      </li>

    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
  export default {
    watch: {
      getChannelId(val) {
        this.searchMap.channelId = val;
        this.articleList = [];
        this.count = 1;
        this.totalPages = '';
        this.getArticleList();
      }
    },
    data() {
      return {
        searchMap: {
          channelId: '1',
        },
        articleList: [],
        loading: false,
        count: 1,//起始页数值为0
        totalPages: ''//取后端返回内容的总页数
      }
    },
    created() {
      this.getArticleList()
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
      contentHandler(content){
        return content.slice(0,20);
      },
      getArticleList() {
        let page = this.count;
        let size = 10;//每页查询条数
        this.$api.article.articleList(page, size, this.searchMap).then(res => {
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
          this.getArticleList(); //调用接口，此时页数+1，查询下一页数据
        }, 2000);
      },
      goDetail(author_id, article_id) {
        let routeData = this.$router.resolve({
          path: "/article/detail",
          query: {
            author_id: author_id,
            article_id: article_id
          }
        });
        window.open(routeData.href, '_blank');
      }
    }
  }
</script>
<style scoped lang="scss">
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
    background-color: #ffffff;
  }

  p {
    color: #b2bac2;
    text-align: center;
  }
</style>
