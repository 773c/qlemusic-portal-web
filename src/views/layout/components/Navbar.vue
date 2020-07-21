<template>
  <common-navbar>
    <template #logo>
      <a class="a-logo" href="/"><img class="img-logo" src="@/assets/images/flogo.png" width="70" height="68"></a>
    </template>
    <template #one>
      <router-link class="nav-router-link" to="/">
        <el-menu-item index="/home">
          <span>黑怕家园</span>
        </el-menu-item>
      </router-link>
    </template>
    <template #two>
      <router-link class="nav-router-link" to="/nav/download">
        <el-menu-item index="/nav/download">
          <span>下载</span>
        </el-menu-item>
      </router-link>
    </template>
    <template #three>
      <router-link class="nav-router-link" to="/nav/question">
        <el-menu-item index="/nav/question">
          <span>问题</span>
        </el-menu-item>
      </router-link>
    </template>
    <!--收藏-->
    <template #after-one>
      <el-dropdown class="collect-container">
        <div class="collect-wrapper">
          <svg-icon class="svg-collect" icon-class="nav-collect"></svg-icon>
        </div>
        <el-dropdown-menu class="collect-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <!--消息-->
    <template #after-two>
      <el-dropdown class="info-container">
        <div class="info-wrapper">
          <svg-icon class="svg-info" icon-class="nav-info"></svg-icon>
        </div>
        <el-dropdown-menu class="info-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <!--用户信息-->
    <template #user>
      <div class="login-container" v-if="isLogin" @click="dialogVisible = true">
        登录
      </div>
      <el-dialog
        :visible.sync="dialogVisible"
        class="el-dialog-user"
        width="435px"
        :modal-append-to-body="false"
        :close-on-press-escape="false">
        <div slot="title" class="el-dialog-title">
          <svg-icon icon-class="dialog-user"></svg-icon>
        </div>
        <div v-if="logOrReg" class="el-dialog-tabs">
          <div class="tabs-title" @click="changeTitleHandler('账号登录')">账号登录</div>
          <div class="tabs-title" @click="changeTitleHandler('手机验证码')">手机验证码</div>
          <!--账号登录-->
          <div v-if="isShow" class="tabs-log-content tabs-content">
            <label for="username" class="tabs-label">账号</label><br>
            <input type="text" id="username" class="tabs-username tabs-input" placeholder="请输入手机号"><br><br>
            <label for="password" class="tabs-label">密码</label><br>
            <input type="text" id="password" class="tabs-password tabs-input" placeholder="请输入密码"><br><br>
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
                @passcallback="passcallback2">
              </drag-verify>
            </el-row>
            <br><br>
            <el-button class="tabs-log-button" type="danger" round @click="dialogVisible = false" disabled>登录
            </el-button>
            <br><br>
            <el-row class="tabs-reg-forget">
              <el-col :span="17">
                <div class="tabs-reg" @click="regClickHandler()">注册</div>
              </el-col>
              <el-col :span="7">
                <a href="">忘记密码？</a>
              </el-col>
            </el-row>
            <el-row class="tabs-oauth" type="flex" justify="center">
              <el-col :span="3">
                <img src="@/assets/images/qq.png" alt="qq" width="32" height="32">
              </el-col>
              <el-col :span="3">
                <img src="@/assets/images/weixin.png" alt="qq" width="32" height="32">
              </el-col>
            </el-row>
          </div>
          <!--手机号登录-->
          <div v-else class="tabs-tel-content tabs-content">
            <el-label for="telephone" class="tabs-label">手机号</el-label>
            <br>
            <el-input type="text" v-model="telephone" class="tabs-telephone tabs-input" placeholder="请输入手机号">
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
            <label for="verify" class="tabs-label">验证码</label><br>
            <input type="text" id="verify" class="tabs-verify tabs-input" placeholder="请输入验证码">
            <el-button class="verify-button" type="primary" :style="isClick" :disabled="telephone==''?true:false">发送验证码</el-button>
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
                @passcallback="passcallback2">
              </drag-verify>
            </el-row>
            <br><br>
            <el-button class="tabs-log-button" type="danger" round @click="dialogVisible = false" disabled>登录
            </el-button>
            <br><br>
            <el-row class="tabs-reg-forget">
              <el-col :span="17">
                <div class="tabs-reg" @click="regClickHandler()">注册</div>
              </el-col>
              <el-col :span="7">
                <a href="#" @click="regClickHandler()">联系客服</a>
              </el-col>
            </el-row>
          </div>
        </div>
        <!--注册-->
        <div v-else class="el-dialog-tabs el-dialog-tabs-reg">
          <div class="tabs-title" >新用户注册</div>
          <div class="tabs-tel-content tabs-content">
            <el-label for="telephone" class="tabs-label">手机号</el-label>
            <br>
            <el-input type="text" v-model="telephone" class="tabs-telephone tabs-input" placeholder="请输入手机号">
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
            <label for="verify2" class="tabs-label">验证码</label><br>
            <input type="text" id="verify2" class="tabs-verify tabs-input" placeholder="请输入验证码">
            <el-button class="verify-button" type="primary" :style="isClick" :disabled="telephone==''?true:false">发送验证码</el-button>
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
                @passcallback="passcallback2">
              </drag-verify>
            </el-row>
            <br><br>
            <el-button class="tabs-log-button" type="danger" round @click="dialogVisible = false" disabled>注册
            </el-button><br><br><br>
            <div class="tabs-reg-return-log" align="center" @click="logClickHandler">
              返回登录
            </div>
          </div>
        </div>
      </el-dialog>
      <!--<el-dropdown class="avatar-container">-->
      <!--<div class="avatar-wrapper">-->
      <!--<img class="user-avatar" :src="avatar">-->
      <!--</div>-->
      <!--<el-dropdown-menu class="user-dropdown" slot="dropdown">-->
      <!--<router-link class="inlineBlock" to="/">-->
      <!--<el-dropdown-item>-->
      <!--个人中心-->
      <!--</el-dropdown-item>-->
      <!--</router-link>-->
      <!--<router-link class="inlineBlock" to="/">-->
      <!--<el-dropdown-item>-->
      <!--我的收藏-->
      <!--</el-dropdown-item>-->
      <!--</router-link>-->
      <!--<router-link class="inlineBlock" to="/">-->
      <!--<el-dropdown-item>-->
      <!--我的关注-->
      <!--</el-dropdown-item>-->
      <!--</router-link>-->
      <!--<router-link class="inlineBlock" to="/">-->
      <!--<el-dropdown-item>-->
      <!--账号设置-->
      <!--</el-dropdown-item>-->
      <!--</router-link>-->
      <!--<router-link class="inlineBlock" to="/">-->
      <!--<el-dropdown-item divided>-->
      <!--我的动态-->
      <!--</el-dropdown-item>-->
      <!--</router-link>-->
      <!--<router-link class="inlineBlock" to="/">-->
      <!--<el-dropdown-item>-->
      <!--我的下载-->
      <!--</el-dropdown-item>-->
      <!--</router-link>-->
      <!--<router-link class="inlineBlock" to="/">-->
      <!--<el-dropdown-item divided>-->
      <!--退出-->
      <!--</el-dropdown-item>-->
      <!--</router-link>-->
      <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
    </template>
  </common-navbar>
</template>

<script>
  import CommonNavbar from '@/components/Navbar'
  import DragVerify from '@/components/DragVerify'

  export default {
    name: "navbar",
    components: {
      CommonNavbar,
      DragVerify
    },
    data() {
      return {
        dialogVisible: false,
        innerVisible: true,
        title: '登录',
        isLogin: true,
        isShow: true,
        logOrReg:true,
        select: '',
        telephone: '',
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
      };
    },
    computed: {
      isClick() {
        if (this.telephone !== '') {
          return {
            backgroundColor: '#fe0000',
            color:'#ffffff'
          }
        }
      },
      isPassing(){

      }
    },
    methods: {
      changeTitleHandler(title) {
        if (title === '账号登录') {
          this.isShow = true
        } else {
          this.isShow = false
        }
      },
      regClickHandler(){
        this.logOrReg = false
      },
      logClickHandler(){
        this.logOrReg = true
      },
      reset() {
        console.log("重置滑块");
        this.isPassing = false;
        if (this.$refs.dragVerify != undefined) {
          this.$refs.dragVerify.reset();
        }
      },
      passcallback2() {
        console.log("滑块验证成功走的方法");
      },

    }
  }
</script>

<style scoped>

</style>
