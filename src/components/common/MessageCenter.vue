<template>
  <div class="home">
    <el-card class="box-card">
      <div v-for="item in messageList" :key="item.id" class="text item">
        <el-divider></el-divider>

        <span>{{$commonUtils.timeTrans(item.createTime)}}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{item.senderName}}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{item.action}}</span>
        <el-divider direction="vertical"></el-divider>
        <span>给你：</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{item.content}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        messageList: [],
      }
    },
    created() {
      this.getMessage();
    },
    methods: {
      getMessage() {
        this.$api.notify.getMessageList().then(res => {
          if (res.flag) {
            this.messageList = res.data;
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
    margin-left: 110px;
  }
</style>
