<template>
  <div id="carousel-video-wrapper">
    <div class="video-bgimg-wrapper">
      <el-carousel class="home-carousel" :interval="4000" type="card">
        <el-carousel-item class="home-el-carousel-item" v-for="item in playerOptions" :key="item.poster">
          <div class="video-content-wrapper">
            <div
              ref="contentTitleRef"
              class="video-content-title-wrapper"
              :style="{background: 'url('+item.poster+')',backgroundSize:'cover'}"
              @click="showVideoModel(item)"
              @mouseenter="item.isShowTitle = true" @mouseleave="item.isShowTitle = false">
              <div class="video-content-title"
                   :style="item.isShowTitle === true?{height:'100px',transition: 'height 0.3s'}:''">
                {{item.contentTitle}}
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="video-model-wrapper">
      <el-dialog
        title="Eiqle 视频"
        :visible.sync="showVideo"
        @opened="openedVideoModel"
        @close="closeVideoModel"
        :fullscreen="device==='mobile'?true:false"
        width="60%">
        <div class="video-player-wrapper">
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :options="clickedVideo"
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
      </el-dialog>
    </div>
    <!--@ended="onPlayerEnded($event)"-->
    <!--@waiting="onPlayerWaiting($event)"-->
    <!--@playing="onPlayerPlaying($event)"-->
    <!--@loadeddata="onPlayerLoadeddata($event)"-->
    <!--@timeupdate="onPlayerTimeupdate($event)"-->
  </div>
</template>

<script>
  import {videoPlayer} from 'vue-video-player'

  export default {
    name: "carouselVideo",
    components: {
      videoPlayer,
    },
    data() {
      return {
        showVideo: false,
        clickedVideo: [],
        clickedVideoTitle:'',
        playerOptions: [
          {
            muted: false,
            language: 'zh-CN',
            preload: 'auto',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            fluid: true,
            notSupportedMessage: '此视频暂无法播放，请稍后再试',
            sources: [{
              type: "video/mp4",
              src: "https://qlmusic-oss1.oss-cn-zhangjiakou.aliyuncs.com/qlemusic/videos/hcy_qpz.mp4",

            }],
            poster: require("@/assets/images/hcy-fry1.jpg"),
            controlBar: {
              playToggle: true,
              timeDivider: true,
              durationDisplay: true,
              remainingTimeDisplay: false,
              fullscreenToggle: true  //全屏按钮
            },
            isShowTitle: false,
            contentTitle: '《疯人院-华晨宇》不一样的味道，极致的疯狂。火星人的世界你怎么能懂。\n' +
            '              《疯人院-华晨宇》不一样的味道，极致的疯狂。火星人的世界你怎么能懂。',
          },
          {
            muted: false,
            language: 'zh-CN',
            preload: 'auto',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            fluid: true,
            notSupportedMessage: '此视频暂无法播放，请稍后再试',
            sources: [{
              type: "video/mp4",
              src: "https://qlmusic-oss1.oss-cn-zhangjiakou.aliyuncs.com/qlemusic/videos/gai_four.mp4",
            }],
            poster: require("@/assets/images/gai-hsx.jpg"),
            controlBar: {
              playToggle: true,
              timeDivider: true,
              durationDisplay: true,
              remainingTimeDisplay: false,
              fullscreenToggle: true  //全屏按钮
            },
            isShowTitle: false,
            contentTitle: '《虎山行》 GAI四句名句，堪称诗人。一望无前虎山行，拨开云雾见光明。梦里桃花牡丹亭，幻想成真歌舞升平。',
          },
          {
            muted: false,
            language: 'zh-CN',
            preload: 'auto',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            fluid: true,
            notSupportedMessage: '此视频暂无法播放，请稍后再试',
            sources: [{
              type: "video/mp4",
              src: "https://qlmusic-oss1.oss-cn-zhangjiakou.aliyuncs.com/qlemusic/videos/jonyj_byqc.mp4",
            }],
            poster: require("@/assets/images/jonyj-byqc2.jpg"),
            controlBar: {
              playToggle: true,
              timeDivider: true,
              durationDisplay: true,
              remainingTimeDisplay: false,
              fullscreenToggle: true  //全屏按钮
            },
            isShowTitle: false,
            contentTitle: '《中国有嘻哈》 Jony J 复活重来，献出一首非常有深度的歌曲 【不用去猜】',
          }
        ]
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      },
      device() {
        return this.$store.state.app.device
      },
    },
    methods: {
      //显示播放器Dialog框
      showVideoModel(video) {
        this.showVideo = true
        this.clickedVideo = video

      },
      openedVideoModel(){
        this.player.play()
      },
      //关闭播放器Dialog框时触发
      closeVideoModel(){
        this.player.pause()
        console.log(this.player);
      },
      change(newIndex, oldIndex) {
      },
      //视频播放时触发
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      //视频暂停时触发
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

      //视频一加载就触发
      playerReadied(player) {
        // console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
