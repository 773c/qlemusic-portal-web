<template>
  <div id="middle3">
    <div class="bbs-music-name-wrapper">
      <div class="bbsm-name">
        {{userInfo.name}} 音乐空间
      </div>
      <div class="bbsm-img">
        <img src="@/assets/images/bg-my-music1.gif" height="120px">
      </div>
    </div>
    <!--信息内容-->
    <div class="bbs-music-content-wrapper">
      <!--内容-->
      <left3 @setCount="setCount"></left3>
      <!--个人介绍+热门-->
      <right3 :userInfo="userInfo" :musicOperation="musicOperation"></right3>
    </div>
  </div>
</template>

<script>
  import Left3 from './components/Left3'
  import Right3 from './components/Right3'
  import {getUserById} from "@/api/userInfo";

  export default {
    name: "middle3",
    components: {
      Left3,
      Right3
    },
    data(){
      return {
        userInfo:{},
        musicOperation:{}
      }
    },
    methods:{
      getUser(){
        getUserById(this.$route.query.uid,false).then(response => {
          this.userInfo = response.data
        })
      },
      setCount(musicOperation){
        this.musicOperation = musicOperation
      }
    },
    created(){
      this.getUser(0)
    }
  }
</script>

<style scoped>

</style>
