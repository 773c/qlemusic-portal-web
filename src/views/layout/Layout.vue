<template>
  <div class="main-wrapper" :class="classObj">
    <!--导航栏-->
    <navbar class="navbar-wrapper"></navbar>
    <!--内容部分-->
    <div class="content-wrapper">
      <div v-show="format" style="width: 100%">
        <!--中间内容-->
        <div class="content-middle" >
          <middle></middle>
        </div>
        <!--右侧导航-->
        <div class="content-right">
          <right></right>
        </div>
      </div>
      <div v-show="!format" style="width: 100%">
        <div class="content-middle-two">
          <middle2></middle2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Middle, Right, Navbar, Middle2} from "./index";
  import ResizeMixin from './mixin/ResizeHandler'

  export default {
    name: "layout",
    components: {
      Navbar,
      Middle,
      Right,
      Middle2
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
      format(){
        if(this.$route.path.indexOf("/usr") != -1)
          return false
        else
          return true
      }
    }
  }
</script>

<style scoped>
</style>
