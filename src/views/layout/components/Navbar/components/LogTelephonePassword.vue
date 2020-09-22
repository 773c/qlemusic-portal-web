<template>
  <!--账号登录-->
  <div class="tabs-log-content">
    <label for="username" class="tabs-label">账号</label><br>
    <input type="text" v-model="logTelephone" id="username" class="tabs-username tabs-input" placeholder="请输入手机号"><br><br>
    <label for="password" class="tabs-label">密码</label><br>
    <input type="text" v-model="password" id="password" class="tabs-password tabs-input" placeholder="请输入密码"><br><br>
    <el-row style="margin-top:10px;">
    </el-row>
    <br><br>
    <el-button class="tabs-log-button" type="danger" round @click="telPwdLogBtonHandler" :disabled="logBtonShow">登录
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

  export default {
    name: "logTelephonePassword",
    props:{
    },
    data(){
      return {
        logTelephone:'',
        password:'',
      }
    },
    computed:{
      logBtonShow(){
        if(this.logTelephone !== "" && this.password !== "")
          return false;
        else
          return true;
      }
    },
    methods:{
      connectqqHandler() {
        QC.Login.showPopup({
          appId: "101903191",
          redirectURI: "http://www.eiqle.com/portal/connectqq"
        })
        // QC.Login({
        //   btnId:"qqLogin"	//插入按钮的节点id
        // });
      },
      regClickHandler() {
        this.$emit("regClickHandler")
      },
      telPwdLogBtonHandler(){
        this.$store.dispatch('Login',{telephone:this.logTelephone,password:this.password}).then(response => {
          console.log(response);
        })
      }
    }
  }
</script>

<style scoped>

</style>
