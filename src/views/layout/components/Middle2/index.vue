<template>
  <div id="middle2">
    <!--背景封面-->
    <div class="head-bg-wrapper">
      <div class="personal-avatar-warpper">
        <el-avatar :size=95 :src="userInfo.headIcon"></el-avatar>
        <div class="music-age" align="center">乐龄2年</div>
      </div>
      <div class="personal-name-warpper">
        @eiqle
      </div>
    </div>
    <!--信息内容-->
    <div class="personal-content-wrapper">
      <!--导航栏-->
      <left2></left2>
      <!--内容-->
      <right2></right2>
    </div>
  </div>
</template>

<script>
  import Left2 from './components/Left2'
  import Right2 from './components/Right2'
  import {mapGetters} from 'vuex'

  export default {
    name: "index",
    components:{
      Left2,
      Right2
    },
    data(){
      return{

      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
    }
  }
</script>

<style scoped>

</style>
