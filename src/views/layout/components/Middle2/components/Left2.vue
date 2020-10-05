<template>
  <div class="personal-content-nav">
    <el-card class="box-card">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :router="true"
        style="border-right:none">
          <el-menu-item index="/usr/personal">
            <i class="el-icon-user"></i>
            <span>个人资料</span>
          </el-menu-item>
          <el-menu-item index="/usr/collect">
            <i class="el-icon-star-off"></i>
            <span>我的收藏</span>
          </el-menu-item>
          <el-menu-item index="/home">
            <i class="el-icon-circle-plus-outline"></i>
            <span>我关注的人</span>
          </el-menu-item>
          <el-menu-item index="/home">
            <i class="el-icon-magic-stick"></i>
            <span>我的粉丝</span>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-service"></i>
            <span>我的音乐</span>
          </el-menu-item>
      </el-menu>
    </el-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "left2",
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
    }
  }
</script>

<style scoped>

</style>
