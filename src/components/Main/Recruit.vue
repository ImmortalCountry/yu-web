<template>
  <div class="div-friend">
    <div style="width: 1000px; height: 60px; text-align: center; background-color: #13ce66">
      <el-button style="margin-top: 10px" @click="openAddRecruit">申请发布招聘信息</el-button>
    </div>
    <div class="content" v-for="item in 10" :key="item.id">
      <el-card class="box-card">
        <el-row>
          <el-col style="background-color: #13ce66; height: 30px"><span>公司：北京xx公司</span>
            <el-divider direction="vertical"></el-divider>
            <span>联系电话：1234567890</span></el-col>
        </el-row>
        <el-row>
          <el-col style="background-color: blue"><span>职位：</span></el-col>
        </el-row>
        <el-row>
          <el-col style="background-color: #8c939d"><span>要求：</span></el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {}
    },
    created() {

    },
    methods: {
      openAddRecruit() {

      }
    }
  }


</script>

<style scoped lang="scss">
  .box-card {
    margin-top: 10px;
    width: 1000px;
    height: 200px;
    overflow-y: auto
  }

  .div-friend {
    height: 100%;
    margin-left: 17%;
  }

  .text {
    margin-top: 20px;
  }

  .btn {
    width: 20px;
    height: 20px;
    margin-left: 200px;
    margin-top: 25px;
  }

  .el-row {
    margin-bottom: 10px;
    margin-top: 20px;
  }
</style>
