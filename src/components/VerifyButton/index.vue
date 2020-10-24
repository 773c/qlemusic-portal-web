<template>
  <el-button class="verify-button" :style="isShowStyle" :disabled="isDisabled"
             @click="regSendVerifyBtonHandler">
    {{CountDown}}
  </el-button>
</template>

<script>
  import {sendSms} from "@/api/login";

  export default {
    name: "verifyButton",
    props: {
      telephone:{
        type:String,
        default:''
      },
      isSendSuccessTo:{
        type:Boolean,
        default:false
      },
      vbwidth:{
        type:Number,
        default:110
      },
      vbpadding:{
        type:Object,
        default:function () {
          return {
            vertical:8,
            align:0
          }
        }
      }
    },
    data(){
      return {
        second:120,
        isSendSuccess:false
      }
    },
    computed: {
      verifyBtonStyle() {
        return {
          backgroundColor: '#fe0000',
          color: '#ffffff',
          width: this.vbwidth + 'px',
          padding: this.vbpadding.vertical+'px ' +this.vbpadding.align +'px'
        }
      },
      CountDown() {
        if (this.second === 0) {
          return "发送验证码"
        } else if (this.isSendSuccess) {
          return this.second + "s 后重新发送"
        } else {
          return "发送验证码"
        }
      },
      isShowStyle() {
        if (this.telephone === '')
          return ''
        else if (this.isSendSuccess === true)
          return ''
        else
          return this.verifyBtonStyle
      },
      isDisabled() {
        if (this.telephone === '')
          return true
        else if (this.isSendSuccess === true)
          return true
        else
          return false
      }
    },
    watch:{
      isSendSuccessTo(val,oldVal){
        this.isSendSuccess = val
      }
    },
    methods: {
      //注册验证码发送
      regSendVerifyBtonHandler() {
        sendSms(this.telephone).then(response => {
          this.$tip.success('发送成功')
          //短信发送成功后
          this.isSendSuccess = true
          this.$emit('setSendSuccessStatus',true)
          //定时器倒计时
          let timer = setInterval(() => {
            if (this.second <= 1) {
              this.isSendSuccess = false
              this.$emit('setSendSuccessStatus',false)
              this.second = 120
              clearInterval(timer)
              return
            }
            this.second = this.second - 1
          }, 1000)
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .verify-button {
    margin-left: 10px;
    background-color: #F7F7F7;
    border: 1px solid #F7F7F7;
    color: #C4C4C4;
    font-size: 12px;
  }
</style>
