<template>
  <div class="app-container">
    <el-col :span="12">
      <img :src="img_404" alt="404" class="img-style">
    </el-col>
    <el-col :span="12">
      <div style="margin-left: 100px;margin-top: 60px">
        <h1 class="color-main">OOPS!</h1>
        <h2 style="color: #555555">很抱歉，页面它不小心迷路了！</h2>
        <div style="color:#909399;font-size: 14px;margin-top: 10px">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
        <el-button style="margin-top: 30px;background-color: #FE0000" type="danger" round @click="handleGoMain">返回首页
        </el-button>
      </div>
    </el-col>
  </div>
</template>

<script>
  import img_404 from '@/assets/images/gif_404.gif';

  export default {
    name: 'errorPage',
    data() {
      return {
        img_404
      }
    },
    methods: {
      handleGoMain() {
        this.$router.push({path: '/'})
      }
    },
  }
</script>

<style lang="scss" scoped>
  .app-container {
    width: 80%;
    margin-left: 200px;
    padding-top: 150px;
  }

  .img-style {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .color-main {
    color: #2b333f;
  }

</style>
