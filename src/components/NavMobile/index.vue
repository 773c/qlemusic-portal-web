<template>
  <div id="nav-mobile">
    <el-drawer
      title="个人中心"
      class="nav-mobile-drawer"
      :visible.sync="drawer"
      :modal="false"
      direction="ltr"
      :show-close="true"
      :size="'60%'"
      :withHeader="true"
      @close="drawerCloseTrigger">
      <div class="nav-mobile-content-wrapper">
        <slot name="navMobileContent"></slot>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: "navMobile",
    props:{
      drawer:true
    },
    data(){
      return {

      }
    },
    methods:{
      drawerCloseTrigger(){}
    }
  }
</script>

<style lang="scss" scoped>
  #nav-mobile{
    .nav-mobile-drawer{
      .el-drawer__header {
        font-size: 15px;
        font-weight: bold;
        color: black;
      }
    }
  }
</style>
