<template>
  <div id="left3">
    <el-card class="box-card" :body-style="{ padding: '0px' }">
      <transition name="fade" mode="out-in">
        <router-view @setCount="setCount"></router-view>
      </transition>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "left3",
    methods:{
      setCount(musicOperation){
        this.$emit('setCount',musicOperation)
      }
    }
  }
</script>

<style scoped>

</style>
