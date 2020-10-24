<template>
  <div id="msg">
    <!--信息内容-->
    <div class="msg-content-wrapper">
      <!--左边导航-->
      <left-msg></left-msg>
      <!--右边内容-->
      <right-msg></right-msg>
    </div>
  </div>
</template>

<script>
  import LeftMsg from './components/LeftMsg'
  import RightMsg from './components/RightMsg'

  export default {
    name: "Msg",
    components:{
      LeftMsg,
      RightMsg
    }
  }
</script>

<style scoped>

</style>
