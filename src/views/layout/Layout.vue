<template>
  <div class="main-wrapper" :class="classObj">
    <!--导航栏-->
    <navbar class="navbar-wrapper" :isUserFormat="format"></navbar>
    <!--导航栏背景图-->
    <div v-if="!format" class="nav-bg-home-wrapper"></div>
    <div v-else class="nav-bg-wrapper"></div>
    <div style="height: 65px"></div>
    <!--内容部分-->
    <div class="content-wrapper" >
      <!--首页风格-->
      <div v-if="formatArr[0]" class="content-middle-one">
        <!--中间内容-->
        <div class="content-middle">
          <middle></middle>
        </div>
        <!--右侧导航-->
        <div class="content-right">
          <right></right>
        </div>
      </div>
      <!--用户中心风格-->
      <div v-else-if="formatArr[1]" style="width: 100%">
        <div class="content-middle-two">
          <middle2></middle2>
        </div>
      </div>
      <!--我的音乐风格-->
      <div v-else-if="formatArr[2]" style="width: 100%">
        <div class="content-middle-three">
          <middle3></middle3>
        </div>
      </div>
      <!--空间管理风格-->
      <div v-else-if="formatArr[3]" style="width: 100%">
        <div class="content-middle-manage">
          <manage></manage>
        </div>
      </div>
      <!--消息管理风格-->
      <div v-else="formatArr[4]" style="width: 100%">
        <div class="content-middle-msg">
          <msg></msg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Middle, Right, Navbar, Middle2, Middle3,Manage,Msg} from "./index";
  import ResizeMixin from './mixin/ResizeHandler'

  export default {
    name: "layout",
    components: {
      Navbar,
      Middle,
      Right,
      Middle2,
      Middle3,
      Manage,
      Msg
    },
    data() {
      return {
        formatArr: [true, false, false, false, false]
      }
    },
    mixins: [ResizeMixin],
    computed: {
      device() {
        return this.$store.state.app.device
      },
      uniqueId(){
        return this.$store.state.user.userInfo.uniqueId
      },
      classObj() {
        return {
          mobile: this.device === 'mobile'
        }
      },
      format() {
        if(this.$route.matched[0].path === '/'){
          console.log("风格1");
          this.formatArr[0] = true
          this.formatArr[1] = false
          this.formatArr[2] = false
          this.formatArr[3] = false
          this.formatArr[4] = false
          return false
        } else if (this.$route.matched[0].path === '/usr') {
          console.log("用户中心风格");
          this.formatArr[1] = true
          this.formatArr[2] = false
          this.formatArr[3] = false
          this.formatArr[4] = false
          this.formatArr[0] = false
          return true
        } else if (this.$route.matched[0].path === '/:uniqueId'){
          console.log("我的音乐风格");
          this.formatArr[2] = true
          this.formatArr[3] = false
          this.formatArr[4] = false
          this.formatArr[0] = false
          this.formatArr[1] = false
          return true
        }else if(this.$route.matched[0].path === '/manage') {
          console.log("空间管理风格");
          this.formatArr[3] = true
          this.formatArr[4] = false
          this.formatArr[0] = false
          this.formatArr[1] = false
          this.formatArr[2] = false
          return true
        }else if(this.$route.matched[0].path === '/msg'){
          console.log("消息管理风格");
          this.formatArr[4] = true
          this.formatArr[0] = false
          this.formatArr[1] = false
          this.formatArr[2] = false
          this.formatArr[3] = false
          return false
        }
      }
    },
    methods:{
      sss(){
        this.isShowContent = false
      }
    },
    created(){
    }
  }
</script>

<style scoped>
</style>
