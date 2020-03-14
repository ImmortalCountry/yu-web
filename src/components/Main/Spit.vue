<template>
  <el-container>
    <el-header>
      <el-card class="edit-box" style="float: left;">
        <el-input style="height: 100px; width: 100%;"
                  :autosize="{ minRows: 5, maxRows: 5}"
                  maxlength="300" type="textarea"
                  show-word-limit
                  v-model="spit.content"></el-input>
        <el-button style="width: 100%; margin-top: 30px" @click="addSpit()" :disabled="!spit.content > 0">发布</el-button>
      </el-card>
      <el-card style="margin-top: 60px; width: 200px; height: 200px;">
        {{user.name}}
      </el-card>
    </el-header>
    <el-main style="margin-top: 200px; width: 640px; margin-left: 24.5%">
      <el-row v-for="item in spitList" :key="item._id" style="margin-bottom: 6px">
        <el-card>
          <el-row style="width: 558px">
            <el-col style="font-size: xx-small; color: #b2bac2">
              <span>{{item.nickName}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>时间：{{$commonUtils.timeTrans(item.publishTime)}}</span>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row style="width: 558px">
            <el-col>
              {{item.content}}
            </el-col>
          </el-row>


          <div style="width: 558px; text-align: right">
            <el-button @click="showReply(item)" size="mini">评论{{item.comment}}</el-button>
          </div>
          <!--          回复-->
          <el-row v-for="children in item.children" :key="children._id" v-if="item.isReply"
                  style="margin-left: 30px">
            <el-divider></el-divider>
            <el-col style="font-size: xx-small; color: #b2bac2">
              <span>{{children.nickName}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{$commonUtils.timeTrans(children.publishTime)}}</span>
            </el-col>
            <el-col style="margin-top: 10px">
              <span>{{children.content}}</span>
            </el-col>
          </el-row>
          <div style="width: 558px; text-align: right;">
            <el-button @click="showReply(item)" v-if="item.isReply" size="mini">收起回复</el-button>
          </div>
          <el-input :autosize="{ minRows: 5, maxRows: 5}"
                    maxlength="300" type="textarea"
                    show-word-limit
                    v-model="spitReply.content"
                    v-if="item.isReply">
          </el-input>
          <div style="width: 558px; text-align: right;">
            <el-button @click="addSpitReply(item._id)" v-if="item.isReply" size="mini" :disabled="!spitReply.content > 0">回复
            </el-button>
          </div>
        </el-card>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
  //参考文档 https://www.npmjs.com/package/vue-wangeditor
  import vueEdit from 'vue-wangeditor'

  export default {
    data() {
      return {
        spitReply: {
          content: '',
        },
        spitDialogVisible: false,
        user: '',
        isShow: false,
        spit: {
          parentId: '',
          content: '',
          nickName: '',
          userId: '',
        },
        spitList: {
          children: []
        },
      }
    },
    created() {
      let user = this.$sessionUtils.getUserInfo();
      if (user !== null) {
        this.user = user;
      }
      this.getSpitList();
    },
    methods: {
      addDialogClosed() {
        this.spit.content = '';
      },
      getSpitList() {
        this.$api.spit.getSpitList().then(res => {
          if (res.flag) {
            this.spitList = res.data;
            // this.spitList.children = "xx"
            // console.log(this.spitList)
          }
        });
      },
      addSpit() {
        this.spit.userId = this.user.id;
        this.spit.parentId = "-1";
        this.spit.nickName = this.user.name;
        this.$api.spit.saveSpit(this.spit).then(res => {
          if (res.flag) {
            this.$message.success(res.message);
            this.getSpitList();
          }
        });
      },
      addSpitReply(parentId) {
        this.spitReply.parentId = parentId;
        this.spitReply.userId = this.user.id;
        this.spitReply.nickName = this.user.name;
        console.log(this.spitReply);
        this.spitDialogVisible = false;
        this.$api.spit.saveSpit(this.spitReply).then(res => {
          if (res.flag) {
            this.$message.success(res.message);
            this.spitReply.content='';
            this.getSpitList();
          }
        });
      },
      showReply(item) {
        item.isReply = !item.isReply;
      },
    },
    components: {
      vueEdit
    }
  }
</script>

<style scoped lang="scss">
  .edit-box {
    margin-top: 60px;
    margin-left: 25%;
    height: 200px;
    width: 600px;
  }
</style>
