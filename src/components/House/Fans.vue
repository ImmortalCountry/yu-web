<template>
  <div class="home">
    <el-card class="box-card">
      <div v-for="item in fansList" :key="item.id" class="text item">
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
        fansList: []
      }
    },
    created() {
      this.getFansList();
    },
    methods: {
      getFansList() {
        this.$api.user.getFansList().then(res => {
          if (res.flag) {
            this.fansList = res.data;
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
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
    margin-left: 110px;
  }
</style>
