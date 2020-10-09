<template>
  <div id="left2">
    <el-card class="left2-card" shadow="never">
      <el-menu
        :default-active="$route.path"
        :router="true"
        style="border-right:none;width: 210px;margin-top: -10px">
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
          <i class="el-icon-wallet"></i>
          <span>我的钱包</span>
        </el-menu-item>
        <el-menu-item>
          <i class="el-icon-paperclip"></i>
          <span>我的标签</span>
        </el-menu-item>
        <el-menu-item>
          <i class="el-icon-aim"></i>
          <span>管理音乐</span>
        </el-menu-item>
        <el-menu-item>
          <i class="el-icon-download"></i>
          <span>我的下载</span>
        </el-menu-item>
        <el-menu-item>
          <i class="el-icon-chat-round"></i>
          <span>我的问答</span>
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
    },
    data() {
      return {
      }
    }
  }
</script>

<style scoped>

</style>
