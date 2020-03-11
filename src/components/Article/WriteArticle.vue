<template>
  <div>
    <Header/>
    <el-container>
      <el-header style="height: 312px">
        <div class="header">
          <el-row :gutter="20">
            <el-col :span="100">
              <el-input v-model="args.title" placeholder="请输入标题"></el-input>
            </el-col>
            <el-col :span="6">
              <el-select v-model="args.channelId" placeholder="文章类别">
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
          <el-row style="margin-top: 20px" :gutter="20">
            <el-col :span="6"><span style="margin-left: 50px"><b>封面图片</b></span></el-col>
            <el-col :span="3">
              <input style="width: 200px;" v-model="args.url"></input>
            </el-col>
          </el-row>
          <div style="margin-top: 30px; margin-left: 50px; width: 320px;height: 180px;">
            <el-image style="width: 100%; height: 100%" :src="args.url" fit="contain"/>
          </div>
        </div>
      </el-header>

      <el-main>
        <div class="edit-box" style="display: flex;justify-content: center;">
          <vue-edit style="width: 100%; height: 100%" ref="editor" id="editor" v-model="args.content"
                    :menus="menus"></vue-edit>
        </div>
      </el-main>
    </el-container>
  </div>

</template>

<script>
  import vueEdit from 'vue-wangeditor'

  export default {
    components: {
      Header: require('../common/Header.vue').default,
      vueEdit
    },
    data() {
      return {
        menus: [
          'source', // 源码模式
          '|',
          'bold', // 粗体
          'underline', // 下划线
          'italic', // 斜体
          'strikethrough', // 中线
          'eraser', // 清空格式
          'forecolor', // 文字颜色
          'bgcolor', // 背景颜色
          '|',
          'quote', // 引用
          'fontfamily', // 字体
          'fontsize', // 字号
          'head', // 标题
          'unorderlist', // 无序列表
          'orderlist', // 有序列表
          'alignleft', // 左对齐
          'aligncenter', // 居中
          'alignright', // 右对齐
          '|',
          'link', // 链接
          'unlink', // 取消链接
          'table', // 表格
          'emotion', // 表情
          '|',
          'img', // 图片
          'video', // 视频
          'insertcode', // 插入代码
          '|',
          'undo', // 撤销
          'redo', // 重做
          'fullscreen' // 全屏
        ],

        channelList: [],
        args: {
          title: '',
          url: '',
          content: '',
          authorId: '',
          channelId: 1,
        }
      }
    },
    created() {
      this.getChannelList()
    },
    methods: {
      refreshDetail(article_id) {
        this.$router.push({path: '/article/detail', query: {authorId: this.args.authorId, article_id: article_id}})
      },
      addArticle() {
        let user = this.$sessionUtils.getUserInfo();
        if (user !== null) {
          this.args.authorId = user.id;
        }

        // this.$refs.editor.setHtml(this.initContent) //如设置：后台返回来的固定内容
        this.args.content = this.$refs.editor.getHtml(this.initContent);
        this.$api.article.articleSave(this.args).then(res => {
          if (res.flag) {
            this.$message.success(res.message);
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
      },
      isDone(){

      }
    },
  }
</script>

<style scoped lang="scss">
  .textContent {
    margin-left: 20px;
    margin-right: 35%;
  }

  .header {
    width: 600px;
    height: 300px;
    margin-left: 30%;
    margin-right: 35%;
    margin-top: 20px;
  }

  .edit-box {
    width: 700px;
    height: 500px;
    margin-top: 10px;
    margin-left: 23%;
  }

</style>
