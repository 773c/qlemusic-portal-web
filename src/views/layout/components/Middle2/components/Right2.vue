<template>
  <div id="right2">
    <el-card class="box-card">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "right"
  }
</script>

<style scoped>

</style>
