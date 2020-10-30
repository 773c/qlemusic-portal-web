<template>
  <div id="middle2">
    <!--背景封面-->
    <div style="z-index: 998;">
      <div class="personal-head-bg-wrapper">
        <div class="personal-head-content-wrapper">
          <div class="personal-avatar-warpper">
            <div class="avatar-warpper" @mouseover="avatarHover(true)" @mouseout="avatarHover(false)"
                 @click="showUpdateAvatar">
              <el-avatar :size="device !== 'mobile'?95:75" :src="userInfo.avatar"></el-avatar>
              <div class="update-avatar-div" v-show="isUpdateAvatar">更换头像</div>
            </div>
            <el-dialog :visible.sync="updateAvatarDialogVisible"
                       title="上传头像"
                       width="600px"
                       :append-to-body="true"
                       :close-on-click-modal="false"
                       :modal-append-to-body="false"
                       :close-on-press-escape="false">
              <single-upload
                ref="singleUpload"
                :isUpdateAvatar="isUpdateAvatar"
                :uniqueId="userInfo.uniqueId"
                :avatar="'user'"
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
            <div class="music-age" align="center">
              <el-tag type="info" size="mini" effect="plain">乐龄{{musicAge}}</el-tag>
            </div>
          </div>
          <div class="personal-name-warpper">{{userInfo.name}}</div>
        </div>
      </div>
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
  import {updateAvatar} from "@/api/userInfo";

  export default {
    name: "middle2",
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
      device() {
        return this.$store.state.app.device
      },
      ...mapGetters([
        'userInfo'
      ]),
      musicAge() {
        return this.timeFormatToDay(this.userInfo.createTime)
      }
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
        fileList.append("id", this.userInfo.id)
        fileList.append("uniqueId", this.userInfo.uniqueId)
        updateAvatar(fileList).then(response => {
          this.updateAvatarDialogVisible = false
          this.userInfo.avatar = fileList.get("ossUploadUrl") + response.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
