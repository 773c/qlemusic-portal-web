<template>
  <div id="personal-center-info">
    <div class="title">
      <div class="title-name">
        <div style="width:420px;border-bottom: 1px solid #e4e4e4;float: left;margin-top: 8px"></div>
        账号信息
        <div style="width:430px;border-bottom: 1px solid #e4e4e4;float: right;margin-top: 8px"></div>
      </div>
      <br>
      <div class="account-info-wrapper">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="40px"
                 class="demo-ruleForm">
          <div class="account-uniqueId">
            <div v-show="!isUpdate">
              <span v-if="ruleForm.uniqueId === ''">ID： {{userInfo.uniqueId}}</span>
              <span v-else>ID： {{ruleForm.uniqueId}}</span>
              <span style="color: #8c939d;font-size: 12px">（注：注册之后只能修改一次）</span>&nbsp;
              <el-tooltip class="item" effect="light" content="修改 ID" placement="top">
                <i class="el-icon-edit" style="color: #fe0000;cursor: pointer;font-size: 14px"
                   @click="showUpdateUniqueId"></i>
              </el-tooltip>
            </div>
            <el-dialog
              :visible.sync="dialogVisible"
              class="el-dialog-uniqueId"
              width="435px"
              :close-on-click-modal="false"
              :modal-append-to-body="false"
              :close-on-press-escape="false">
              <el-form-item label="ID" prop="uniqueId">
                <el-input type="text" v-model="ruleForm.uniqueId" autocomplete="off"
                          style="width: 300px;margin-left: 10px" placeholder="请输入唯一ID号"></el-input>
              </el-form-item>
              <el-button class="account-info-uniqueId-button" type="danger" round @click="updateUniqueIdHandler">
                修改
              </el-button>
            </el-dialog>
          </div>
          <br>
          <div class="account-name">
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
          <div class="account-sex">
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
          <div class="account-create-time">
            <div v-show="!isUpdate">
              注册日期： {{userInfo.createTime}}
            </div>
          </div>
          <br>
          <div class="account-description">
            <div v-show="!isUpdate">
              <div style="float: left">简介：</div>
              <div style="float: left;width: 700px;height:100px;word-wrap:break-word;">
                {{userInfo.description}}
              </div>
            </div>
            <div v-show="isUpdate">
              <el-form-item label="简介" prop="description" style="margin-top: -50px">
                <el-input type="textarea" v-model="description = userInfo.description" maxlength="255" rows="6"
                          show-word-limit style="width: 700px;margin-left: 10px"></el-input>
              </el-form-item>
            </div>
          </div>
          <br>
        </el-form>
      </div>
      <div align="center" style="clear: both">
        <el-button v-show="!isUpdate" type="success" icon="el-icon-edit" circle plain
                   @click="isUpdate = true"></el-button>
        <el-button v-show="isUpdate" type="success" style="font-size: 13px;margin-top: -30px"
                   size="small"
                   @click="updateAccountInfoHandler">保存
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {updateAccountInfo, updateUniqueId,isUpdateUniqueId} from "@/api/user";
  import {Message, MessageBox} from 'element-ui'

  export default {
    name: "personalCenter",
    data() {
      //自定义唯一ID判断
      var validateUniqueId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('唯一ID不能为空'));
        } else {
          //判断唯一ID是否合法
          callback();
        }
      };
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
        ruleForm: {
          uniqueId: '',
          name: ''
        },
        rules: {
          uniqueId: [
            {validator: validateUniqueId, trigger: 'blur'}
          ],
          name: [
            {validator: validateName, trigger: 'blur'}
          ]
        },
        dialogVisible: false,
        sex: '',
        description: ''
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
    },
    methods: {
      updateAccountInfoHandler() {
        updateAccountInfo({
          id: this.userInfo.id,
          name: this.ruleForm.name,
          sex: this.sex,
          description: this.description
        })
          .then(response => {
            console.log(response);
            this.isUpdate = false
          })
      },
      showUpdateUniqueId() {
        isUpdateUniqueId(this.userInfo.id).then(response => {
          if(response.statusCode === 200)
            this.dialogVisible = true
        })

      },
      updateUniqueIdHandler() {
        updateUniqueId({
          id: this.userInfo.id,
          uniqueId: this.ruleForm.uniqueId
        })
          .then(response => {
            console.log(response);
            this.dialogVisible = false
            Message({
              message: '修改成功',
              type: 'success',
              center: true,
              offset: 70,
              duration: 2 * 1000
            })

          })
      }
    }
  }
</script>

<style scoped>

</style>
