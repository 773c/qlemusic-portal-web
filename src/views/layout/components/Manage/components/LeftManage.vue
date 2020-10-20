<template>
  <div id="left-manage">
    <el-card class="left-manage-card" shadow="nerver" :body-style="{padding:'25px 0'}">
      <div class="release-button-wrapper">
        <el-button class="release-button" type="danger" @click="releaseOpen">发布歌曲</el-button>
      </div>
      <div class="left-manage-nav-wrapper">
        <el-menu
          :default-active="$route.path"
          :router="true"
          style="border-right:none;width: 250px;margin-top: 20px;">
          <el-menu-item index="/manage/home">
            <i class="el-icon-house"></i>
            <span style="font-size: 16px;font-weight: bold;">首页</span>
          </el-menu-item>
          <el-menu-item>
            <div style="border-top: 1px solid #f0f0f0"></div>
            <i class="el-icon-aim"></i>
            <span style="font-size: 16px;font-weight: bold;">综合管理</span>
          </el-menu-item>
          <el-menu-item index="/expectation">
            <i></i>
            <span style="margin-left: 35px">音乐管理</span>
          </el-menu-item>
          <el-menu-item index="/expectation">
            <i></i>
            <span style="margin-left: 35px">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/expectation">
            <i></i>
            <span style="margin-left: 35px">音乐打赏</span>
          </el-menu-item>
          <el-menu-item index="/expectation">
            <i></i>
            <span style="margin-left: 35px">音乐设置</span>
          </el-menu-item>
          <el-menu-item>
            <div style="border-top: 1px solid #f0f0f0"></div>
            <i class="el-icon-download"></i>
            <span style="font-size: 16px;font-weight: bold;">下载管理</span>
          </el-menu-item>
          <el-menu-item index="/expectation">
            <i></i>
            <span style="margin-left: 35px">上传资源</span>
          </el-menu-item>
          <el-menu-item index="/expectation">
            <i></i>
            <span style="margin-left: 35px">上传明细</span>
          </el-menu-item>
          <el-menu-item index="/expectation">
            <i></i>
            <span style="margin-left: 35px">积分明细</span>
          </el-menu-item>
          <el-menu-item index="/expectation">
            <i></i>
            <span style="margin-left: 35px">下载明细</span>
            <div style="border-top: 1px solid #f0f0f0"></div>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="left-manage-footer-wrapper">
        <div class="left-manage-footer">
          <div>版权归个人方所有 @2019-2020</div>
          <br>
          <div><svg-icon icon-class="footer-name" style="width: 17px"></svg-icon> 姓名：@eiqle</div>
          <br>
          <div><svg-icon icon-class="footer-qq" style="width: 18px"></svg-icon> 合作QQ：1078216013</div>
          <br>
          <div>
            <svg-icon icon-class="footer-email" style="width: 18.5px;"></svg-icon> 邮箱：1078216013@qq.com
          </div>
          <br>
          <div><svg-icon icon-class="footer-weixin" style="width: 18px"></svg-icon> weixin：</div>
          <div class="left-manage-wx-qrcode">
            <img src="@/assets/images/wx-user-img.png" width="160" height="160">
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "leftManage",
    data() {
      return {

      }
    },
    methods:{
      //发布作品跳转
      releaseOpen(){
        this.$router.push('/manage/edit')
      }
    }
  }
</script>

<style scoped>

</style>
