export default{
  install(Vue,options)
  {
    Vue.prototype.qlAudio = document.createElement("AUDIO")
    Vue.prototype.initAudio = function () {
      let audio = this.qlAudio
      let muted = localStorage.getItem("muted")
      let volume = localStorage.getItem("volume")
      console.log("全局getAudio");
      audio.setAttribute("class","bbs-audio")
      audio.autoplay = false
      audio.preload = true
      audio.volume = volume
      if(muted === 'true')
        audio.muted = true
      else
        audio.muted = false
      return audio
    }
    Vue.prototype.getAudio = function (audioUrl) {
      let audio = this.qlAudio
      audio.src = audioUrl
      return audio
    }
  }
}
