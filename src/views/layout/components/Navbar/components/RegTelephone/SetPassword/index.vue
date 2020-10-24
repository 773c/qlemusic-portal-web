<template>
  <!--手机验证码匹配正确后，设置密码-->
  <div  class="tabs-tel-content tabs-content">
    <label class="tabs-label">密码</label><br>
    <el-input type="password" v-model="regPassword" class="tabs-telephone tabs-input" placeholder="  请输入密码"/>
    <br><br>
    <label class="tabs-label">重复密码</label><br>
    <el-input type="password" v-model="regRePassword" class="tabs-telephone tabs-input" placeholder="  请再一次输入密码"/>
    <br><br><br>
    <el-button class="tabs-log-button" type="danger" round @click="regBtonFinalHandler"
               :disabled="finalBtonShow">完成注册
    </el-button>
    <br><br>
    <div style="margin-left: -50px;">
      <div align="center">
        <div style="font-size:13px;color: #8c939d">注册完成后可使用</div>
        <br>
        <div style="margin-top: -10px;font-size:13px;color: #8c939d">手机号验证或密码登录</div>
      </div>
    </div>
    <div class="tabs-reg-return-prev" align="center" @click="regPrevClickHandler">
      返回上一步
    </div>
  </div>
</template>

<script>
  import {register} from '@/api/login'

  export default {
    name: "setPassword",
    props:{
      regTelephone:{
        type:String
      }
    },
    data(){
      return {
        regPassword: '',
        regRePassword: '',
        finalBtonShow: true,
      }
    },
    watch:{
      regPassword(){
        if(this.regRePassword!==''&&this.regPassword!=='')
          this.finalBtonShow = false
        else
          this.finalBtonShow = true
      },
      regRePassword(){
        if(this.regPassword!==''&&this.regRePassword!=='')
          this.finalBtonShow = false
        else
          this.finalBtonShow = true
      }
    },
    methods:{
      regBtonFinalHandler() {
        if(this.regPassword === '' || this.regRePassword === ''){
          this.$tip.error('密码不能为空')
        } else if(this.regPassword === this.regRePassword){
          register(this.regTelephone,this.regPassword,this.regRePassword).then(response => {
            console.log(response);
            this.$emit('setDialogVisible')
            this.$tip.success('注册成功')
          })
        }else {
          this.$tip.error('两次密码不一致')
        }
      },
      regPwdReset(){
        //密码重置
        this.regPassword = ''
        //再一次密码重置
        this.regRePassword = ''
      },
      regPrevClickHandler(){
        //注册数据重置
        this.$emit("regReset")
      },
    }
  }
</script>

<style scoped>

</style>
