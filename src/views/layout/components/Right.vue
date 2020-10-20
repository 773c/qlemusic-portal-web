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
            <img src="@/assets/images/2.jpg" width="65" height="50">
          </div>
          <div class="hrnmc-title">嘻哈诗人Jony J，带你一起欣赏他</div>
        </div>
      </div>
    </el-card>
    <el-card class="home-right-release-card" body-style="color:#000;padding-top:10px">
      <div slot="header" class="clearfix">
        <div class="div-embellish"></div>
        <span style="margin-left: 5px;color: white">推荐发布人</span>
        <el-button class="right-button" plain>查看更多</el-button>
      </div>
      <div class="home-right-content-wrapper">
        <div class="hrrc-wrapper">
          <div class="hrrc-avatar-wrapper">
            <el-avatar :size=48 src="http://www.eiqle.com/img/ficon108.png"></el-avatar>
          </div>
          <div class="hrrc-info-wrapper">
            <div class="hrrci-name-wrapper">
              <div class="hrrci-name">@Eiqle官方</div>
              <div class="hrrci-img">
                <img src="@/assets/images/authentication.png" width="20" height="20">
              </div>
            </div>
            <div class="hrrci-honor">
            </div>
          </div>
        </div>
        <div class="hrrc-wrapper">
          <div class="hrrc-avatar-wrapper">
            <el-avatar :size=48 src="http://www.eiqle.com/img/default-avatar.png"></el-avatar>
          </div>
          <div class="hrrc-info-wrapper">
            <div class="hrrci-name-wrapper">
              <div class="hrrci-name">南方姑娘</div>
              <div class="hrrci-img">
                <img src="@/assets/images/authentication.png" width="20" height="20">
              </div>
            </div>
            <div class="hrrci-honor">
            </div>
          </div>
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
    <el-card class="right-hot-official-card">
      <div class="left-manage-footer-wrapper">
        <div class="left-manage-footer" style="color: #999999;font-size: 13px">
          <div>版权归个人方所有 @2019-2020</div>
          <br>
          <div><svg-icon icon-class="footer-name" style="width: 17px"></svg-icon> 姓名：@eiqle</div>
          <br>
          <div><svg-icon icon-class="footer-qq" style="width: 18px"></svg-icon> 合作QQ ：1078216013</div>
          <br>
          <div><svg-icon icon-class="footer-email" style="width: 18.5px;margin-left: 1px"></svg-icon> 邮箱 ：1078216013@qq.com</div>
          <br>
          <div><svg-icon icon-class="footer-weixin" style="width: 18px;margin-left: 2px"></svg-icon> weixin：</div>
          <div class="left-manage-wx-qrcode" style="text-align: center">
            <img src="@/assets/images/wx-user-img.png" width="160" height="160">
          </div>
        </div>
      </div>
    </el-card>
    <!--<el-card class="right-hot-author" body-style="color:#000;" style="margin-top: 10px">-->
      <!--<div slot="header" class="clearfix">-->
        <!--<div class="div-embellish"></div>-->
        <!--<span style="margin-left: 5px;color: white">热门音乐人</span>-->
        <!--<el-button class="right-button" plain>查看更多</el-button>-->
      <!--</div>-->
      <!--<div>-->
        <!--asdasdasd <br>-->
        <!--asdasdasd <br>-->
        <!--asdasdasd <br>-->
        <!--asdasdasd <br>-->
        <!--asdasdasd <br>-->
        <!--asdasdasd <br>-->
        <!--asdasdasd <br>-->
      <!--</div>-->
    <!--</el-card>-->
  </div>
</template>

<script>
  export default {
    name: "right",
  }
</script>

<style lang="scss" scoped>
</style>
