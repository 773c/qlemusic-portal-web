<template>
  <div id="right-msg">
    <el-card
      class="right-msg-card"
      :body-style="device === 'mobile'?{padding:0}:''"
      shadow="never">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "rightMsg",
    computed:{
      device() {
        return this.$store.state.app.device
      }
    }
  }
</script>

<style scoped>

</style>
