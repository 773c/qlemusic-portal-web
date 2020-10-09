<template>
  <common-navbar :isUserFormat="isUserFormat">
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
        <el-dropdown-menu class="collect-dropdown" slot="dropdown" style="margin-left: 6px;width: 126px">
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
        <el-dropdown-menu class="info-dropdown" slot="dropdown" style="margin-left: 6px;width: 126px">
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
        :dialogVisible="dialogVisible"
        :isShowLogin="isShowLogin"
        :loading="loading"
        @setDialogVisible="setDialogVisible"
        @AccountLogHandler="isShowAccPwdLogin = true"
        @VerifyLogHandler="isShowAccPwdLogin = false">
        <template #log-content>
          <!--账号密码登录页面-->
          <log-telephone-password
            v-show="isShowAccPwdLogin"
            @setDialogVisible="setDialogVisible"
            @openLoading="openLoading"
            @regClickHandler="isShowLogin = false">
          </log-telephone-password>
          <!--手机号验证码登录页面-->
          <log-telephone
            v-show="!isShowAccPwdLogin"
            @setDialogVisible="setDialogVisible"
            @regClickHandler="isShowLogin = false">
          </log-telephone>
        </template>
        <template #reg-content>
          <reg-telephone
            @returnLogClick="isShowLogin = true"
            @setDialogVisible="setDialogVisible">
          </reg-telephone>
        </template>
      </login-register>
      <div v-if="!isLogin">
        <el-dropdown class="avatar-container">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="userInfo.headIcon">
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown" style="width: 126px">
            <div @click="clickForward('/usr/personal',false)">
              <el-dropdown-item>
                <i class="el-icon-user"></i>个人中心
              </el-dropdown-item>
            </div>
            <div @click="clickForward('/usr/collect',false)">
              <el-dropdown-item>
                <i class="el-icon-star-off"></i>我的收藏
              </el-dropdown-item>
            </div>
            <div @click="clickForward('/',false)">
              <el-dropdown-item>
                <i class="el-icon-circle-plus-outline"></i>我的关注
              </el-dropdown-item>
            </div>
            <div @click="clickForward('/',false)">
              <el-dropdown-item>
                <i class="el-icon-setting"></i>账号设置
              </el-dropdown-item>
            </div>
            <div @click="clickForward(userInfo.uniqueId,true)">
              <el-dropdown-item divided>
                <i class="el-icon-service"></i>我的音乐
              </el-dropdown-item>
            </div>
            <div @click="clickForward('/manage/home',false)">
              <el-dropdown-item>
                <i class="el-icon-aim"></i>管理音乐
              </el-dropdown-item>
            </div>
            <div @click="clickForward('',false)">
              <el-dropdown-item>
                <i class="el-icon-download"></i>我的下载
              </el-dropdown-item>
            </div>
            <el-dropdown-item divided>
              <div @click="logoutHandler"><i class="el-icon-switch-button"></i>退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
  import {mapGetters} from 'vuex'

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
    props: {
      isUserFormat: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        title: '登录',
        dialogVisible: false,
        isShowAccPwdLogin: true,
        isShowLogin: true,
        loading: false,
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
      isLogin() {
        if (this.$store.state.user.token)
          return false;
        else
          return true;
      }
    },
    methods: {
      setDialogVisible() {
        this.dialogVisible = false
      },
      logoutHandler() {
        this.$store.dispatch('Logout')
      },
      openLoading(value) {
        this.loading = value
      },
      clickForward(path, flag) {
        let routeUrl = null
        if (flag) {
          routeUrl = this.$router.resolve({
            path: path,
            query: {id: this.userInfo.id}
          })
        }else {
          routeUrl = this.$router.resolve({
            path: path
          })
        }
        if (this.$route.meta.isLevel === routeUrl.resolved.meta.isLevel) {
          window.open(routeUrl.href, '_self');
        } else {
          window.open(routeUrl.href, '_blank');
        }
      }
    }
  }
</script>

<style scoped>

</style>
