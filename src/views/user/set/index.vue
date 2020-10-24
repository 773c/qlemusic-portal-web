<template>
  <div id="user-set">
    <el-tabs
      v-model="userSetTabsValue"
      tab-position="left"
      type="border-card"
      style="height: 787px;border: none;border-top:1px solid #e4e4e4;box-shadow: none"
      @tab-click="userSetClickTrigger">
      <el-tab-pane label="账号设置首页" name="home">
        <div class="user-set-home-wrapper">
          <div class="ush-row-one-wrapper">
            <div class="ush-text-top">您当前安全评分为：</div>
            <div class="ush-rate">
              <el-rate
                v-model="safeLevel"
                disabled
                show-score
                text-color="#ff9900"
                :colors="colors"
                score-template="{value}">
              </el-rate>
            </div>
            <div class="ush-img">
              <img src="@/assets/images/usr-set-safe.png" width="30" height="27">
            </div>
          </div>
          <div style="clear: both;"></div>
          <!--定期修改密码-->
          <div class="ush-row-two-wrapper">
            <el-divider content-position="left">
              <div class="ush-title-name">
                <span>定期修改密码 <i class="el-icon-edit-outline"></i></span>
              </div>
            </el-divider>
            <div class="ush-two-wrapper">
              <div class="usht-img-wrapper">
                <img src="@/assets/images/user-safe-right.png" width="18">
              </div>
              <div class="usht-text-wrapper">
                正常
              </div>
              <div>
                <el-button style="float: right; padding: 3px 0" type="text" @click="userSetTabsValue = 'password'">修改密码
                </el-button>
              </div>
            </div>
          </div>
          <div style="clear: both;"></div>
          <!--绑定安全手机-->
          <div class="ush-row-three-wrapper">
            <el-divider content-position="left">
              <div class="ush-title-name">
                <span>绑定安全手机 <i class="el-icon-edit-outline"></i></span>
              </div>
            </el-divider>
            <div class="ush-three-wrapper">
              <div class="usht-left">
                <img src="@/assets/images/user-safe-right.png" width="18">
              </div>
              <div class="usht-text-wrapper">
                正常
              </div>
              <div>
                <el-button style="float: right; padding: 3px 0" type="text" @click="userSetTabsValue = 'telephone'">绑定手机
                </el-button>
              </div>
            </div>
          </div>
          <div style="clear: both;"></div>
          <!--绑定安全邮箱-->
          <div class="ush-row-three-wrapper">
            <el-divider content-position="left">
              <div class="ush-title-name">
                <span>绑定安全邮箱 <i class="el-icon-edit-outline"></i></span>
              </div>
            </el-divider>
            <div class="ush-three-wrapper">
              <div class="usht-left">
                <img src="@/assets/images/user-safe-warn.png" width="18">
              </div>
              <div class="usht-text-wrapper" style="color: #FF7436">
                存在风险
              </div>
              <div>
                <el-button style="float: right; padding: 3px 0" type="text" @click="userSetTabsValue = 'email'">绑定邮箱
                </el-button>
              </div>
            </div>
          </div>
          <div style="clear: both;"></div>
          <!--绑定第三方账号-->
          <div class="ush-row-three-wrapper">
            <el-divider content-position="left">
              <div class="ush-title-name">
                <span>绑定第三方账号 <i class="el-icon-edit-outline"></i></span>
              </div>
            </el-divider>
            <div class="ush-three-wrapper">
              <div class="usht-left">
                <img src="@/assets/images/user-safe-right.png" width="18">
              </div>
              <div class="usht-text-wrapper">
                正常
              </div>
              <div>
                <el-button style="float: right; padding: 3px 0" type="text" @click="userSetTabsValue = 'oauth'">绑定账号
                </el-button>
              </div>
            </div>
          </div>
          <div style="clear: both;"></div>
          <!--登录记录-->
          <div class="ush-row-three-wrapper">
            <el-divider content-position="left">
              <div class="ush-title-name">
                <span>登录记录 <i class="el-icon-edit-outline"></i></span>
              </div>
            </el-divider>
            <div class="ush-three-wrapper">
              <div class="usht-left">
                <img src="@/assets/images/user-safe-right.png" width="18">
              </div>
              <div class="usht-text-wrapper">
                正常
              </div>
              <div>
                <el-button style="float: right; padding: 3px 0" type="text" @click="userSetTabsValue = 'record'">点击查看
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="password">
        <div class="user-set-password-wrapper">
          <div class="us-title-wrapper">
            <el-divider content-position="left"><span>修改密码</span></el-divider>
          </div>
          <div class="us-password-wrapper">
            <el-form :model="pwdRuleForm" status-icon :rules="rules" ref="pwdRuleForm" label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="旧密码" prop="oldPass">
                <el-input type="password" v-model="pwdRuleForm.oldPass"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="pwdRuleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="pwdRuleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item align="center" style="padding-top: 10px">
                <el-button type="danger" @click="updatePwdHandler('pwdRuleForm')" style="padding: 8px 20px">修改
                </el-button>
                <el-button plain @click="resetPwd('pwdRuleForm')" style="padding: 8px 20px">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改手机" name="telephone">
        <div class="user-set-telephone-wrapper">
          <div class="us-title-wrapper">
            <el-divider content-position="left"><span>修改手机</span></el-divider>
          </div>
          <div v-if="!isNextByUpdateTel" class="us-telephone-wrapper">
            <el-form label-width="100px">
              <el-form-item label="绑定手机号">
                <el-input type="text" :placeholder="userInfo.telephone | telephoneFormat" style="width: 200px"
                          disabled></el-input>
              </el-form-item>
              <el-form-item label="验证码">
                <el-input type="text" v-model="setVerify" placeholder="输入验证码" style="width: 100px"></el-input>
                <verify-button
                  :telephone="userInfo.telephone"
                  :isSendSuccessTo="isSendSuccess"
                  :vbwidth="92"
                  :vbpadding="{vertical:13,align:0}"
                  @setSendSuccessStatus="setSendSuccessStatus">
                </verify-button>
              </el-form-item>
              <el-form-item style="padding-top: 10px">
                <el-button type="danger" @click="updateTelNextHandler" style="padding: 8px 20px;margin-left: 30px">下一步
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-else class="us-telephone-wrapper">
            <el-form label-width="100px">
              <el-form-item label="输入新手机">
                <el-input type="text" v-model="setTelephone" placeholder="输入新手机" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="验证码">
                <el-input type="text" v-model="setVerify" placeholder="输入验证码" style="width: 100px"></el-input>
                <verify-button
                  :telephone="setTelephone"
                  :isSendSuccessTo="isSendSuccess"
                  :vbwidth="92"
                  :vbpadding="{vertical:13,align:0}"
                  @setSendSuccessStatus="setSendSuccessStatus">
                </verify-button>
              </el-form-item>
              <el-form-item style="padding-top: 10px">
                <el-button type="danger" @click="updateTelHandler" style="padding: 8px 20px;margin-left: 30px">修改
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="绑定邮箱" name="email">
        <div class="user-set-email-wrapper">
          <div class="us-title-wrapper">
            <el-divider content-position="left"><span>绑定邮箱</span></el-divider>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="绑定账号" name="oauth">
        <div class="user-set-oauth-wrapper">
          <div class="us-title-wrapper">
            <el-divider content-position="left"><span>绑定账号</span></el-divider>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="登录记录" name="record">
        <div class="user-set-record-wrapper">
          <div class="us-title-wrapper">
            <el-divider content-position="left"><span>登录记录</span></el-divider>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {updatePassword, updateTelephone} from "@/api/usetSet";
  import VerifyButton from '@/components/VerifyButton'

  export default {
    name: "userSet",
    components: {
      VerifyButton
    },
    data() {
      var validateOldPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.pwdRuleForm.checkPass !== '') {
            this.$refs.pwdRuleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.pwdRuleForm.pass) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };
      return {
        safeLevel: 4,
        colors: ['#fe', '#F7BA2A', '#FF9900'],
        userSetTabsValue: 'home',
        setVerify: '',
        setTelephone: '',
        isSendSuccess: false,
        isNextByUpdateTel: false,
        pwdRuleForm: {
          oldPass: '',
          pass: '',
          checkPass: ''
        },
        rules: {
          oldPass: [
            {validator: validateOldPass, trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validateCheckPass, trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
      verifyBtonStyle() {
        return {
          backgroundColor: '#fe0000',
          color: '#ffffff'
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
        if (this.regTelephone === '')
          return ''
        else if (this.isSendSuccess === true)
          return ''
        else
          return this.verifyBtonStyle
      },
      isDisabled() {
        if (this.regTelephone === '')
          return true
        else if (this.isSendSuccess === true)
          return true
        else
          return false
      }
    },
    methods: {
      //切换账户设置Tabs触发
      userSetClickTrigger(targetName) {
        this.setTelephone = ''
        this.setVerify = ''
        this.isSendSuccess = false
      },
      //修改密码按钮
      updatePwdHandler(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updatePassword({
              userId: this.userInfo.id,
              oldPassword: this.pwdRuleForm.oldPass,
              newPassword: this.pwdRuleForm.pass
            }).then(response => {
              this.$tip.success('修改成功')
              setTimeout(() => {
                this.$store.dispatch('Logout').then(() => {
                  document.getElementById('nav-logo').click()
                })
              }, 1500)
            })
          } else {
            return false;
          }
        });
      },
      resetPwd(formName) {
        this.$refs[formName].resetFields();
      },
      //修改手机号下一步
      updateTelNextHandler() {
        if (!this.isSendSuccess) {
          this.$tip.error('请发送验证码')
        } else if (this.setVerify === '') {
          this.$tip.error('验证码不能为空')
        } else {
          this.isNextByUpdateTel = true
          this.isSendSuccess = false
          this.setVerify = ''
        }

      },
      //修改手机号
      updateTelHandler() {
        if (this.setTelephone === '') {
          this.$tip.error('手机号不能为空')
        } else if (!this.isSendSuccess) {
          this.$tip.error('请发送验证码')
        } else if (this.setVerify === '') {
          this.$tip.error('验证码不能为空')
        } else {
          updateTelephone({
            userId: this.userInfo.id,
            oldTelephone:this.userInfo.telephone,
            newTelephone: this.setTelephone,
            setVerify: this.setVerify
          }).then(response => {
            this.$tip.success('修改成功')
            this.userSetTabsValue = 'home'
          })
        }
      },
      //设置验证码按钮发送状态
      setSendSuccessStatus(status) {
        this.isSendSuccess = status
      }
    },
    filters: {
      telephoneFormat(val) {
        return val.substring(0, 3) + "****" + val.substring(7)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #user-set {
    //首页
    .user-set-home-wrapper {
      padding: 0 20px;
      .ush-title-name {
        width: 150px;
        height: 30px;
        line-height: 31px;
        text-align: center;
        background-color: #333333;
        span {
          color: white;
          font-size: 16px;
        }
      }
      .ush-row-one-wrapper {
        height: 40px;
        .ush-text-top {
          font-size: 20px;
          font-weight: bold;
          float: left;
        }
        .ush-rate {
          padding-top: 3px;
          float: left;
        }
        .ush-img {
          float: left;
          margin-left: 18px;
          margin-top: -3px;
        }
      }
      .usht-text-wrapper {
        float: left;
        margin-left: 8px;
        color: #2BBA4D;
      }
      .ush-row-two-wrapper {
        margin-top: 34px;
        .ush-two-wrapper {
          margin-top: 40px;
          padding: 0 80px;
          .usht-img-wrapper {
            float: left;
          }
        }
      }
      .ush-row-three-wrapper {
        margin-top: 40px;
        .ush-three-wrapper {
          margin-top: 40px;
          padding: 0 80px;
          .usht-left {
            float: left;
          }
        }
      }
    }
    //标题
    .us-title-wrapper {
      span {
        font-size: 20px;
        font-weight: bold;
      }
    }
    //修改密码
    .user-set-password-wrapper {
      padding: 0px 20px;
      .us-password-wrapper {
        padding: 30px 200px 0 100px;
      }
    }
    //修改手机
    .user-set-telephone-wrapper {
      padding: 0px 20px;
      .us-telephone-wrapper {
        padding: 30px 200px 0 170px;
        .us-verify-button {
          margin-left: 10px;
          padding: 8px 0px;
          width: 110px;
          background-color: #F7F7F7;
          border: 1px solid #F7F7F7;
          color: #C4C4C4;
          font-size: 12px;
        }
      }
    }
    //绑定邮箱
    .user-set-email-wrapper {
      padding: 0px 20px;
    }
    //绑定账号
    .user-set-oauth-wrapper {
      padding: 0px 20px;
    }
    //登录记录
    .user-set-record-wrapper {
      padding: 0px 20px;
    }
  }
</style>
