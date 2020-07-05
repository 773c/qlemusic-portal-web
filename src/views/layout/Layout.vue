<template>
  <div class="main-wrapper" :class="classObj">
    <!--导航栏-->
    <navbar class="navbar-wrapper"></navbar>
    <!--内容部分-->
    <div class="content-wrapper">
      <!--中间内容-->
      <div class="content-middle">
        <middle></middle>
      </div>
      <!--右侧导航-->
      <div class="content-right">
        <right></right>
      </div>
    </div>
  </div>
</template>

<script>
  import {Middle, Right, Navbar} from "./index";
  import ResizeMixin from './mixin/ResizeHandler'

  export default {
    name: "layout",
    components: {
      Navbar,
      Middle,
      Right
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
      }
    }
  }
</script>

<style scoped>
  @import "../../styles/mixin.scss";

  .main-wrapper {
  @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
