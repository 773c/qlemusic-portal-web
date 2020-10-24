<template>
  <div id="left-msg">
    <el-card class="left-msg-card" shadow="never">
      <el-menu
        :default-active="$route.path"
        :router="true"
        style="border-right:none;width: 210px;margin-top: -10px">
        <el-menu-item index="/expectation">
          <i class="el-icon-star-off"></i>
          <span>点赞</span>
        </el-menu-item>
        <el-menu-item index="/msg/comment">
          <i class="el-icon-chat-line-round"></i>
          <span>评论</span>
        </el-menu-item>
        <el-menu-item>
          <i class="el-icon-paperclip"></i>
          <span>关注</span>
        </el-menu-item>
        <el-menu-item index="/expectation">
          <i class="el-icon-message"></i>
          <span>私信</span>
        </el-menu-item>
        <el-menu-item index="/expectation">
          <i class="el-icon-magic-stick"></i>
          <span>问答</span>
        </el-menu-item>
        <el-menu-item index="/expectation">
          <i class="el-icon-bell"></i>
          <span>系统通知</span>
        </el-menu-item>
        <el-menu-item index="/expectation">
          <i class="el-icon-setting"></i>
          <span>消息设置</span>
        </el-menu-item>
      </el-menu>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "leftMsg"
  }
</script>

<style scoped>

</style>
