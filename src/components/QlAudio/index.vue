<template>
  <div class="ql-audio">
    <div class="audio-avatar-wrapper">
      <img class="play-avatar" src="@/assets/images/audio-play.png" @click="playHandler">
    </div>
    <audio :id="id" class="bbs-audio" preload>
      <source src="@/assets/BIGBANG (빅뱅) - 거짓말.mp3" type=""/>
    </audio>
  </div>
</template>

<script>
  import {getToken, setToken, removeToken} from "@/utils/auth";

  export default {
    name: "index",
    props: {
      id: {
        type: String,
        default: "qlMusic"
      },
      avatarUrl: {
        type: String,
        default: "@/assets/images/1.jpg"
      },
      startTime: {
        type: Number,
        default: 100
      },
      playTime: {
        type: Number,
        default: 5000
      }
    },
    data() {
      return {}
    },
    computed: {
      audio() {
        return this.$store.state.audio.qlaudio
      },
    },
    methods: {
      setQlAudio() {
        const _id = this.id
        const audio = document.getElementById(_id)
        this.$store.dispatch('SetQlAudio', audio)
      },
      playHandler() {
        let oriAudio = null
        let item = sessionStorage.getItem('qlaudio')
        if (item===null) {
          console.log('sessionStorage为null')
          this.setQlAudio()
          //获取音频DOM对象
          oriAudio = this.audio
          //设置歌曲开始时间（秒）
          oriAudio.currentTime = this.startTime
          if (oriAudio.paused) {
            oriAudio.play()
            //设置歌曲结束时间（毫秒）
            setTimeout(() => {
              oriAudio.pause()
            }, this.playTime)
          } else {
            oriAudio.pause()
          }
        }else {
          console.log('sessionStorage不为null')
          oriAudio = item
          sessionStorage.removeItem('qlaudio')
        }
        console.log(this.audio);
        console.log(oriAudio);
      },
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
