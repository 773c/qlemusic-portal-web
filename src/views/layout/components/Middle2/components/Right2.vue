<template>
  <div id="right2">
    <!--<div style="height: 200px"></div>-->
    <el-card
      class="box-card"
      style="border-radius: 0;height: 808px;"
      :body-style="$route.name==='set'?{paddingLeft:0,paddingRight:0}:''"
      shadow="never">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-card>
    <div style="width:946px;height: 20px;background-color: white;position: absolute;top: 1073px;left: 403px"></div>
  </div>
</template>

<script>
  export default {
    name: "right2"
  }
</script>

<style scoped>

</style>
