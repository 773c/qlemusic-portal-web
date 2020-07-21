<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: "app",
    computed:{
      audio(){
        return this.$store.state.audio.qlaudio
      }
    },
    watch:{
      audio(){
        alert("变化了11")
      }
    }
  }
</script>

<style scoped>

</style>
