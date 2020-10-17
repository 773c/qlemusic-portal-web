export default {
  install(Vue, options) {
    Vue.prototype.timeFormatToCAE = function (date) {
      let cdate = new Date(date)
      let nowdate = new Date();
      let years = cdate.getFullYear()
      let mouths = cdate.getMonth()+1
      let days = cdate.getDate()
      let hours = cdate.getHours()
      let minutes = cdate.getMinutes()
      if(mouths < 10)
        mouths = "0" + mouths
      if(days < 10)
        days = "0" + days
      if(hours < 10)
        hours = "0" + hours
      if(minutes < 10)
        minutes = "0" + minutes
      //如果同一年
      if(years === nowdate.getFullYear()){
        //如果同一个月
        if(mouths === nowdate.getMonth()){
          //如果同一天
          if(days === nowdate.getDate()){
            return "今天"+" "+hours+":"+minutes
          }else if(days + 1 === nowdate.getDate()){
            return "昨天"+" "+hours+":"+minutes
          }
        }
        return mouths+"月"+days+"日"+" "+hours+":"+minutes
      }
    }
    Vue.prototype.timeFormatToDay = function (time) {
      let date = new Date(time)
      let nowdate = new Date()
      let day = Math.ceil((nowdate.getTime() - date.getTime()) / (1000*3600*24));
      if(day<365){
        return day + "天"
      }else {
        return Math.ceil(day/31/12) + "年"
      }
    }
  }
}
