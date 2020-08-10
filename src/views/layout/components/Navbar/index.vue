<template>
  <common-navbar>
    <template #logo>
      <a class="a-logo" href="/"><img class="img-logo" src="@/assets/images/flogo.png" width="70" height="68"></a>
    </template>
    <template #one>
      <router-link class="nav-router-link" to="/">
        <el-menu-item index="/home">
          <span>黑怕家园</span>
        </el-menu-item>
      </router-link>
    </template>
    <template #two>
      <router-link class="nav-router-link" to="/nav/download">
        <el-menu-item index="/nav/download">
          <span>下载</span>
        </el-menu-item>
      </router-link>
    </template>
    <template #three>
      <router-link class="nav-router-link" to="/nav/question">
        <el-menu-item index="/nav/question">
          <span>问题</span>
        </el-menu-item>
      </router-link>
    </template>
    <!--收藏-->
    <template #after-one>
      <el-dropdown class="collect-container">
        <div class="collect-wrapper">
          <svg-icon class="svg-collect" icon-class="nav-collect"></svg-icon>
        </div>
        <el-dropdown-menu class="collect-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <!--消息-->
    <template #after-two>
      <el-dropdown class="info-container">
        <div class="info-wrapper">
          <svg-icon class="svg-info" icon-class="nav-info"></svg-icon>
        </div>
        <el-dropdown-menu class="info-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <!--用户信息-->
    <template #user>
      <div class="login-container" v-if="isLogin" @click="dialogVisible = true">
        登录
      </div>
      <login-register
        :dialogVisible = "dialogVisible"
        :isShowLogin="isShowLogin"
        @setDialogVisible="setDialogVisible"
        @AccountLogHandler="isShowAccPwdLogin = true"
        @VerifyLogHandler="isShowAccPwdLogin = false">
        <template #log-content>
          <!--账号密码登录页面-->
          <log-telephone-password
            v-show="isShowAccPwdLogin"
            @regClickHandler="isShowLogin = false">
          </log-telephone-password>
          <!--手机号验证码登录页面-->
          <log-telephone v-show="!isShowAccPwdLogin">
          </log-telephone>
        </template>
        <template #reg-content>
          <reg-telephone @returnLogClickHandler="isShowLogin = true">
          </reg-telephone>
        </template>
      </login-register>
      <!--<el-dropdown class="avatar-container">-->
      <!--<div class="avatar-wrapper">-->
      <!--<img class="user-avatar" :src="avatar">-->
      <!--</div>-->
      <!--<el-dropdown-menu class="user-dropdown" slot="dropdown">-->
      <!--<router-link class="inlineBlock" to="/">-->
      <!--<el-dropdown-item>-->
      <!--个人中心-->
      <!--</el-dropdown-item>-->
      <!--</router-link>-->
      <!--<router-link class="inlineBlock" to="/">-->
      <!--<el-dropdown-item>-->
      <!--我的收藏-->
      <!--</el-dropdown-item>-->
      <!--</router-link>-->
      <!--<router-link class="inlineBlock" to="/">-->
      <!--<el-dropdown-item>-->
      <!--我的关注-->
      <!--</el-dropdown-item>-->
      <!--</router-link>-->
      <!--<router-link class="inlineBlock" to="/">-->
      <!--<el-dropdown-item>-->
      <!--账号设置-->
      <!--</el-dropdown-item>-->
      <!--</router-link>-->
      <!--<router-link class="inlineBlock" to="/">-->
      <!--<el-dropdown-item divided>-->
      <!--我的动态-->
      <!--</el-dropdown-item>-->
      <!--</router-link>-->
      <!--<router-link class="inlineBlock" to="/">-->
      <!--<el-dropdown-item>-->
      <!--我的下载-->
      <!--</el-dropdown-item>-->
      <!--</router-link>-->
      <!--<router-link class="inlineBlock" to="/">-->
      <!--<el-dropdown-item divided>-->
      <!--退出-->
      <!--</el-dropdown-item>-->
      <!--</router-link>-->
      <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
    </template>
  </common-navbar>
</template>

<script>
  import LoginRegister from '@/components/LoginRegister'
  import LogTelephonePassword from './components/LogTelephonePassword'
  import LogTelephone from './components/LogTelephone'
  import RegTelephone from './components/RegTelephone'
  import SetPassword from './components/RegTelephone/SetPassword'
  import CommonNavbar from '@/components/Navbar'

  export default {
    name: "navbar",
    components: {
      LoginRegister,
      LogTelephonePassword,
      LogTelephone,
      RegTelephone,
      SetPassword,
      CommonNavbar
    },
    data() {
      return {
        title: '登录',
        isLogin: true,
        dialogVisible:false,
        isShowAccPwdLogin: true,
        isShowLogin:true,
      }
    },
    computed: {
    },
    methods: {
      connectqqHandler() {
        QC.Login.showPopup({
          appId: "101894118",
          redirectURI: "http://www.eiqle.com/portal/connectqq"
        })
        // QC.Login({
        //   btnId:"qqLogin"	//插入按钮的节点id
        // });
      },
      accLogBtonHandler() {

      },
      telLogBtonHandler() {

      },
      setDialogVisible(){
        this.dialogVisible = false
      }
    },
  }
</script>

<style scoped>

</style>
