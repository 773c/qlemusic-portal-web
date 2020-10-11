<template>
  <div id="right3">
    <!--个人信息-->
    <div class="bbs-music-user-info-wrapper">
      <el-card class="bbs-music-user-info-card">
        <div class="user-info-one-wrapper">
          <div class="user-info-avatar-wrapper">
            <el-avatar :size=52 :src="userInfo.headIcon"></el-avatar>
          </div>
          <div class="user-info-name-wrapper">
            {{userInfo.name}}
          </div>
          <div class="user-info-age-wrapper">
            <el-tag type="info" size="mini" effect="plain">乐龄1年</el-tag>
          </div>
        </div>
        <div class="user-info-two-wrapper">
          <div class="seeNum">
            <div class="num">9</div>
            <div class="see-text">
              <el-tag type="info" size="small" effect="plain">访问</el-tag>
            </div>
          </div>
          <div class="fanNum">
            <div class="num">93</div>
            <div class="fan-text">
              <el-tag type="info" size="small" effect="plain">粉丝</el-tag>
            </div>
          </div>
          <div class="likeNum">
            <div class="num">210</div>
            <div class="like-text">
              <el-tag type="info" size="small" effect="plain">获赞</el-tag>
            </div>
          </div>
          <div class="commentNum">
            <div class="num">19</div>
            <div class="comment-text">
              <el-tag type="info" size="small" effect="plain">评论</el-tag>
            </div>
          </div>
          <div class="collectNum">
            <div class="num">20</div>
            <div class="collect-text">
              <el-tag type="info" size="small" effect="plain">收藏</el-tag>
            </div>
          </div>
        </div>
        <div class="user-info-three-wrapper">
          <el-button plain style="font-size: 14px;padding: 6px 15px">TA的主页</el-button>
          <el-button plain style="font-size: 14px;padding: 6px 13px">私信</el-button>
          <el-button type="danger" style="font-size: 14px;padding: 6px 20px">关注</el-button>
        </div>
      </el-card>
    </div>
    <!--热门音乐-->
    <div class="bbs-music-hot-wrapper">
      <el-card class="bbs-music-hot-card" body-style="padding-top:10px">
        <div class="title">
          <span>热门音乐</span>
          <img class="title-img" src="@/assets/images/flow1.png" width="48" height="40">
        </div>
        <div class="hot-content">

        </div>
      </el-card>
    </div>
    <!--最新音乐-->
    <div class="bbs-music-new-wrapper">
      <el-card class="bbs-music-new-card">
        <div class="title">
          <span>最新音乐</span>
          <img class="title-img" src="@/assets/images/flow1.png" width="48" height="40">
        </div>
        hhh <br>
        hhh <br>
        hhh <br>
        hhh <br>
        hhh <br>
        hhh <br>
        hhh <br>
        hhh <br>
        hhh <br>
        hhh <br>
      </el-card>
    </div>
    <!--音乐分类-->
    <div class="bbs-music-sort-wrapper">
      <el-card class="bbs-music-sort-card">
        <div class="title">
          <span>音乐分类</span>
          <img class="title-img" src="@/assets/images/flow1.png" width="48" height="40">
        </div>
        hhh <br>
        hhh <br>
        hhh <br>
        hhh <br>
        hhh <br>
        hhh <br>
        hhh <br>
        hhh <br>
        hhh <br>
        hhh <br>
      </el-card>
    </div>

  </div>
</template>

<script>
  export default {
    name: "right3",
    props:{
      userInfo:Object
    }
  }
</script>

<style scoped>

</style>
