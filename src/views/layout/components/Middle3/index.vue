<template>
  <div id="middle3">
    <div class="bbsMusic-title-wrapper">
      <div class="bbsMusic-title">
        {{userInfo.name}} 的音乐空间
      </div>
    </div>
    <!--信息内容-->
    <div class="bbsMusic-content-wrapper">
      <!--内容-->
      <left3></left3>
      <!--个人介绍+热门-->
      <right3 :userInfo="userInfo"></right3>
    </div>
  </div>
</template>

<script>
  import Left3 from './components/Left3'
  import Right3 from './components/Right3'
  import {getUserById} from "@/api/user";

  export default {
    name: "middle3",
    components: {
      Left3,
      Right3
    },
    data(){
      return {
        userInfo:{}
      }
    },
    methods:{
      getUser(){
        getUserById(this.$route.query.id,false).then(response => {
          console.log(response);
          this.userInfo = response.data
        })
      }
    },
    created(){
      this.getUser(0)
    }
  }
</script>

<style scoped>

</style>
