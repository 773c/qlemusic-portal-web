<template>
  <el-dialog
    :visible.sync="innerVisible"
    class="el-dialog-user"
    width="435px"
    @closed="setDialogVisible"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :close-on-press-escape="false">
    <div slot="title" class="el-dialog-title">
      <slot name="title">
        <svg-icon icon-class="dialog-user"></svg-icon>
      </slot>
    </div>
    <!--登录-->
    <div v-show="isShowLogin" class="el-dialog-tabs" v-loading="loading">
      <!--登录方式-->
      <div class="tabs-title" @click="AccountLogHandler" >
        <slot name="log-way-one">账号登录</slot>
      </div>
      <div class="tabs-title" @click="VerifyLogHandler">
        <slot name="log-way-two">手机验证码</slot>
      </div>
      <!--登录内容-->
      <div class="tabs-content">
        <slot name="log-content"></slot>
      </div>
    </div>
    <!--注册-->
    <div class="el-dialog-tabs el-dialog-tabs-reg" v-show="!isShowLogin">
      <!--注册标题-->
      <div class="reg-tabs-title">
        <slot name="reg-title">新用户注册</slot>
      </div>
      <!--注册内容-->
      <div class="tabs-content">
        <slot name="reg-content"></slot>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "loginRegister",
    props: {
      dialogVisible: {
        type: Boolean
      },
      isShowLogin: {
        type: Boolean,
        default: true
      },
      loading:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        closeDialog:true,
        title: '登录',
        isLogin: true,
      };
    },
    computed: {
      //窗口可见
      innerVisible:{
        get(){
          if(this.closeDialog)
            return this.dialogVisible
          else
            return false
        },
        set(show){
          this.closeDialog = show
        }
      },
      //验证码样式
      verifyBtonStyle() {
        return {
          backgroundColor: '#fe0000',
          color: '#ffffff'
        }
      },
      isPassing: {
        set(value) {
          return value
        },
        get() {
          return false
        }
      },
      CountDown() {
        if (this.second === 0) {
          return "发送验证码"
        } else if (this.isSendSuccess) {
          return this.second + "s 后重新发送"
        } else {
          return "发送验证码"
        }
      },
      isShowStyle() {
        if (this.regTelephone === '')
          return ''
        else if (this.isSendSuccess === true)
          return ''
        else
          return this.verifyBtonStyle
      },
      isDisabled() {
        if (this.regTelephone === '')
          return true
        else if (this.isSendSuccess === true)
          return true
        else
          return false
      }
    },
    methods: {
      //切换账号密码登录
      AccountLogHandler() {
        this.$emit("AccountLogHandler")
      },
      //切换验证码登录
      VerifyLogHandler() {
        this.$emit("VerifyLogHandler")
      },
      //设置窗口可见（有BUG，父组件也需要设置一下）
      setDialogVisible(){
        this.closeDialog = true
        this.$emit("setDialogVisible")
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-dialog-user {
    .el-dialog-title {
      position: absolute;
      top: 15px;
      left: 20px;
      height: 36px;
      width: 36px;
      cursor: pointer;
    }
    .el-dialog-tabs {
      padding-left: 47px;
      height: 370px;
      width: 400px;
      .tabs-title {
        display: inline-block;
        width: 140px;
        font-weight: bold;
        font-size: 19px;
        color: #fe0000;
        cursor: pointer;
      }
      .tabs-content {
        margin-top: 20px;
      }
    }
  }

  .el-dialog-tabs-reg {
    .reg-tabs-title {
      display: inline-block;
      width: 140px;
      font-weight: bold;
      color: #fe0000;
      font-size: 19px;
    }
  }
</style>
