<template>
  <div id="middle3">
    <!--信息内容-->
    <div class="bbsMusic-content-wrapper">
      <!--内容-->
      <left3></left3>
      <!--个人介绍+热门-->
      <right3></right3>
    </div>
  </div>
</template>

<script>
  import Left3 from './components/Left3'
  import Right3 from './components/Right3'

  export default {
    name: "middle3",
    components: {
      Left3,
      Right3
    }
  }
</script>

<style scoped>

</style>
