<template>
  <div class="ql-audio">
    <div class="audio-avatar-wrapper">
      <img class="play-avatar" src="@/assets/images/audio-play.png" @click="playHandler">
    </div>
    <!--<div style="border: 1px solid red;height: 50px;margin-top: -20px">{{audioUrl}}</div>-->
    <!--<audio :id="id" class="bbs-audio" preload>-->
    <!--<source :src="audioUrl" type=""/>-->
    <!--</audio>-->
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
        default: 3000
      },
      audioUrl: String,
    },
    data() {
      return {
        times:null,
        watchAudioUrl:'',
        playCount:0
      }
    },
    computed: {

    },
    watch: {
      audioUrl(newVal,oldVal){
        alert(oldVal)
        if(oldVal !== ''){
          window.clearTimeout(this.times)
        }
        // setTimeout(() => {
        //   this.qlAudio.pause()
        // },5000)
      }
    },
    methods: {
      //音频播放
      playHandler() {
        //点击播放后获取音频对象
        let oriAudio = this.getAudio(this.audioUrl)
        //设置歌曲开始时间（秒）
        oriAudio.currentTime = this.startTime
        if (oriAudio.paused) {
          console.log("音乐开始播放");
          oriAudio.play()
          //audio的currentTime变化监听事件timeupdate
          oriAudio.addEventListener("timeupdate", () => {
            // 更新与播放进度相关的内容
            if(parseInt(oriAudio.currentTime) === this.startTime + this.playTime / 1000){
              console.log("暂停了");
              oriAudio.pause()
            }
          });
        } else {
          oriAudio.pause()
        }
      },
    },
    created(){
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
