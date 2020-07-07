<template>
  <common-navbar>
    <template #logo>
      <a class="a-logo" href="/"><img class="img-logo" src="@/assets/images/flogo.png" width="70" height="68"></a>
    </template>
    <template #one>
      <router-link class="nav-router-link" to="/">
        <el-menu-item index="/home">
          <span>黑怕家园</span>
        </el-menu-item>
      </router-link>
    </template>
    <template #two>
      <router-link class="nav-router-link" to="/nav/download">
        <el-menu-item index="/nav/download">
          <span>下载</span>
        </el-menu-item>
      </router-link>
    </template>
    <template #three>
      <router-link class="nav-router-link" to="/nav/question">
        <el-menu-item index="/nav/question">
          <span>问题</span>
        </el-menu-item>
      </router-link>
    </template>
    <!--收藏-->
    <template #after-one>
      <el-dropdown class="collect-container">
        <div class="collect-wrapper">
          <svg-icon class="svg-collect" icon-class="nav-collect"></svg-icon>
        </div>
        <el-dropdown-menu class="collect-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <!--消息-->
    <template #after-two>
      <el-dropdown class="info-container">
        <div class="info-wrapper">
          <svg-icon class="svg-info" icon-class="nav-info"></svg-icon>
        </div>
        <el-dropdown-menu class="info-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <!--用户信息-->
    <template #user>
      <el-dropdown class="avatar-container">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar">
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              我的收藏
            </el-dropdown-item>
          </router-link>
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              我的关注
            </el-dropdown-item>
          </router-link>
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              账号设置
            </el-dropdown-item>
          </router-link>
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item divided>
              我的动态
            </el-dropdown-item>
          </router-link>
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              我的下载
            </el-dropdown-item>
          </router-link>
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item divided>
              退出
            </el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
  </common-navbar>
</template>

<script>
  import CommonNavbar from '@/components/Navbar'

  export default {
    name: "navbar",
    data() {
      return {}
    },
    components: {
      CommonNavbar
    }
  }
</script>

<style scoped>

</style>
