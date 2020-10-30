<template>
  <div id="avatar-popover">
    <el-popover
      placement="top-start"
      width="300"
      offset="40"
      trigger="hover">
      <div class="bbsm-avatar-popover-wrapper">
        <div class="popover-top-content-wrapper">
          <div class="pt-avatar-wrapper" style="width: 65px;float: left;">
            <el-avatar :size=60 :src="avatarUrl"></el-avatar>
          </div>
          <div class="pt-user-info-wrapper" style="width: auto;margin-left: 75px;padding-top: 5px">
            <div class="pt-user-info-name">{{name}}</div>
            <div></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <hr style=" height:2px;border:none;border-top:1px solid #e9e9eb;margin-top: 65px"/>
        <div class="popover-bottom-content-wrapper">
          <div class="pb-into-home" style="float: left;height: 30px;">
            <el-button style="padding-top: 6px" type="text">进入主页</el-button>
          </div>
          <div class="pb-attention" style="float: right;">
            <el-button type="success" size="mini">关注</el-button>
          </div>
        </div>
      </div>
      <div class="bbsm-avatar-wrapper" slot="reference">
        <el-avatar :size='size' :src="avatarUrl"></el-avatar>
      </div>
    </el-popover>
  </div>
</template>

<script>
  export default {
    name: "avatarPopover",
    props:{
      avatarUrl:{
        type:String,
        default:''
      },
      name:{
        type:String,
        default:''
      },
      size:{
        type:Number,
        default:32
      }
    }
  }
</script>

<style lang="scss" scoped>
  #avatar-popover{
    //头像提示窗口
    .bbsm-avatar-popover-wrapper {
      .popover-top-content-wrapper {
        .pt-avatar-wrapper {
          float: left;
          width: 65px;
        }
        .pt-user-info-wrapper {
          .pt-user-info-name {

          }
        }
      }
      .popover-bottom-content-wrapper {
        .pb-into-home {

        }
        .pb-attention {

        }
      }
    }
    //头像
    .bbsm-avatar-wrapper{
      margin-top: 16px;
    }
    .bbsm-avatar-wrapper:hover{
      cursor: pointer;
    }
  }
</style>
