<template>
  <div class="main-wrapper" :class="classObj">
    <!--导航栏-->
    <navbar class="navbar-wrapper" :isUserFormat="format"></navbar>
    <!--导航栏背景图-->
    <div class="nav-bg-wrapper"></div>
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
      <div v-else="formatArr[2]" style="width: 100%">
        <div class="content-middle-three">
          <middle3></middle3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Middle, Right, Navbar, Middle2, Middle3} from "./index";
  import ResizeMixin from './mixin/ResizeHandler'

  export default {
    name: "layout",
    components: {
      Navbar,
      Middle,
      Right,
      Middle2,
      Middle3
    },
    data() {
      return {
        formatArr: [true, false, false]
      }
    },
    mixins: [ResizeMixin],
    computed: {
      device() {
        console.log(this.$store.state.app.device);
        return this.$store.state.app.device
      },
      classObj() {
        return {
          mobile: this.device === 'mobile'
        }
      },
      format() {
        if (this.$route.path.indexOf("/usr") != -1) {
          this.formatArr[1] = true
          this.formatArr[0] = false
          this.formatArr[2] = false
          return true
        } else if (this.$route.path.indexOf("aaa") != -1){
          this.formatArr[2] = true
          this.formatArr[0] = false
          this.formatArr[1] = false
          return true
        }
      }
    }
  }
</script>

<style scoped>
</style>
