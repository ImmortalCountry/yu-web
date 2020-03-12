<template>
  <div class="grid-content bg-purple" style="height: 100%; margin-top: 10px; margin-left: 50px;"
       v-infinite-scroll="load"
       infinite-scroll-disabled="disabled">
    <el-row style="margin-top: 2px" v-for="item in articleList" :key="item.id">
      <el-col :span="18" style="background-color: #409eff">
        <div class="grid-content bg-purple" style="height: 150px">
          <el-row>
            <el-col :span="10" style="background-color: blue">作者</el-col>
            <el-col :span="10" style="background-color: #cf9236">{{item.createTime}}</el-col>
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
</template>

<script>
  export default {
    watch: {
      '$route'() {
        this.key = this.$route.query.key;
      }

    },
    data() {
      return {
        articleList: [],
        loading: false,
        count: 1,//起始页数值为0
        totalPages: '',//取后端返回内容的总页数
        key: ''
      }
    },
    components: {
      Header: require('../common/Header.vue').default
    },
    created() {
      this.key = this.$route.query.key;
      this.getSearchArticle(this.key, 1, 10);

    },
    methods: {
      getSearchArticle(key, page, size) {
        this.$api.article.searchArticles(key, page, size).then(res => {
          this.articleList = res.data.rows;
          console.log(this.articleList)
        })
      },
      load() {
        //滑到底部时进行加载
        this.loading = true;
        setTimeout(() => {
          this.count += 1; //页数+1
          this.getSearchArticle(this.key, this.count, 5); //调用接口，此时页数+1，查询下一页数据
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
  }
</script>

<style scoped>

</style>
