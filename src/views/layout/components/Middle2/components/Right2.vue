<template>
  <div id="right2">
    <el-card
      class="personal-card"
      style="border-radius: 0;height: 808px;"
      :body-style="$route.name==='set'?{paddingLeft:0,paddingRight:0}:''"
      shadow="never">
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
