<template>
  <div id="right-msg">
    <el-card
      class="box-card"
      style="border-radius: 0;height: 808px;"
      shadow="never">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-card>
    <div style="width:955px;height: 20px;background-color: white;position: absolute;top: 873px;left: 403px"></div>
  </div>
</template>

<script>
  export default {
    name: "rightMsg"
  }
</script>

<style scoped>

</style>
