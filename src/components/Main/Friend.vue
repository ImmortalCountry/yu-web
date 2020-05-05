<template>
  <div class="div-friend">
    <div style="width: 1000px;">
      <img src="../../assets/page-banner.png">
    </div>
    <div style="width: 1000px; height: 60px; text-align: center; background-color: red">
      <el-button style="margin-top: 10px" @click="joinFriends(1)">参加交友平台</el-button>
    </div>
    <div class="content" v-for="item in userList" :key="item.id">
      <el-card class="box-card">
        <el-row :gutter="20">
          <el-col :span="5" style="height: 160px">
            <img style="height: 160px; width: 170px; object-fit: fill" :src="item.avatar"/>
          </el-col>
          <el-col :span="12" style="height: 160px">
            <div class="text"><b>{{item.nickName}}</b></div>
            <div class="text" style="font-size: xx-small; color: #b2bac2">
              <span>年龄：{{item.age}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>性别：{{item.sex}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>职业：{{item.office}}</span>
            </div>
            <div class="text">兴趣：{{item.interest}}</div>
          </el-col>
          <el-col :span="7" style="height: 160px">
            <div class="btn">
              <el-button circle icon="el-icon-view" @click="like(item.id)"></el-button>
            </div>
            <div class="btn">
              <el-button circle icon="el-icon-error" @click="noLike(item.id)"></el-button>
            </div>
            <div class="btn">
              <el-button circle icon="el-icon-chat-dot-round" @click="openSendMessage(item.id)"></el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <el-dialog
      @close="addDialogClosed"
      title="发送私信"
      :visible.sync="messageDialogVisible"
      width="40%">
      <!--      内容主题区域-->
      <el-form ref="addFormRef" :model="messageForm" label-width="70px">
        <el-form-item label="内容">
          <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" v-model="messageForm.content"></el-input>
        </el-form-item>
      </el-form>

      <!--      底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="messageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendMessage()" :disabled="!messageForm.content > 0">发 送</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userList: [],
        exceptId: '',
        user: '',
        receiverId:'',
        messageDialogVisible: false,
        messageForm: {
          content: '',
        },
      }
    },
    created() {
      this.user = this.$sessionUtils.getUserInfo();
      this.getUserList();
    },
    methods: {
      joinFriends(mark){
        this.$api.user.joinFriends(mark).then(res => {
          if (res.flag) {
            this.getUserList();
          }
          this.$message.success(res.message)
        })
      },
      getUserList() {
        this.$api.user.userList().then(res => {
          if (res.flag) {
            this.userList = res.data;
          }
        })
      },
      like(friendId) {
        this.$api.friend.like(friendId).then(res => {
          if (res.flag) {
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
      },
      noLike(friendId) {
        this.$api.friend.noLike(friendId).then(res => {
          if (res.flag) {
            this.$message.success(res.message);
          } else {
            this.$message.success(res.message);
          }
        })
      },
      openSendMessage(receiverId) {
        this.messageDialogVisible = true;
        this.receiverId = receiverId;
      },
      sendMessage() {
        let arg = {
          content: this.messageForm.content,
        };
        this.$api.friend.sendMessage(arg, this.receiverId).then(res => {
          if (res.flag) {
            this.$message.success(res.message);
          }
          this.messageDialogVisible = false;
        });
      },
      addDialogClosed() {
        this.messageForm.content = "";
        this.receiverId = '';
      },
    }
  }
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

