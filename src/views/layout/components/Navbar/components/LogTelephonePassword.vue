<template>
  <!--账号登录-->
  <div class="tabs-log-content">
    <label for="username" class="tabs-label">账号</label><br>
    <input type="text" v-model="logTelephone" id="username" class="tabs-username tabs-input"
           placeholder="  请输入手机号"><br><br>
    <label for="password" class="tabs-label">密码</label><br>
    <input type="text" v-model="password" id="password" class="tabs-password tabs-input" placeholder="  请输入密码"><br><br>
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
    <el-button class="tabs-log-button" type="danger" round @click="telPwdLogBtonHandler" :disabled="logBtonShow" >登录
    </el-button>
    <br><br>
    <el-row class="tabs-reg-forget">
      <el-col :span="17">
        <div class="tabs-reg" @click="regClickHandler()">注册</div>
      </el-col>
      <el-col :span="7">
        <a href="">忘记密码？</a>
      </el-col>
    </el-row>
    <el-row class="tabs-oauth" type="flex" justify="center">
      <el-col :span="3">
        <img id="qqLogin" src="@/assets/images/qq.png" alt="qq" width="32" height="32"
             @click="connectqqHandler">
      </el-col>
      <el-col :span="3">
        <img src="@/assets/images/weixin.png" alt="qq" width="32" height="32">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import DragVerify from '@/components/DragVerify'

  export default {
    name: "logTelephonePassword",
    components:{
      DragVerify
    },
    props: {},
    data() {
      return {
        logTelephone: '',
        password: '',
        isNullTelPwd:true,
      }
    },
    computed: {
      isPassing: {
        set(value) {
          return true
        },
        get() {
          return false
        }
      },
      logBtonShow() {
        if (this.logTelephone !== "" && this.password !== "" && !this.isNullTelPwd)
          return false;
        else
          return true;
      }
    },
    methods: {
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
        if (this.logTelephone === '') {
          this.$tip.error('请输入账号')
          setTimeout(() => {
            this.reset()
          }, 2000)
        } else if (this.password === ''){
          this.$tip.error('请输入密码')
          setTimeout(() => {
            this.reset()
          }, 2000)
        }
        this.isNullTelPwd = false
      },
      connectqqHandler() {
        QC.Login.showPopup({
          appId: "101903191",
          redirectURI: "http://www.eiqle.com/portal/connectqq"
        })
      },
      qqLogin() {
        var that = this; // 先将vue这个对象保存在_self对象中
        console.log("qqLogin");
        console.log(QC.Login.check());
        //检查是否登录
        if (QC.Login.check()) {
          //该处的openId，accessToken就是后台需要的参数了，后台可以通过这些参数获取临时登录凭证，然后就是自己的逻辑了
          QC.Login.getMe(function (openId, accessToken) {
            if (openId != undefined) {
              that.loading = true;
              // 传参给后台进行登录验证
              that.$store.dispatch('LoginByUsername', {
                username: '',
                openId: openId,
                accessToken: accessToken
              }).then(() => {
                that.loading = false;
              }).catch(() => {
                that.loading = false
              })
            }
          });
          console.log('已登录!')
        } else {
          console.log('未登录!')
        }
      },
      regClickHandler() {
        this.$emit("regClickHandler")
      },
      telPwdLogBtonHandler() {
        this.$emit('openLoading',true)
        this.$store.dispatch('Login', {telephone: this.logTelephone, password: this.password}).then(() => {
          this.$store.dispatch('GetInfo').then(response => {
            this.$emit('openLoading',false)
            this.$emit('setDialogVisible')
            console.log(response);
          })
        })
      }
    },
    created() {
      this.qqLogin()
    }
  }
</script>

<style scoped>

</style>
