<template>
  <div class="home">
    <el-card class="box-card">
      <div v-for="item in followersList" :key="item.id" class="text item">
        <el-divider></el-divider>
        <span>{{item.name}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        followersList: []
      }
    },
    created() {
      this.getFollowersList();
    },
    methods: {
      getFollowersList() {
        this.$api.user.getFollowersList().then(res => {
          if (res.flag) {
            this.followersList = res.data;
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .text {
    font-size: 14px;
  }

  .item {
    padding: 5px 0;
  }

  .box-card {
    width: 480px;
    margin-left: 110px;
  }
</style>
