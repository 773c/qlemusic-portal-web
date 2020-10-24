<template>
  <!--注册-->
  <div>
    <!--匹配验证码-->
    <div v-show="!isMatchVerify" class="tabs-tel-content tabs-content">
      <label class="tabs-label">手机号</label><br>
      <el-input type="text" v-model="regTelephone" class="tabs-telephone tabs-input" placeholder="  请输入手机号">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option v-for="item in region"
                     :key="item.name"
                     :label="item.label"
                     :value="item.value">
            <span style="float: left;margin-left: -10px">{{ item.label }}</span>
            <span
              style="float: right;margin: 0 -10px 0 10px;color: #8492a6; font-size: 13px">{{ item.name }}</span>
          </el-option>
        </el-select>
      </el-input>
      <br><br>
      <label for="regVerify" class="tabs-label">验证码</label><br>
      <input v-model="regVerify" type="text" id="regVerify" class="tabs-verify tabs-input" placeholder="  请输入验证码">
      <verify-button
        :telephone="regTelephone"
        :isSendSuccessTo="isSendSuccess"
        @setSendSuccessStatus="setSendSuccessStatus">
      </verify-button>
      <br><br>
      <el-row style="margin-top:10px;">
        <drag-verify
          ref="dragVerify"
          :width="300"
          :height="40"
          progressBarBg="#76c61d"
          background="#F5F5F5"
          :isPassing.sync="isPassing"
          text="请按住滑块拖动"
          successText="验证通过"
          handlerIcon="el-icon-d-arrow-right"
          successIcon="el-icon-circle-check"
          @passcallback="passCallBack">
        </drag-verify>
      </el-row>
      <br><br>
      <el-button class="tabs-log-button" type="danger" round @click="regBtonNextHandler" :disabled="btonShow">下一步
      </el-button>
      <button style="display: none"></button>
      <div align="center">
        <div class="tabs-reg-return-log" @click="returnLogClick">
          返回登录
        </div>
      </div>
    </div>
    <!--设置密码-->
    <set-password
      v-show="isMatchVerify"
      @regReset="regReset"
      @setDialogVisible="setDialogVisible"
      :regTelephone="regTelephone">
    </set-password>
  </div>
</template>

<script>
  import SetPassword from './SetPassword'
  import DragVerify from '@/components/DragVerify'
  import {matchVerify} from '@/api/login'
  import VerifyButton from '@/components/VerifyButton'

  export default {
    name: "regTelephone",
    components: {
      SetPassword,
      DragVerify,
      VerifyButton
    },
    data() {
      return {
        regTelephone: '',
        regVerify: '',
        isSendSuccess: false,
        isMatchVerify: false,
        btonShow: true,
        select: '86',
        region: [{
          value: '86',
          label: '+ 86',
          name: '中国'
        }, {
          value: '1',
          label: '+ 1',
          name: '美国'
        }, {
          value: '1',
          label: '+ 1',
          name: '加拿大'
        }, {
          value: '852',
          label: '+ 852',
          name: '中国香港'
        }, {
          value: '886',
          label: '+ 886',
          name: '中国台湾'
        }, {
          value: '81',
          label: '+ 81',
          name: '日本'
        },
          {
            value: '65',
            label: '+ 65',
            name: '新加坡'
          }],
      }
    },
    computed: {
      isPassing: {
        set(value) {
          return value
        },
        get() {
          return false
        }
      }
    },
    methods: {
      //注册下一步按钮
      regBtonNextHandler() {
        if (this.regTelephone === '') {
          this.$tip.error('手机号不能为空')
        } else if (this.regVerify === '') {
          this.$tip.error('验证码不能为空')
        } else {
          matchVerify(this.regTelephone, this.regVerify).then(response => {
            console.log(response);
            let data = response.data
            this.isMatchVerify = true
          })
        }
      },
      //滑块重置
      reset() {
        console.log("重置滑块");
        this.isPassing = false;
        if (this.$refs.dragVerify != undefined) {
          this.$refs.dragVerify.reset();
        }
      },
      //滑块成功调用
      passCallBack() {
        console.log("滑块验证成功走的方法");
        if (this.isSendSuccess)
          this.btonShow = false
        else if (this.regTelephone === '') {
          this.$tip.error('请输入手机号注册')
          setTimeout(() => {
            this.reset()
          }, 2000)
        } else {
          this.$tip.error('请发送验证码')
          setTimeout(() => {
            this.reset()
          }, 2000)
        }
      },
      //注册返回登录界面
      returnLogClick() {
        this.$emit("returnLogClick")
      },
      //注册界面重置
      regReset() {
        this.isMatchVerify = false
        //手机号文本框清零
        this.regTelephone = ''
        //验证码文本框清零
        this.regVerify = ''
        //发送验证码按钮复原
        this.isSendSuccess = false
        //验证条复原
        this.reset()
      },
      //调用父组件方法
      setDialogVisible(){
        this.$emit('setDialogVisible')
      },
      //设置验证码按钮发送状态
      setSendSuccessStatus(status){
        this.isSendSuccess = status
      }
    }
  }
</script>

<style scoped>

</style>
