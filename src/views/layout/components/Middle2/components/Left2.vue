<template>
  <div class="personal-content-nav">
    <el-card class="box-card">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        style="border-right:none">
        <router-link class="personal-router-link" to="/usr/personal">
          <el-menu-item index="/usr/personal">
            <i class="el-icon-edit"></i>
            <span>个人资料</span>
          </el-menu-item>
        </router-link>
        <router-link class="personal-router-link" to="/usr/collect">
          <el-menu-item index="/usr/collect">
            <i class="el-icon-star-off"></i>
            <span>我的收藏</span>
          </el-menu-item>
        </router-link>
        <router-link class="personal-router-link" to="/">
          <el-menu-item index="/home">
            <i class="el-icon-user"></i>
            <span>我关注的人</span>
          </el-menu-item>
        </router-link>
        <router-link class="personal-router-link" to="/">
          <el-menu-item index="/home">
            <i class="el-icon-magic-stick"></i>
            <span>我的粉丝</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "left"
  }
</script>

<style scoped>

</style>
