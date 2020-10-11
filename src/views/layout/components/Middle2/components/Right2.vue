<template>
  <div id="right2">
    <!--<div style="height: 200px"></div>-->
    <el-card class="box-card" style="border-radius: 0" shadow="never">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "right2"
  }
</script>

<style scoped>

</style>
