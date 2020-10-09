<template>
  <div id="audio-single-upload">
    <el-upload
      ref="audioSingleUpload"
      action="useOss?ossUploadUrl:minioUploadUrl"
      list-type="picture"
      :data="useOss?dataObj:null"
      :http-request="uploadHandler"
      :file-list="fileList"
      :before-upload="beforeUploadHandler"
      :on-change="changeHandler"
      :on-remove="removeHandler"
      :on-preview="previewHandler"
      :on-success="uploadSuccessHandler"
      :limit="2"
      drag
      :auto-upload="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em> 点击上传</em></div>
    </el-upload>
  </div>
</template>

<script>
  import {policy} from "@/api/oss";

  export default {
    name: "audioSingleUpload",
    data() {
      return {
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: ''
        },
        audioUrl: '',
        useOss: true, //true为oss，false为minio
        ossUploadUrl: 'http://qlmusic-oss1.oss-cn-zhangjiakou.aliyuncs.com/',
        minioUploadUrl: 'http://localhost:8080/minio/upload',
      }
    },
    computed: {
      fileList() {
        let fileList = [];
        if (this.value !== undefined && this.value !== '' && this.value !== null) {
          fileList.push({url: this.value})
        }
        return fileList
      }
    },
    methods: {
      //父组件需要调用时的手动提交
      submit() {
        this.$refs.audioSingleUpload.submit()
      },
      //选择文件后触发
      changeHandler(file, fileList) {
        console.log(file);
        const isAudio = file.raw.type === 'audio/mpeg';
        const isLt20M = file.raw.size / 1024 / 1024 < 20;

        if (!isAudio) {
          this.$message.error('上传文件只能是音频( mp3 )格式');
        }
        if (!isLt20M) {
          this.$message.error('上传文件大小不能超过 20MB!');
        }
        if(isAudio && isLt20M){
          //将文件存入fileList
          this.fileList.push(file)
          //设置文件切换机制
          if (fileList.length === 2) {
            fileList.splice(0, 1)
          }
          let _self = this;
          if (!this.useOss) {
            //不使用oss不需要获取策略
            return true;
          }
          return new Promise((resolve, reject) => {
            policy().then(response => {
              let data = response.data
              _self.dataObj.policy = data.policy;
              _self.dataObj.signature = data.signature;
              _self.dataObj.ossaccessKeyId = data.accessKeyId;
              _self.dataObj.key = data.dir + '/${filename}';
              _self.dataObj.dir = data.dir;
              _self.dataObj.host = data.host;
              this.$emit('setAudioSrc',file.url)
              resolve(true) //为true则执行成功
            }).catch(err => {
              console.log(err)
              reject(false)
            })
          })
        }
      },
      //移除文件后触发
      removeHandler(file, fileList) {
        console.log(file);
      },
      //点击预览图片
      previewHandler(file) {
      },
      //自定义上传
      uploadHandler() {

        console.log("上传音频文件");
        let formData = new FormData();
        this.fileList.forEach(file => {
          formData.append("file", file.raw)
        })
        formData.append("ossUploadUrl", this.ossUploadUrl)
        this.$emit('releaseHandler', formData)
      },
      //上传文件之前触发
      beforeUploadHandler(file) {
        console.log('beforeUploadHandler');
      },
      //上传文件成功后触发(自定义网络请求则会失效)
      uploadSuccessHandler(res, file) {
        console.log("上传成功");
        //图片oss地址
        let url = this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name;
        if (!this.useOss) {
          //不使用oss直接获取图片路径
          url = res.data.url;
        }
        this.fileList.push({name: file.name, url: url});
        // this.$emit('updateAvatarHandler', url)
      }
    },
    activated(){
      console.log("1");
    }
  }
</script>

<style lang="scss" scoped>
</style>
