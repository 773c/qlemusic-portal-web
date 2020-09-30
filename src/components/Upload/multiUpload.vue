<template>
  <div>
    <el-upload
      ref="multiUpload"
      :action="useOss?ossUploadUrl:minioUploadUrl"
      :data="useOss?dataObj:null"
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-change="changeHandler"
      :on-remove="removeHandler"
      :on-preview="previewHandler"
      :on-success="uploadSuccessHandler"
      :on-exceed="exceedHandler"
      :limit="maxCount"
      :auto-upload="false">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {policy} from "@/api/oss";

  export default {
    name: "multiUpload",
    props: {
      //图片属性数组
      value: Array,
      //最大上传图片数量
      maxCount:{
        type:Number,
        default:5
      }
    },
    data(){
      return {
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: ''
        },
        dialogVisible: false,
        dialogImageUrl:null,
        useOss:true,  //true为oss，false为minio
        ossUploadUrl:'http://qlmusic-oss1.oss-cn-zhangjiakou.aliyuncs.com',
        minioUploadUrl:'http://localhost:8080/minio/upload',
      }
    },
    computed:{
      fileList() {
        let fileList=[];
        console.log(fileList);
        return fileList;
      }
    },
    methods:{
      submit(){
        this.$refs.multiUpload.submit()
      },
      emitInput(fileList) {
        let value=[];
        for(let i=0;i<fileList.length;i++){
          value.push(fileList[i].url);
        }
      },
      //选择文件后触发
      changeHandler(file){
        //将文件存入fileList
        this.fileList.push(file)
        let _self = this;
        if(!this.useOss){
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
            this.$emit('input',data.host + '/' + data.dir + '/' + file.name)
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      },
      //移除文件后触发
      removeHandler(file, fileList) {
        this.emitInput(fileList);
      },
      //点击预览图片
      previewHandler(file) {
        this.dialogVisible = true;
        this.dialogImageUrl=file.url;
      },
      //上传文件之前触发
      beforeUpload(file) {
        console.log('beforeUpload');

      },
      //上传文件成功后触发
      uploadSuccessHandler(res, file) {
        let url = this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name;
        if(!this.useOss){
          //不使用oss直接获取图片路径
          url = res.data.url;
        }
        this.fileList.push({name: file.name,url:url});
        this.emitInput(this.fileList);
      },
      //限制图片上传数量
      exceedHandler(files, fileList) {
        this.$message({
          message: '最多只能上传'+this.maxCount+'张图片',
          type: 'warning',
          duration:1000
        });
      }
    }
  }
</script>

<style scoped>

</style>
