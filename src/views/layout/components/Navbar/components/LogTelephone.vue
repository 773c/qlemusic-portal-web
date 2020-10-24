<template>
  <!--手机号登录-->
  <div class="tabs-tel-content">
    <label class="tabs-label">手机号</label>
    <br>
    <el-input type="text" v-model="logTelephone" class="tabs-telephone tabs-input" placeholder="  请输入手机号">
      <el-select v-model="select" slot="prepend">
        <el-option v-for="item in region"
                   :key="item.name"
                   :label="item.label"
                   :value="item.value">
          <span style="float: left;margin-left: -10px">{{ item.label }}</span>
          <span
            style="float: right;margin: 0 -10px 0 10px;color: #8492a6; font-size: 13px">{{ item.name }}</span>
        </el-option>
      </el-select>
    </el-input>
    <br><br>
    <label for="verify" class="tabs-label">验证码</label><br>
    <input type="text" v-model="logVerify" id="verify" class="tabs-verify tabs-input" placeholder="  请输入验证码">
    <verify-button
      :telephone="logTelephone"
      :isSendSuccessTo="isSendSuccess"
      @setSendSuccessStatus="setSendSuccessStatus">
    </verify-button>
    <br><br>
    <el-row style="margin-top:10px;">
      <drag-verify
        ref="dragVerify"
        :width="300"
        :height="40"
        progressBarBg="#76c61d"
        background="#F5F5F5"
        :isPassing.sync="isPassing"
        text="请按住滑块拖动"
        successText="验证通过"
        handlerIcon="el-icon-d-arrow-right"
        successIcon="el-icon-circle-check"
        @passcallback="passCallBack">
      </drag-verify>
    </el-row>
    <br><br>
    <el-button class="tabs-log-button" type="danger" round @click="telVefLogBtonHandler" :disabled="btonShow">登录
    </el-button>
    <br><br>
    <el-row class="tabs-reg-forget">
      <el-col :span="17">
        <div class="tabs-reg" @click="regClickHandler()">注册</div>
      </el-col>
      <el-col :span="7">
        <a href="#" @click="regClickHandler()">联系客服</a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import DragVerify from '@/components/DragVerify'
  import {login} from "@/api/login";
  import VerifyButton from '@/components/VerifyButton'

  export default {
    name: "logTelephone",
    components: {
      DragVerify,
      VerifyButton
    },
    data() {
      return {
        logTelephone: '',
        logVerify: '',
        isSendSuccess: false,
        btonShow: true,
        select: '86',
        region: [{
          value: '86',
          label: '+ 86',
          name: '中国'
        }, {
          value: '1',
          label: '+ 1',
          name: '美国'
        }, {
          value: '1',
          label: '+ 1',
          name: '加拿大'
        }, {
          value: '852',
          label: '+ 852',
          name: '中国香港'
        }, {
          value: '886',
          label: '+ 886',
          name: '中国台湾'
        }, {
          value: '81',
          label: '+ 81',
          name: '日本'
        },
          {
            value: '65',
            label: '+ 65',
            name: '新加坡'
          }],
      }
    },
    computed: {
      isPassing: {
        set(value) {
          return value
        },
        get() {
          return false
        }
      }
    },
    methods: {
      //验证码登录注册按钮
      regClickHandler() {
        this.$emit("regClickHandler")
      },
      //验证码登录按钮
      telVefLogBtonHandler() {
        const load = this.$loading({
          lock: true,
          background: 'rgba(0, 0, 0, 0.1)'
        });
        this.$store.dispatch('Login', {
          telephone: this.logTelephone,
          verify: this.logVerify
        }).then(() => {
          location.reload()
        }).catch(() => {
          load.close()
        })
      },
      //滑块重置
      reset() {
        console.log("重置滑块");
        this.isPassing = false;
        if (this.$refs.dragVerify != undefined) {
          this.$refs.dragVerify.reset();
        }
      },
      //滑块成功调用
      passCallBack() {
        console.log("滑块验证成功走的方法");
        if (this.isSendSuccess)
          this.btonShow = false
        else if (this.logTelephone === '') {
          this.$tip.error('请输入手机号登录')
          setTimeout(() => {
            this.reset()
          }, 2000)
        } else {
          this.$tip.error('请发送验证码')
          setTimeout(() => {
            this.reset()
          }, 2000)
        }
      },
      logTelReset() {
        //手机号重置
        this.logTelephone = ''
        //验证码重置
        this.logVerify = ''
        //发送验证码按钮复原
        this.isSendSuccess = false
        //滑块重置
        this.reset()
      },
      //设置验证码按钮发送状态
      setSendSuccessStatus(status){
        this.isSendSuccess = status
      }
    }
  }
</script>

<style scoped>

</style>
