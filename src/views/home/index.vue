<template>
  <div id="home">
    <!--走马灯-->
    <el-carousel :interval="4000" type="card" height="16vw" style="background-size: cover;margin-top: 20px">
      <el-carousel-item v-for="item in 6" :key="item">
        <div class="medium">
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
            customEventName="customstatechangedeventname"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            @canplay="onPlayerCanplay($event)"
            @canplaythrough="onPlayerCanplaythrough($event)"
            @statechanged="playerStateChanged($event)"
            @ready="playerReadied">
          </video-player>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!--@ended="onPlayerEnded($event)"-->
    <!--@waiting="onPlayerWaiting($event)"-->
    <!--@playing="onPlayerPlaying($event)"-->
    <!--@loadeddata="onPlayerLoadeddata($event)"-->
    <!--@timeupdate="onPlayerTimeupdate($event)"-->


    <!--音频文章区域-->
    <div class="infinite-list-wrapper middle-bbs-music" style="overflow:auto;">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        style="height: 60%;background-color: #222222;">
        <el-table ref="bbsMusicTable"
                  :data="(list||[]).slice(0,pageSize)"
                  border>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <div class="el-table-title">推荐</div>
              <div class="voice-wrapper">
                <div class="voice-icon-wrapper" @click="voiceHandler">
                  <svg-icon class="voice-icon" :icon-class="changeVoiceIcon"></svg-icon>
                </div>
                <div class="voice-progress">
                  <el-slider v-model="voiceValue" :show-tooltip="true" @input="changeVolume"></el-slider>
                </div>
              </div>
            </template>
            <template #default="scope">
              <div class="middle-title">
                <span>{{scope.row.title}}</span>
              </div>
              <el-row>
                <el-col :span="2">
                  <div class="avatar-wrapper">
                    <img class="user-avatar" :src="scope.row.umsUser.headIcon">
                  </div>
                </el-col>
                <el-col :span="3" style="padding-top: 22px;">
                  <span class="publisher">{{scope.row.umsUser.name}}</span>
                </el-col>
                <el-col :span="13">
                  <!--播放器-->
                  <ql-audio :audioUrl="scope.row.audioUrl"></ql-audio>
                </el-col>
                <el-col :span="2" style="padding-top: 40px;">
                  <div class="like div-threeIcon">
                    <svg-icon class="threeIcon" icon-class="like"></svg-icon>
                    <span>{{bbsMusic.likeNum}}</span>
                  </div>
                  <div style="width:0;height: 12px;border-left: 1px solid #C4C4C4;float: right;margin-top: -17px"></div>
                </el-col>
                <el-col :span="2" style="padding-top: 40px;">
                  <div class="see div-threeIcon">
                    <svg-icon class="threeIcon" icon-class="see"></svg-icon>
                    <span>{{bbsMusic.seeNum}}</span>
                  </div>
                  <div style="width:0;height: 12px;border-left: 1px solid #C4C4C4;float: right;margin-top: -17px"></div>
                </el-col>
                <el-col :span="2" style="padding-top: 40px;">
                  <div class="comment div-threeIcon">
                    <svg-icon class="threeIcon" icon-class="comment"></svg-icon>
                    <span>{{bbsMusic.commentNum}}</span>
                  </div>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </ul>
      <div v-if="loading" align="center" style="padding-bottom: 100px">加载中...</div>
    </div>
  </div>
</template>

<script>
  import {getRecommendList} from "@/api/bbsMusic";
  import {videoPlayer} from 'vue-video-player'

  const defaultBbsMusic = {
    likeNum: '',
    seeNum: '',
    commentNum: '',
    total: 300
  }
  export default {
    name: "index",
    components: {
      videoPlayer
    },
    data() {
      return {
        pageSize: 0,
        loading: false,
        bbsMusic: Object.assign({}, defaultBbsMusic),
        list: [],
        voiceValue: 50,
        changeVoiceIcon: 'audio-voice',
        playerOptions: {
          // videojs options
          muted: false,
          language: 'zh-CN',
          preload: 'auto',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          fluid: true,
          notSupportedMessage: '此视频暂无法播放，请稍后再试',
          sources: [{
            type: "video/mp4",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm",
          }],
          poster: require("@/assets/images/1.jpg"),
        },
      }
    },
    computed: {
      disabled() {
        return this.loading
      },
      player() {
        return this.$refs.videoPlayer.player
      },
      volume(){
        return this.voiceValue / 100
      }
    },
    methods: {
      //获得默认推荐音乐片段
      recommendList() {
        getRecommendList(false).then(response => {
          console.log(response);
          let data = response.data;
          this.list = data
        })
      },
      //当滚动条到达最底端的时候加载新内容
      load() {
        // 滚动条到最顶端的距离
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        // 滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        // 判断是否到达底部
        if (Math.ceil(scrollTop) + windowHeight == scrollHeight) {
          this.loading = true
          setTimeout(() => {
            this.pageSize += 2
            this.loading = false
          }, 2000)
        }
      },
      changeVolume(){
        this.qlAudio.volume = this.volume
        localStorage.setItem("volume",this.volume)
      },
      //声音处理
      voiceHandler() {
        let audio = this.qlAudio
        //muted为true为静音
        if (audio.muted) {
          this.changeVoiceIcon = 'audio-voice'
          audio.muted = false
        } else {
          this.changeVoiceIcon = 'audio-voice-no'
          audio.muted = true
        }
        localStorage.setItem("muted", audio.muted)
      },
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      // ...player event
      onPlayerCanplay(player) {
        // console.log('player canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player canplaythrough!', player)
      },

      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },

      // player is ready
      playerReadied(player) {
        // console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      }
    },
    created() {
      this.recommendList()
      if (this.bbsMusic.total < 15)
        this.pageSize = this.bbsMusic.total
      else
        this.pageSize = 15
      //初始化audio
      this.initAudio()
    },
    mounted() {
      //初始化音量图标
      let muted = localStorage.getItem("muted")
      if (muted === 'true') {
        this.changeVoiceIcon = 'audio-voice-no'
      } else {
        this.changeVoiceIcon = 'audio-voice'
      }
      //初始化音量滑条
      console.log("音量："+localStorage.getItem("volume") * 100);
      this.voiceValue = localStorage.getItem("volume") * 100


      this.$nextTick(function () {
        window.addEventListener('scroll', this.load, true)
      })
    },
    destroyed() { //离开该页面需要移除这个监听的事件
      window.removeEventListener('scroll', this.load)
    },
  }
</script>

<style scoped>

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .video-js .vjs-icon-placeholder {
    width: 100%;
    height: 100%;
    display: block;
    border: 1px solid red;
  }
</style>
