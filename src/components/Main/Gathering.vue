<template>
  <div class="home">
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in gatheringList" :key="item.id">
          <el-card shadow="hover" class="box-card" >
            <!--            <el-img :src="item.imageUrl" :fit="cover"></el-img>-->
            <img :src="item.imageUrl" class="img-box" @click="openWindow(item.eventUrl)"/>
            <div style="margin-top: 20px" @click="openWindow(item.eventUrl)"><b>{{item.title}}</b></div>
            <div style="text-align: center; margin-top: 30px"><span style="color: #3a8ee6;" @click="openWindow(item.eventUrl)">报名参加</span></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.getGatheringList();
    },
    data() {
      return {
        gatheringList: []
      }
    },
    methods: {
      getGatheringList() {
        this.$api.gathering.gatheringList().then(res => {
          this.gatheringList = res.data;
        })
      },
      openWindow(eventUrl){
        console.log(eventUrl)
        window.open(eventUrl);
      }
    }
  }
</script>

<style scoped lang="scss">
  .home {
    margin-top: 20px;
    width: 1000px;
  }

  .box-card {
    display: inline-block;
    width: 300px;
    height: 300px;
    margin: 2px;
    cursor: pointer;
  }

  .content {
    width: 1000px;
    /*禁止字体超出*/
    overflow: hidden;
    /*实现字体过长自动换行*/
    word-break: break-all;
    word-wrap: break-word;
  }

  .img-box {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

</style>
