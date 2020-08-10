<template>
  <!--手机号登录-->
  <div class="tabs-tel-content">
    <label class="tabs-label">手机号</label>
    <br>
    <el-input type="text" v-model="logTelephone" class="tabs-telephone tabs-input" placeholder="请输入手机号">
      <el-select v-model="select" slot="prepend">
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
    <el-button class="verify-button" type="primary" :style=""
               :disabled="logTelephone==''?true:false">
      发送验证码
    </el-button>
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
    <el-button class="tabs-log-button" type="danger" round @click="telLogBtonHandler" :disabled="btonShow">登录
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
</template>

<script>
  export default {
    name: "logTelephone"
  }
</script>

<style scoped>

</style>
