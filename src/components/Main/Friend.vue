<template>
  <div class="div-friend">
    <div style="width: 1000px;">
      <img src="../../assets/page-banner.png">
    </div>
    <div class="content" v-for="item in 40" :key="item">
      <el-card class="box-card">
        <el-row :gutter="20">
          <el-col :span="5" style="height: 160px">
            <img style="height: 160px; width: 170px; object-fit: fill" src="../../assets/sg.png"/>
          </el-col>
          <el-col :span="12" style="height: 160px">
            <div class="text"><b>昵称</b></div>
            <div class="text" style="font-size: xx-small; color: #b2bac2">24岁|女|金牛座|软件工程师</div>
            <div class="text">座右铭：我想和你啪啪啪</div>
          </el-col>
          <el-col :span="7" style="height: 160px">
            <div class="btn">
              <el-button circle icon="el-icon-view" style="background-color: red"></el-button>
            </div>
            <div class="btn">
              <el-button circle icon="el-icon-error"></el-button>
            </div>
            <div class="btn">
              <el-button circle icon="el-icon-chat-dot-round"></el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="scss">

  .box-card {
    margin-top: 10px;
    width: 1000px;
    height: 200px;
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
</style>

