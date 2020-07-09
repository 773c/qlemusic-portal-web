<template>
  <div id="home">
    <!--走马灯-->
    <el-carousel :interval="4000" type="card" height="230px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

    <el-card class="el-card-content el-card-middle" body-style="background-color:#222222;color:#ffffff;padding:0px">
      <div slot="header" class="clearfix">
        <span style="margin-left: 4px;font-weight: bold;color: white;font-size: 20px">推荐</span>
      </div>
      <div class="infinite-list-wrapper" style="overflow:auto;margin-left: -4px;">
        <ul
          class="list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
          style="height: 60%;margin-left: -36px;margin-top: 0px;background-color: #222222">
          <li v-for="i in pageSize" class="list-item" style="list-style-type:none;">
            <el-table ref="bbsMusicTable"
                      :data="list"
                      :show-header="false"
                      border>
              <el-table-column align="center">
                <template #default="scope" >
                  <div class="middle-title">
                    {{scope.row.title}}
                  </div>
                  <div class="middle-content-row">
                    {{scope.row.audioUrl}}111
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </li>
        </ul>
        <p v-if="loading">加载中...</p>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {getBbsMusicList} from "@/api/bbsMusic";

  const defaultBbsMusic = {
    title: '',
    audioUrl: '',
    total: 300
  }
  export default {
    name: "index",
    data() {
      return {
        pageSize: 0,
        loading: false,
        bbsMusic: Object.assign({}, defaultBbsMusic),
        list:null
      }
    },
    computed: {
      disabled() {
        return this.loading
      }
    },
    methods: {
      bbsMusicList(){
        getBbsMusicList().then(response => {
          console.log(response);
          let data = response.data;
          this.list = data
        })
      },
      load() {
        // 滚动条到最顶端的距离
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        // 滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        // 判断是否到达底部
        if (Math.ceil(scrollTop) + windowHeight == scrollHeight) {
          this.loading = true
          setTimeout(() => {
            this.pageSize += 2
            this.loading = false
          }, 2000)
        }
      }
    },
    created() {
      this.bbsMusicList()
      // if (this.bbsMusic.total < 15)
      //   this.pageSize = this.bbsMusic.total
      // else
      //   this.pageSize = 15
    },
    // mounted() {
    //   this.$nextTick(function () {
    //     window.addEventListener('scroll', this.load, true)
    //   })
    // },
    // destroyed() { //离开该页面需要移除这个监听的事件
    //   window.removeEventListener('scroll', this.load)
    // },
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
