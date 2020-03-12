<template>
  <el-container>
    <el-header>
      <el-card class="edit-box" style="float: left;">
        <textarea style="height: 100px; width: 100%;"></textarea>
        <el-button style="width: 100%">发布</el-button>
      </el-card>
      <el-card style="margin-top: 60px; width: 200px; height: 200px;">
        个人信息
      </el-card>
    </el-header>
    <el-main style="margin-top: 200px; width: 640px; margin-left: 24.5%">
      <el-row v-for="item in 40" :key="item">
        <el-card>
          一条吐槽
          <el-button >展开回复</el-button>
          <el-button >评论</el-button>
          <el-row v-for="item in 10" :key="item">
            <el-divider></el-divider>
            <el-col>
              我是评论
            </el-col>
          </el-row>
        </el-card>

      </el-row>



    </el-main>
  </el-container>


</template>
<script>
  //参考文档 https://www.npmjs.com/package/vue-wangeditor
  import vueEdit from 'vue-wangeditor'

  export default {
    isShow:'show',
    methods:{
    },
    components: {
      vueEdit
    },
    data() {
      return {}
    },
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
