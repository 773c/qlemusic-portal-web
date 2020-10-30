<template>
  <div>
    <el-upload
      ref="singleUpload"
      action="useOss?ossUploadUrl:minioUploadUrl"
      :data="useOss?dataObj:null"
      :http-request="uploadHandler"
      :file-list="fileList"
      :show-file-list="false"
      :before-upload="beforeUploadHandler"
      :on-change="changeHandler"
      :on-remove="removeHandler"
      :on-preview="previewHandler"
      :on-success="uploadSuccessHandler"
      :limit="2"
      :drag="avatar==='audio' || isSelectAvatar===true?false:true"
      :auto-upload="false">
      <div v-if="avatar==='audio'" style="border: 1px dashed #d9d9d9;border-radius: 6px;">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <div v-else>
        <div v-if="!isSelectAvatar">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em> 点击上传</em></div>
        </div>
        <div v-else>
          <el-avatar :size=120 :src="imageUrl"></el-avatar>
        </div>
      </div>
      <div class="el-upload__tip" slot="tip" style="color: #999999">*上传反动、色情等照片将导致您的账号被删除</div>
    </el-upload>
  </div>
</template>

<script>
  import {policy} from "@/api/oss";

  export default {
    name: "singleUpload",
    props: {
      value: String,
      isUpdateAvatar: {
        type: Boolean,
        default: false
      },
      uniqueId: String,
      avatar: String
    },
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
        imageUrl: '',
        isSelectAvatar: false,
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
        this.$refs.singleUpload.submit()
      },
      //选择文件后触发
      changeHandler(file, fileList) {
        const isImg = file.raw.type === 'image/jpeg';
        const isLt3M = file.raw.size / 1024 / 1024 < 3;

        if (!isImg) {
          this.$message.error('上传文件只能是图片格式!');
        }
        if (!isLt3M) {
          this.$message.error('上传文件大小不能超过 3MB!');
        }
        if (isImg && isLt3M) {
          this.$emit('selectAvatar', true)
          this.isSelectAvatar = true
          this.imageUrl = URL.createObjectURL(file.raw);
          //将文件存入fileList
          this.fileList.push(file)
          //设置头像切换机制(到达2张后，移除前面一张)
          if (fileList.length === 2) {
            fileList.splice(0, 1)
            this.fileList.splice(0, 1)
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
              this.$emit('setAudioAvatar', file.raw)
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
      },
      //点击预览图片
      previewHandler(file) {
      },
      //自定义上传
      uploadHandler() {
        let formData = new FormData();
        //如果是发布作品的音乐封面
        this.fileList.forEach(file => {
          formData.append("file", file.raw)
        })
        formData.append("ossUploadUrl", this.ossUploadUrl)
        if (this.avatar === 'audio') {
          this.$emit('releaseHandler', formData)
        } else {
          this.$emit('updateAvatarHandler', formData)
        }


      },
      //上传文件之前触发
      beforeUploadHandler(file) {
      },
      //上传文件成功后触发(自定义网络请求则会失效)
      uploadSuccessHandler(res, file) {
        //图片oss地址
        let url = this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name;
        if (!this.useOss) {
          //不使用oss直接获取图片路径
          url = res.data.url;
        }
        this.fileList.push({name: file.name, url: url});
        // this.$emit('updateAvatarHandler', url)
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
