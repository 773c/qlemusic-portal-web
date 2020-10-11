<template>
  <div id="right">
    <!--热门说唱音乐人-->
    <el-card class="home-right-new-message-card" body-style="color:#000;padding-top:10px">
      <div slot="header" class="clearfix">
        <div class="div-embellish"></div>
        <span style="margin-left: 5px;color: white">最新消息</span>
        <el-button class="right-button" plain>查看更多</el-button>
      </div>
      <div class="home-right-content-wrapper">
        <div class="hrnmc-wrapper">
          <div class="hrnmc-img">
            <img src="@/assets/images/1.jpg" width="65" height="50">
          </div>
          <div class="hrnmc-title">当黄子韬遇上diss他的人（ty）</div>
        </div>
        <div class="hrnmc-wrapper">
          <div class="hrnmc-img">
            <img src="@/assets/images/bg2.jpg" width="65" height="50">
          </div>
          <div class="hrnmc-title">GAI为什么嘴巴老是歪歪的</div>
        </div>
      </div>
    </el-card>
    <el-card class="home-right-author-card" body-style="color:#000;padding-top:10px">
      <div slot="header" class="clearfix">
        <div class="div-embellish"></div>
        <span style="margin-left: 5px;color: white">音乐人</span>
        <el-button class="right-button" plain>查看更多</el-button>
      </div>
      <div class="home-right-content-wrapper">
        <div class="hrac-wrapper">
          <div class="hrac-avatar-wrapper">
            <el-avatar :size=48 src="http://www.eiqle.com/img/default-avatar.png"></el-avatar>
          </div>
          <div class="hrac-info-wrapper">
            <div class="hi-name-wrapper">
              <div class="hi-name">周杰伦</div>
              <div class="hi-img">
                <img src="@/assets/images/authentication.png" width="20" height="20">
              </div>
            </div>
            <div class="hi-honor">
            </div>
          </div>
        </div>
        <div class="hrac-wrapper">
          <div class="hrac-avatar-wrapper">
            <el-avatar :size=48 src="http://www.eiqle.com/img/default-avatar.png"></el-avatar>
          </div>
          <div class="hrac-info-wrapper">
            <div class="hi-name-wrapper">
              <div class="hi-name">华晨宇</div>
              <div class="hi-img">
                <img src="@/assets/images/authentication.png" width="20" height="20">
              </div>
            </div>
            <div class="hi-honor">
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="right-hot-author" body-style="color:#000;" style="margin-top: 10px">
      <div slot="header" class="clearfix">
        <div class="div-embellish"></div>
        <span style="margin-left: 5px;color: white">热门音乐人</span>
        <el-button class="right-button" plain>查看更多</el-button>
      </div>
      <div>
        asdasdasd <br>
        asdasdasd <br>
        asdasdasd <br>
        asdasdasd <br>
        asdasdasd <br>
        asdasdasd <br>
        asdasdasd <br>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "right",
  }
</script>

<style lang="scss" scoped>
</style>
