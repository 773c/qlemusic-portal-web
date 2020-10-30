<template>
  <div id="right3">
    <!--个人信息-->
    <div class="bbs-music-user-info-wrapper">
      <el-card class="bbs-music-user-info-card" shadow="never">
        <div class="user-info-one-wrapper">
          <div class="user-info-avatar-wrapper">
            <el-avatar :size=52 :src="userInfo.avatar"></el-avatar>
          </div>
          <div class="user-info-name-wrapper">
            {{userInfo.name}}
          </div>
          <div class="user-info-age-wrapper">
            <el-tag type="info" size="mini" effect="plain">乐龄{{musicAge}}</el-tag>
          </div>
        </div>
        <div class="user-info-two-wrapper">
          <div class="fanNum">
            <div class="num">0</div>
            <div class="fan-text">
              <el-tag type="info" size="small" effect="plain">粉丝</el-tag>
            </div>
          </div>
          <div class="likeNum">
            <div class="num">{{musicOperation.likeCountSum | numberFormat}}</div>
            <div class="like-text">
              <el-tag type="info" size="small" effect="plain">获赞</el-tag>
            </div>
          </div>
          <div class="commentNum">
            <div class="num">{{musicOperation.commentCountSum | numberFormat}}</div>
            <div class="comment-text">
              <el-tag type="info" size="small" effect="plain">评论</el-tag>
            </div>
          </div>
          <div class="seeNum">
            <div class="num">{{visitCount | numberFormat}}</div>
            <div class="see-text">
              <el-tag type="info" size="small" effect="plain">访问</el-tag>
            </div>
          </div>
          <div class="collectNum">
            <div class="num">0</div>
            <div class="collect-text">
              <el-tag type="info" size="small" effect="plain">收藏</el-tag>
            </div>
          </div>
          <div class="playNum">
            <div class="num">{{musicOperation.playCountSum}}</div>
            <div class="play-text">
              <el-tag type="info" size="small" effect="plain">播放</el-tag>
            </div>
          </div>
        </div>
        <div class="user-info-three-wrapper">
          <el-button plain style="font-size: 14px;padding: 6px 15px" @click="userHomeForward">TA的主页</el-button>
          <el-button plain style="font-size: 14px;padding: 6px 15px" @click="userHomeForward">私信</el-button>
          <el-button type="danger" style="font-size: 14px;padding: 6px 28px">关注</el-button>
        </div>
      </el-card>
    </div>
    <!--热门音乐-->
    <div class="bbs-music-hot-wrapper">
      <el-card class="bbs-music-hot-card" shadow="never" body-style="padding-top:10px">
        <div class="title">
          <div class="div-embellish"></div>
          <span>热门音乐</span>
          <img class="title-img" src="@/assets/images/flow1.png" width="48" height="40">
        </div>
        <div class="hot-content-wrapper">
          <div
            class="hot-list"
            v-for="(hotMusic,index) in hotMusicList"
            :key="index">
            <div class="hot-row-wrapper">
              <span class="hot-row-title">
                {{hotMusic.title}}
              </span>
              <span class="hot-row-like-count">
                <svg-icon icon-class="like-count" style="color: #bbbbbb;width: 18px"></svg-icon>
                <span> {{hotMusic.bbsMusicOperation === null?0:hotMusic.bbsMusicOperation.likeCount}}</span>
              </span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <!--音乐分类-->
    <div class="bbs-music-sort-wrapper">
      <el-card class="bbs-music-sort-card" shadow="never" body-style="padding-top:10px">
        <div class="title">
          <div class="div-embellish"></div>
          <span>音乐分类</span>
          <img class="title-img" src="@/assets/images/flow1.png" width="48" height="40">
        </div>
        <br>
        hip-hop >>>>>>>>>>>>>>>>>> <br>
      </el-card>
    </div>

  </div>
</template>

<script>
  import {visit, getVisitCount} from "@/api/visit";
  import {getHotMusic} from "@/api/bbsMusic";

  export default {
    name: "right3",
    props: {
      userInfo: Object,
      musicOperation: Object
    },
    data() {
      return {
        visitCount: 0,
        hotMusicList:[],
        newMusicList:[]
      }
    },
    computed: {
      musicAge() {
        return this.timeFormatToDay(this.userInfo.createTime)
      },
      uniqueId() {
        return this.$store.state.user.userInfo.uniqueId
      },
    },
    methods:{
      userHomeForward(){
        this.$tip.success('该功能尚未上线！')
      },
      //获取用户访问数量
      getVisitCount(){
        getVisitCount({id: this.$route.query.uid}, true).then(response => {
          this.visitCount = response.data
        })
      },
      //添加访问数量
      addUserVisit(){
        if (this.$route.path !== "/" + this.uniqueId) {
          visit({id: this.$route.query.uid}, false).then(response => {
          })
        }
      },
      //获取热门音乐
      getHotMusicList(){
        getHotMusic({userId: this.$route.query.uid}, false).then(response => {
          this.hotMusicList = response.data
        })
      }
    },
    filters: {
      numberFormat(val) {
        let _val = val
        if (_val > 9999) {
          _val = Math.floor(_val / 10000)
          return _val + "万+"
        } else
          return _val
      }
    },
    created() {
      //获取用户访问数量
      this.getVisitCount()
      //添加访问数量
      this.addUserVisit()
      //获取热门音乐
      this.getHotMusicList()
    }
  }
</script>

<style scoped>

</style>
