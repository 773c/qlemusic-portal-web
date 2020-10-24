<template>
  <div id="right-manage">
    <el-card class="right-manage-card" shadow="nerver">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-card>
    <div style="width:955px;height: 20px;background-color: white;position: absolute;top: 1023px;left: 403px"></div>
  </div>
</template>

<script>
  export default {
    name: "rightManage"
  }
</script>

<style scoped>

</style>
