<template>
  <div class="div-gathering">
    <div style="width: 1000px; height: 60px; text-align: center; background-color: #13ce66">
      <el-button style="margin-top: 10px" @click="openAddGathering">申请发布活动招信息</el-button>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in gatheringList" :key="item.id">
          <el-card shadow="hover" class="box-card">
            <!--            <el-img :src="item.imageUrl" :fit="cover"></el-img>-->
            <img :src="item.imageUrl" class="img-box" @click="openWindow(item.eventUrl)"/>
            <div style="margin-top: 20px" @click="openWindow(item.eventUrl)"><b>{{item.title}}</b></div>
            <div style="text-align: center; margin-top: 30px"><span style="color: #3a8ee6;"
                                                                    @click="openWindow(item.eventUrl)">报名参加</span></div>
          </el-card>
        </el-col>
      </el-row>
    </div>


    <!--    发布活动-->
    <el-dialog
      @close="addDialogClosed"
      title="发布活动"
      :visible.sync="gatheringDialogVisible"
      width="40%">
      <!--      内容主题区域-->
      <el-form ref="addFormRef" :model="gatheringForm" label-width="70px">
        <el-form-item label="活动名称">
          <el-input v-model="gatheringForm.title"></el-input>
        </el-form-item>
        <el-form-item label="举办城市">
          <el-input v-model="gatheringForm.city"></el-input>
        </el-form-item>
        <el-form-item label="图片URL">
          <el-input v-model="gatheringForm.imageUrl"></el-input>
        </el-form-item>
        <el-form-item label="官网地址">
          <el-input v-model="gatheringForm.eventUrl"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" v-model="gatheringForm.content"></el-input>
        </el-form-item>
      </el-form>

      <!--      底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="gatheringDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGathering">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    created() {
      this.getGatheringList();
    },
    data() {
      return {
        gatheringList: [],
        gatheringDialogVisible: false,
        gatheringForm: {
          title: "",
          city: "",
          imageUrl: "",
          eventUrl: "",
          content: "",
        }
      }
    },
    methods: {
      openAddGathering() {
        this.gatheringDialogVisible = true;
      },
      addDialogClosed() {
        this.gatheringForm.title = "";
        this.gatheringForm.city = "";
        this.gatheringForm.imageUrl = "";
        this.gatheringForm.eventUrl = "";
        this.gatheringForm.content = "";
      },
      getGatheringList() {
        this.$api.gathering.gatheringList().then(res => {
          this.gatheringList = res.data;
        })
      },
      openWindow(eventUrl) {
        console.log(eventUrl)
        window.open(eventUrl);
      },
      addGathering() {
        this.$api.gathering.addGathering(this.gatheringForm).then(res => {
          this.gatheringDialogVisible = false;
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .div-gathering {
    margin-top: 20px;
    width: 1000px;
    margin-left: 17%;
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
