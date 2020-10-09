<template>
  <div class="ql-audio">
    <div class="audio-avatar-wrapper">
      <div class="audio-avatar" :style="rotationStyle">
        <el-avatar :size=52 :src="audioImgUrl"></el-avatar>
      </div>
      <div class="play-avatar-wrapper">
        <img class="play-avatar" src="@/assets/images/audio-play.png" @click="playHandler">
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
      <img class="audio-progress-effect-img" :src="showProgressEffect" width="400" height="50px">
    </div>
  </div>
</template>

<script>
  import {getToken, setToken, removeToken} from "@/utils/auth";

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
        type: Number,
        default: 100
      },
      playTime: {
        type: Number
      },
      audioUrl: String,
      prevAudioVueComponent:{}
    },
    data() {
      return {
        times: null,
        playCount: 0,
        thisStartTime: 0,
        progressTime: 0,
        isShowPlayEffect: false,
        isShowLineProgress: false,
        audioValue: {
          formatDuration: '',
          currentTime: ''
        }
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
          this.audioValue.currentTime = this.durationFormat()
          this.audioValue.formatDuration = this.durationFormat(audio.duration)
        })
        if (oldVal !== '') {
          window.clearTimeout(this.times)
        }
      },
      isShowPlayEffect(val,oldVal){
      }
    },
    methods: {
      //音频播放
      playHandler() {
        //设置上一个vue组件audio
        this.prevAudioVueComponent.isShowPlayEffect = false
        //点击播放后获取音频对象
        let oriAudio = this.getAudio(this.audioUrl)
        //开启进度条效果
        this.isShowPlayEffect = true
        this.$emit('setPlayEffect',this)
        //设置歌曲开始时间（秒）
        oriAudio.currentTime = this.thisStartTime
        if (oriAudio.paused) {
          console.log("音乐开始播放");
          oriAudio.play()
          //audio的currentTime变化监听事件timeupdate(这里必须用箭头函数)
          oriAudio.addEventListener("timeupdate", () => {
            this.audioValue.currentTime = this.durationFormat(oriAudio.currentTime)
            this.progressTime = oriAudio.currentTime * 100 / this.$qlAudio.duration
            // console.log(oriAudio.currentTime + "..?"+ this.progressTime);
            // 更新与播放进度相关的内容
            if (parseInt(oriAudio.currentTime) === this.startTime + this.playTime / 1000) {
              console.log("暂停了");
              oriAudio.pause()
              //关闭进度条效果
              this.isShowPlayEffect = false
            }
          })
        } else {
          //设置暂停后不重新开始
          oriAudio.currentTime = this.thisStartTime = this.progressTime * this.$qlAudio.duration / 100
          console.log(oriAudio.currentTime + ".." + this.thisStartTime);
          this.audioValue.currentTime = this.durationFormat(this.thisStartTime)
          oriAudio.pause()
          //关闭进度条效果
          this.isShowPlayEffect = false
        }
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
      this.thisStartTime = this.startTime
      if (this.$route.path !== '/home') {
        this.isShowLineProgress = true
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
