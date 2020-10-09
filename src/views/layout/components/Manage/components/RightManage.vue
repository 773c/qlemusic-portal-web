<template>
  <div id="right-manage">
    <el-card class="right-manage-card" shadow="nerver">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "rightManage"
  }
</script>

<style scoped>

</style>
