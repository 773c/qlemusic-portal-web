<template>
  <div id="personal-center-info-wrapper">
    <div class="pci-title-wrapper">
      <el-divider content-position="left">
        <div class="pci-title-name">
          <span>账号信息 <i class="el-icon-edit-outline"></i></span>
        </div>
      </el-divider>
    </div>
    <br>
    <div class="pci-account-info-wrapper">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="40px"
               class="demo-ruleForm">
        <div class="pci-ai-uniqueId-wrapper">
          <div v-show="!isUpdate">
            <span>ID： {{userInfo.uniqueId}}</span>
            <span style="color: #8c939d;font-size: 12px">（注：注册之后只能修改一次）</span>&nbsp;
            <el-tooltip class="item" effect="light" content="修改 ID" placement="top">
              <i class="el-icon-edit" style="color: #fe0000;cursor: pointer;font-size: 14px"
                 @click="showUpdateUniqueId"></i>
            </el-tooltip>
          </div>
          <el-dialog
            :visible.sync="dialogVisible"
            class="pci-ai-uniqueId-dialog"
            width="435px"
            :close-on-click-modal="false"
            :modal-append-to-body="false"
            :close-on-press-escape="false"
            @close="closeUniqueIdDialogTrigger">
            <el-form-item label="ID" prop="uniqueId">
              <el-input type="text" v-model="uniqueId" autocomplete="off"
                        style="width: 300px;margin-left: 10px" placeholder="请输入唯一ID号"></el-input>
            </el-form-item>
            <el-button class="pci-ai-uniqueId-button" type="danger" round @click="updateUniqueIdHandler">
              修改
            </el-button>
          </el-dialog>
        </div>
        <br>
        <div class="pci-ai-name-wrapper">
          <div v-show="!isUpdate">
            昵称： {{userInfo.name}}
          </div>
          <div v-show="isUpdate">
            <el-form-item label="昵称" prop="name">
              <el-input type="text" v-model="ruleForm.name=userInfo.name" autocomplete="off"
                        style="width: 300px;margin-left: 10px"></el-input>
            </el-form-item>
          </div>
        </div>
        <br>
        <div class="pci-ai-sex-wrapper">
          <div v-show="!isUpdate">
            性别： {{userInfo.sex}}
          </div>
          <div v-show="isUpdate">
            <el-form-item label="性别" style="margin-top: -30px">
              <el-radio v-model="sex=userInfo.sex" label="男" size="medium" style="margin-left: 10px">男
              </el-radio>
              <el-radio v-model="sex=userInfo.sex" label="女" size="medium" style="margin-left: 10px">女
              </el-radio>
            </el-form-item>
          </div>
        </div>
        <br>
        <div class="pci-ai-create-time-wrapper">
          <div v-show="!isUpdate">
            注册日期： {{userInfo.createTime}}
          </div>
        </div>
        <br>
        <div class="pci-ai-description-wrapper">
          <div v-show="!isUpdate" class="pci-ai-description">
            <div class="description-label">简介：</div>
            <div class="description-text">
              {{userInfo.description}}
            </div>
          </div>
          <div v-show="isUpdate">
            <el-form-item label="简介" prop="description" style="margin-top: -50px;">
              <el-input type="textarea" v-model="description = userInfo.description" maxlength="255" rows="6"
                        show-word-limit style="width: 700px;margin-left: 10px"></el-input>
            </el-form-item>
          </div>
        </div>
        <br>
      </el-form>
      <div class="pci-ai-save-btn-wrapper" align="center">
        <el-button v-show="!isUpdate" type="success" icon="el-icon-edit" circle plain
                   @click="isUpdate = true"></el-button>
        <el-button v-show="isUpdate" type="success" style="font-size: 13px;margin-top: -30px"
                   size="small"
                   @click="updateAccountInfoHandler">保存
        </el-button>
      </div>
    </div>
    <div style="clear: both"></div>
    <div></div>
    <br>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
    <div></div>
    <br>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {updateAccountInfo, updateUniqueId, isUpdateUniqueId} from "@/api/userInfo";

  export default {
    name: "personalCenter",
    data() {
      //自定义昵称判断
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('昵称不能为空'));
        } else {
          //判断昵称是否合法
          callback();
        }
      };
      return {
        isUpdate: false,
        uniqueId: '',
        dialogVisible: false,
        sex: '',
        description: '',
        ruleForm: {
          name: ''
        },
        rules: {
          name: [{validator: validateName, trigger: 'blur'}]
        },
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
    },
    methods: {
      //获取用户信息
      getUserInfo(){
        this.$store.dispatch('GetInfo',true)
      },
      //修改用户信息
      updateAccountInfoHandler() {
        updateAccountInfo({id: this.userInfo.id, name: this.ruleForm.name, sex: this.sex, description: this.description}).then(response => {
            console.log(response);
            this.isUpdate = false
          })
      },
      //判断唯一ID是否修改过
      showUpdateUniqueId() {
        isUpdateUniqueId(this.userInfo.id, false).then(response => {
          if (response.statusCode === 200)
            this.dialogVisible = true
        })
      },
      //修改唯一ID
      updateUniqueIdHandler() {
        if(this.uniqueId === '') this.$tip.error('唯一ID不能为空')
        else {
          updateUniqueId({id: this.userInfo.id, uniqueId: this.uniqueId}).then(response => {
            this.dialogVisible = false
            this.$tip.success('操作成功')
            this.getUserInfo()
          })
        }
      },
      //关闭修改唯一ID框触发
      closeUniqueIdDialogTrigger(){
        this.uniqueId = ''
        this.resetForm()
      },
      //重置Form验证效果
      resetForm() {
        this.$refs.ruleForm.resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
  //个人信息
  #personal-center-info-wrapper {
    .pci-title-wrapper {
      .pci-title-name {
        width: 150px;
        height: 30px;
        line-height: 31px;
        text-align: center;
        background-color: #333333;
        span {
          color: white;
          font-size: 16px;
        }
      }
    }
    .pci-account-info-wrapper {
      padding-left: 50px;
      //唯一ID
      .pci-ai-uniqueId-wrapper {
        .pci-ai-uniqueId-dialog {
          margin-top: 100px;
          .account-info-uniqueId-button {
            width: 250px;
            height: 45px;
            border-radius: 50px;
            margin-left: 70px;
            margin-top: 10px;
          }
        }
      }
      //名称
      .pci-ai-name-wrapper{}
      //性别
      .pci-ai-sex-wrapper{}
      //创建时间
      .pci-ai-create-time-wrapper{}
      //简介
      .pci-ai-description-wrapper{
        .pci-ai-description{
          .description-label{
            float: left;
          }
          .description-text{
            width: 580px;
            margin-left: 50px;
            line-height: 20px;
          }
        }
      }
      //保存按钮
      .pci-ai-save-btn-wrapper{
        margin-top: 4vw;
      }
    }
  }
</style>
