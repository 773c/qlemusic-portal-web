<template>
  <div class="ql-audio" :style="bgImgStyle">
    <div class="audio-avatar-wrapper">
      <div class="audio-avatar" :style="rotationStyle">
        <el-avatar :size=52 :src="audioImgUrl"></el-avatar>
      </div>
      <div class="play-avatar-wrapper">
        <div v-if="isShowLineProgress">
          <img
            v-if="!isClickPlay"
            class="play-avatar"
            src="@/assets/images/audio-play.png"
            @click="releasePlayHandler">
          <img
            v-else
            class="play-avatar"
            src="@/assets/images/audio-pause.png"
            @click="releasePauseHandler">
        </div>
        <div v-else>
          <img
            v-if="!isClickPlay"
            class="play-avatar"
            src="@/assets/images/audio-play.png"
            @click="playHandler">
          <img
            v-else
            class="play-avatar"
            src="@/assets/images/audio-pause.png"
            @click="pauseHandler">
        </div>

      </div>
    </div>
    <div v-if="isShowLineProgress" class="audio-progress-wrapper">
      <el-slider
        v-model="progressTime"
        :show-tooltip="false"
        @change="moveAfterTrigger">
      </el-slider>
      <div class="audio-start-time">{{audioValue.currentTime}}</div>
      <div class="audio-end-time">{{audioValue.formatDuration}}</div>
    </div>
    <div v-else class="audio-progress-effect-wrapper">
      <img class="audio-progress-effect-img" :src="showProgressEffect">
    </div>
  </div>
</template>

<script>
  import {getToken, setToken, removeToken} from "@/utils/auth";
  import {play} from "@/api/play";

  export default {
    name: "index",
    props: {
      id: {
        type: String,
        default: 'qlMusic'
      },
      avatarUrl: {
        type: String,
        default: '@/assets/images/1.jpg'
      },
      audioImgUrl: {
        type: String,
        default: 'http://www.eiqle.com/img/default-avatar.png'
      },
      startTime: {
        type: String,
        default: 100
      },
      playTime: {
        type: String
      },
      isShowLineProgress: {
        type: Boolean,
        default: false
      },
      audioUrl: String,
      prevAudioVueComponent: {},
      bgImgStyle: Object,
      musicId:Number
    },
    data() {
      return {
        times: null,
        playCount: 0,
        thisStartTime: 0,
        progressTime: 0,
        isShowPlayEffect: false,
        audioValue: {
          formatDuration: '',
          currentTime: ''
        },
        isClickPlay: false,
      }
    },
    computed: {
      showProgressEffect() {
        if (this.isShowPlayEffect)
          return require('@/assets/images/bbs-music-effect.gif')
        else
          return require('@/assets/images/bbs-music-effect-static.jpg')
      },
      rotationStyle() {
        if (this.isShowPlayEffect) {
          return {
            webkitTransform: 'rotate(360deg)',
            animation: 'rotation 3s linear infinite',
            mozAnimation: 'rotation 3s linear infinite',
            webkitAnimation: 'rotation 3s linear infinite',
            oAnimation: 'rotation 3s linear infinite'
          }
        } else {
          return ''
        }
      }
    },
    watch: {
      audioUrl(newVal, oldVal) {
        let audio = this.getAudio(newVal)
        //这里必须用箭头函数
        audio.addEventListener("canplay", () => {
          console.log("监听audioUrl");
          this.audioValue.currentTime = this.durationFormat()
          this.audioValue.formatDuration = this.durationFormat(audio.duration)
        })
        if (oldVal !== '') {
          window.clearTimeout(this.times)
        }
      }
    },
    methods: {
      //音频播放
      playHandler() {
        //点击播放时为true
        this.isClickPlay = true
        //设置上一个vue组件audio
        this.prevAudioVueComponent.isShowPlayEffect = false
        this.prevAudioVueComponent.isClickPlay = false
        //点击播放后获取音频对象
        let oriAudio = this.getAudio(this.audioUrl)
        //开启进度条效果
        this.isShowPlayEffect = true
        this.$emit('setPlayEffect', this)
        //设置歌曲开始时间（秒）
        oriAudio.currentTime = this.thisStartTime
        console.log("音乐开始播放");
        oriAudio.play()
        //audio的currentTime变化监听事件timeupdate(这里必须用箭头函数)
        oriAudio.addEventListener("timeupdate", () => {
          this.progressTime = oriAudio.currentTime * 100 / this.$qlAudio.duration
          // 更新与播放进度相关的内容
          if (parseInt(oriAudio.currentTime) === parseInt(this.startTime) + parseInt(this.playTime) / 1000) {
            console.log("暂停了");
            oriAudio.pause()
            //关闭进度条效果
            this.isShowPlayEffect = false
            this.isClickPlay = false
          }
        })
        //存储播放次数
        play({musicId:this.musicId},false).then(response => {

        })
      },
      //音频暂停
      pauseHandler() {
        this.$qlAudio.pause()
        this.isClickPlay = false
        this.isShowPlayEffect = false
      },
      //发布音频播放
      releasePlayHandler() {
        //点击播放时为true
        this.isClickPlay = true
        //点击播放后获取音频对象
        let oriAudio = this.getAudio(this.audioUrl)
        //设置歌曲开始时间（秒）
        oriAudio.currentTime = this.thisStartTime
        console.log("音乐开始播放");
        oriAudio.play()
        //audio的currentTime变化监听事件timeupdate(这里必须用箭头函数)
        oriAudio.addEventListener("timeupdate", () => {
          this.audioValue.currentTime = this.durationFormat(oriAudio.currentTime)
          this.audioValue.formatDuration = this.durationFormat(oriAudio.duration)
          this.progressTime = oriAudio.currentTime * 100 / this.$qlAudio.duration
          // 更新与播放进度相关的内容
          if (parseInt(oriAudio.currentTime) === parseInt(this.startTime) + parseInt(this.playTime) / 1000) {
            console.log("暂停了");
            oriAudio.pause()
            this.isClickPlay = false
          }
        })
      },
      //发布音频暂停
      releasePauseHandler() {
        //设置暂停后不重新开始
        this.$qlAudio.currentTime = this.thisStartTime = this.progressTime * this.$qlAudio.duration / 100
        console.log(this.$qlAudio.currentTime + ".." + this.thisStartTime);
        this.audioValue.currentTime = this.durationFormat(this.thisStartTime)
        this.$qlAudio.pause()
        this.isClickPlay = false
      },
      //音乐时长格式化
      durationFormat(currentTime) {
        if (currentTime === null || currentTime === undefined || currentTime === '')
          return '00:00'
        let mzeroPrefix = ''
        let szeroPrefix = ''
        let minutes = parseInt(currentTime / 60, 10);
        let seconds = parseInt(currentTime % 60);
        if (minutes < 10)
          mzeroPrefix = "0"
        if (seconds < 10)
          szeroPrefix = "0"
        return mzeroPrefix + minutes + ":" + szeroPrefix + seconds
      },
      //移动进度条触发（在鼠标离开后）
      moveAfterTrigger(val) {
        this.$qlAudio.currentTime = val * this.$qlAudio.duration / 100
      }
    },
    created() {
      this.thisStartTime = parseInt(this.startTime)
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
