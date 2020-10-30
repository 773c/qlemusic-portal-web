<template>
  <div id="edit-music">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
      <el-form-item label="标题名称" prop="title">
        <el-input v-model="ruleForm.title" style="width: 550px"></el-input>
      </el-form-item>
      <el-form-item label="音乐封面" prop="audioAvatar">
        <single-upload
          ref="singleUpload"
          :avatar="'audio'"
          :model="ruleForm.audioAvatar"
          @setAudioAvatar="setAudioAvatar"
          @releaseHandler="releaseHandler">
        </single-upload>
      </el-form-item>
      <el-form-item label="音乐资源" prop="audioSrc">
        <audio-single-upload
          ref="audioSingleUpload"
          v-model="ruleForm.audioSrc"
          @setAudioSrc="setAudioSrc"
          @releaseHandler="releaseHandler">
        </audio-single-upload>
      </el-form-item>
      <el-form-item v-if="audioUrl !== ''">
        <ql-audio
          :audioUrl="audioUrl"
          :audioImgUrl="audioImgUrl"
          :isShowLineProgress="true"
          :bgImgStyle="{width:'490px'}"
          :startTime="'0'">
        </ql-audio>
      </el-form-item>
      <el-form-item v-if="audioUrl !== ''">
        <el-col :span="10" style="margin-left: -13px">
          <el-form-item label="开始时间" prop="startTime">
            <el-select v-model="ruleForm.startTime" filterable placeholder="请选择">
              <el-option
                v-for="item in startTimeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" style="margin-left: 10px">
          <el-form-item label="播放时长" prop="playTime">
            <el-input v-model="ruleForm.playTime" placeholder="播放时长">
              <template slot="append">s</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item v-if="audioUrl !== ''">
        <div class="progress-wrapper" style="margin-top: 20px;width: 535px">
          <el-progress :percentage="percentage" :status="progressStatus" :color="customColor">{{percentage}}
          </el-progress>
        </div>
      </el-form-item>
      <el-form-item style="padding-left: 210px;margin-top: 40px">
        <el-button type="danger" @click="release('ruleForm')">立即发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import AudioSingleUpload from '@/components/Upload/audioSingleUpload'
  import SingleUpload from '@/components/Upload/singleUpload'
  import {release} from "@/api/bbsMusic";

  export default {
    name: "editMusic",
    components: {
      AudioSingleUpload,
      SingleUpload
    },
    data() {
      return {
        audioUrl: '',
        audioImgUrl: '',
        startTimeOptions: [],
        fileList: [],
        percentage: 0,
        progressStatus: null,
        customColor: '#fe0000',
        ruleForm: {
          title: '',
          audioSrc: '',
          audioAvatar: '',
          startTime: '',
          playTime: ''
        },
        rules: {
          title: [
            {required: true, message: '请输入标题名称', trigger: 'blur'}
          ],
          audioSrc: [
            {required: true, message: '请上传音乐资源', trigger: 'blur'}
          ],
          audioAvatar: [
            {required: true, message: '请上传音乐封面图', trigger: 'blur'}
          ],
          startTime: [
            {required: true, message: '请输入截取开始时间', trigger: 'blur'}
          ],
          playTime: [
            {required: true, message: '请输入播放时长', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      setAudioSrc(audioUrl) {
        this.audioUrl = audioUrl
        this.ruleForm.audioSrc = audioUrl
      },
      setAudioAvatar(audioAvatar) {
        this.ruleForm.audioAvatar = audioAvatar.name
        this.audioImgUrl = URL.createObjectURL(audioAvatar)

      },
      release(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.audioSingleUpload.submit()
            this.$refs.singleUpload.submit()
          } else {
            return false
          }
        });
      },
      startTimeList() {
        for (let i = 0; i < 420; i++) {
          let mzeroPrefix = ''
          let szeroPrefix = ''
          let minutes = parseInt(i / 60, 10);
          let seconds = parseInt(i % 60);
          if (minutes < 10)
            mzeroPrefix = "0"
          if (seconds < 10) {
            szeroPrefix = "0"
          }
          this.startTimeOptions.push({
            value: i,
            label: mzeroPrefix + minutes + ":" + szeroPrefix + seconds
          })
        }
      },
      releaseHandler(fileList) {
        const load = this.$loading({
          lock: true,
          background: 'rgba(0, 0, 0, 0.1)'
        })
        this.fileList.push({
          file: fileList.get("file"),
          ossUploadUrl: fileList.get("ossUploadUrl")
        })
        let formData = new FormData();
        this.fileList.forEach(item => {
          formData.append("file", item.file)
        })
        if (formData.get("title") === null) {
          formData.append("title", this.ruleForm.title)
        }
        if (formData.get("userId") === null) {
          formData.append("userId", this.userInfo.id)
        }
        if (formData.get("startTime") === null) {
          formData.append("startTime", this.ruleForm.startTime)
        }
        if (formData.get("playTime") === null) {
          formData.append("playTime", this.ruleForm.playTime * 1000)
        }
        //等其中一个文件完成后再上传
        if (formData.getAll("file").length === 2) {
          //进度条
          var timer = setInterval(() => {
            this.percentage += 5;
            if(this.percentage > 100){
              this.percentage = 100
            }
          }, 1)
          release(formData).then(response => {
            this.percentage = 100;
            this.progressStatus = 'success'
            this.customColor = ''
            clearInterval(timer)
            load.close()
            this.$tip.success('发布成功')
            this.resetForm('ruleForm')
          }).catch(() => {
            load.close()
          })
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      this.startTimeList()
    }
  }
</script>

<style lang="scss" scoped>
  #edit-music {
    padding: 40px 120px;
  }
</style>
