<template>
  <div id="manage">
    <!--信息内容-->
    <div class="manage-content-wrapper">
      <!--左边导航-->
      <left-manage></left-manage>
      <!--右边内容-->
      <right-manage></right-manage>
    </div>
  </div>
</template>

<script>
  import LeftManage from './components/LeftManage'
  import RightManage from './components/RightManage'

  export default {
    name: "manage",
    components: {
      LeftManage,
      RightManage
    }
  }
</script>

<style scoped>

</style>
