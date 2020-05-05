<template>
  <div class="div-friend">
    <div style="width: 1000px; height: 60px; text-align: center; background-color: #13ce66">
      <el-button style="margin-top: 10px" @click="openAddRecruit">申请发布招聘信息</el-button>
    </div>
    <div class="content" v-for="item in recruitList" :key="item.id">
      <el-card class="box-card">
        <el-row>
          <el-col style="height: 30px">
            <span>北京xx公司</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{item.address}}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{item.jobName}}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{item.mobile}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col><span>职位描述</span></el-col>
          <el-col>
            <textarea style="width: 953px;height: 110px" readonly>{{item.content1}}</textarea>
          </el-col>
        </el-row>
        <el-row>
          <el-col><span>职位要求</span></el-col>
          <el-col>
            <textarea style="width: 953px;height: 110px" readonly>{{item.content2}}</textarea>
          </el-col>
        </el-row>
        <el-row style="text-align: center;">
          <el-button style="height: 6px;" v-if="item.url !== null" @click="openWindow(item.url)">进入官网</el-button>
        </el-row>
      </el-card>
    </div>

    <!--发布问题-->

    <el-dialog
      @close="addDialogClosed"
      title="发布问题"
      :visible.sync="recruitDialogVisible"
      width="40%">
      <!--      内容主题区域-->
      <el-form ref="addFormRef" :model="recruitForm" label-width="70px">
        <el-form-item label="公司名称">
          <el-input v-model="recruitForm.company"></el-input>
        </el-form-item>
        <el-form-item label="工作地点">
          <el-input v-model="recruitForm.address"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="recruitForm.jobName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="recruitForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="职位描述">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10}" v-model="recruitForm.context1"></el-input>
        </el-form-item>
        <el-form-item label="工作描述">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10}" v-model="recruitForm.context2"></el-input>
        </el-form-item>
      </el-form>

      <!--      底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="recruitDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRecruit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        recruitList: [],
        recruitForm: {
          company: '',
          jobName: '',
          address: '',
          mobile: '',
          context1: '',
          context2: '',
          url: '',
        },
        recruitDialogVisible: false,
      }
    },
    created() {
      this.getRecruitList();
    },
    methods: {
      openWindow(eventUrl) {
        window.open(eventUrl);
      },
      getRecruitList() {
        this.$api.recruit.getRecruitList().then(res => {
          if (res.flag) {
            this.recruitList = res.data
          }
        });
      },
      addRecruit() {
        this.$api.recruit.addRecruit(this.recruitForm).then(res => {
          this.recruitDialogVisible = false;
        });
      },
      openAddRecruit() {
        this.recruitDialogVisible = true;
      },
      addDialogClosed() {
        this.recruitDialogVisible = true;
      },
    }
  }


</script>

<style scoped lang="scss">
  .box-card {
    margin-top: 10px;
    width: 1000px;
    height: 471px;
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
