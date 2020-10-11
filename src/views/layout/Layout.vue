<template>
  <div class="main-wrapper" :class="classObj">
    <!--导航栏-->
    <navbar class="navbar-wrapper" :isUserFormat="format"></navbar>
    <!--导航栏背景图-->
    <div v-if="!format" class="nav-bg-home-wrapper"></div>
    <div v-else class="nav-bg-wrapper"></div>
    <div style="height: 65px"></div>
    <!--内容部分-->
    <div class="content-wrapper">
      <!--风格1-->
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
      <!--风格2-->
      <div v-else-if="formatArr[1]" style="width: 100%">
        <div class="content-middle-two">
          <middle2></middle2>
        </div>
      </div>
      <!--风格3-->
      <div v-else-if="formatArr[2]" style="width: 100%">
        <div class="content-middle-three">
          <middle3></middle3>
        </div>
      </div>
      <!--风格4管理-->
      <div v-else="formatArr[3]" style="width: 100%">
        <div class="content-middle-manage">
          <manage></manage>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Middle, Right, Navbar, Middle2, Middle3,Manage} from "./index";
  import ResizeMixin from './mixin/ResizeHandler'

  export default {
    name: "layout",
    components: {
      Navbar,
      Middle,
      Right,
      Middle2,
      Middle3,
      Manage
    },
    data() {
      return {
        formatArr: [true, false, false,false]
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
        if (this.$route.path.indexOf("usr") != -1) {
          console.log("风格2");
          this.formatArr[1] = true
          this.formatArr[2] = false
          this.formatArr[3] = false
          this.formatArr[0] = false
          return true
        } else if (this.$route.path.indexOf(this.$route.query.uniqueId||this.uniqueId) != -1){
          console.log("风格3");
          this.formatArr[2] = true
          this.formatArr[3] = false
          this.formatArr[0] = false
          this.formatArr[1] = false
          return true
        }else if(this.$route.path.indexOf("manage") != -1) {
          console.log("风格4管理");
          this.formatArr[3] = true
          this.formatArr[0] = false
          this.formatArr[1] = false
          this.formatArr[2] = false
          return true
        }
      }
    }
  }
</script>

<style scoped>
</style>
