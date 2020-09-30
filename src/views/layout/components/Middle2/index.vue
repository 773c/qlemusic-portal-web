<template>
  <div id="middle2">
    <!--导航栏背景图-->
    <div class="nav-bg-wrapper"></div>
    <!--背景封面-->
    <div class="head-bg-wrapper">
      <div class="personal-avatar-warpper">
        <div class="avatar-warpper" @mouseover="avatarHover(true)" @mouseout="avatarHover(false)"
             @click="showUpdateAvatar">
          <el-avatar :size=95 :src="userInfo.headIcon"></el-avatar>
          <div class="update-avatar-div" v-show="isUpdateAvatar">更换头像</div>
        </div>
        <el-dialog :visible.sync="updateAvatarDialogVisible"
                   title="上传头像"
                   width="600px"
                   :close-on-click-modal="false"
                   :modal-append-to-body="false"
                   :close-on-press-escape="false">
          <single-upload
            ref="singleUpload"
            :isUpdateAvatar="isUpdateAvatar"
            :uniqueId="userInfo.uniqueId"
            @selectAvatar="selectAvatar"
            @updateAvatarHandler="updateAvatarHandler"
            align="center">
          </single-upload>
          <br><br>
          <el-button v-show="!isSelectAvatar" type="info" style="font-size: 13px;margin-left: 250px" plain
                     size="small" @click="updateAvatarDialogVisible = false">取消
          </el-button>
          <el-button v-show="isSelectAvatar" type="success" style="font-size: 13px;margin-left: 233px"
                     size="small" @click="upload">上传并保存
          </el-button>
        </el-dialog>
        <div class="music-age" align="center">乐龄2年</div>
      </div>
      <div class="personal-name-warpper">{{userInfo.name}}</div>
    </div>
    <!--信息内容-->
    <div class="personal-content-wrapper">
      <!--导航栏-->
      <left2></left2>
      <!--内容-->
      <right2></right2>
    </div>
  </div>
</template>

<script>
  import Left2 from './components/Left2'
  import Right2 from './components/Right2'
  import {mapGetters} from 'vuex'
  import SingleUpload from '@/components/Upload/singleUpload'
  import {updateAvatar} from "@/api/user";

  export default {
    name: "index",
    components: {
      Left2,
      Right2,
      SingleUpload
    },
    data() {
      return {
        isUpdateAvatar: false,
        updateAvatarDialogVisible: false,
        isSelectAvatar: false,
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
    },
    methods: {
      //头像Hover样式
      avatarHover(value) {
        this.isUpdateAvatar = value
      },
      showUpdateAvatar() {
        this.updateAvatarDialogVisible = true
      },
      //是否选择了头像
      selectAvatar(value) {
        this.isSelectAvatar = value
      },
      //upload上传并修改
      upload() {
        this.$refs.singleUpload.submit()
      },
      //修改用户头像
      updateAvatarHandler(fileList) {
        console.log(fileList);
        fileList.append("id",this.userInfo.id)
        fileList.append("uniqueId",this.userInfo.uniqueId)
        updateAvatar(
            fileList
        ).then(response => {
          console.log(response);
          this.updateAvatarDialogVisible = false
          this.userInfo.headIcon = fileList.get("ossUploadUrl") + response.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
