<template>
  <div id="middle">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "middle"
  }
</script>

<style scoped>

</style>
