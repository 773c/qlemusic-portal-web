<template>
  <div id="user-set">
    <el-tabs tab-position="left" type="border-card"
             style="height: 787px;border: none;border-top:1px solid #e4e4e4;box-shadow: none">
      <el-tab-pane label="账号设置首页">
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
              <div class="usht-left">
                <img src="" alt="">
                <span>安全</span>
              </div>
              <div>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
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
                <img src="" alt="">
                <span>安全</span>
              </div>
              <div>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
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
                <img src="" alt="">
                <span>安全</span>
              </div>
              <div>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
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
                <img src="" alt="">
                <span>安全</span>
              </div>
              <div>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
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
                <img src="" alt="">
                <span>安全</span>
              </div>
              <div>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改密码">修改密码</el-tab-pane>
      <el-tab-pane label="修改邮箱">修改邮箱</el-tab-pane>
      <el-tab-pane label="绑定账号">绑定账号</el-tab-pane>
      <el-tab-pane label="登录记录">绑定账号</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "userSet",
    data(){
      return {
        safeLevel:5,
        colors: ['#fe', '#F7BA2A', '#FF9900'],
      }
    }
  }
</script>

<style lang="scss" scoped>
  #user-set {
    .user-set-home-wrapper {
      padding: 0 20px;
      .ush-title-name{
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
      .ush-row-one-wrapper{
        height: 40px;
        .ush-text-top{
          font-size: 20px;
          font-weight: bold;
          float: left;
        }
        .ush-rate{
          padding-top: 3px;
          float: left;
        }
        .ush-img{
          float: left;
          margin-left: 18px;
          margin-top: -3px;
        }
      }
      .ush-row-two-wrapper{
        margin-top: 34px;
        .ush-two-wrapper{
          margin-top: 40px;
          padding: 0 80px;
          .usht-left{
            float: left;
          }
        }
      }
      .ush-row-three-wrapper{
        margin-top: 40px;
        .ush-three-wrapper{
          margin-top: 40px;
          padding: 0 80px;
          .usht-left{
            float: left;
          }
        }
      }
    }
  }
</style>
