<template>
  <div>
    消息中心
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
        this.$message.notify.getMessageList().then(res => {
          if (res.flag) {
            this.messageList = res.data;
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
