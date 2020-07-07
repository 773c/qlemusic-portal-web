<template>
  <div id="home">
    <!--走马灯-->
    <el-carousel :interval="4000" type="card" height="230px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

    <el-card class="el-card-content" body-style="background-color:#222222;color:#ffffff">
      <div class="infinite-list-wrapper" style="overflow:auto">
        <ul
          class="list"
          v-infinite-scroll="load">
          <li v-for="i in count" class="list-item">{{ i }}</li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        count: 20,
        loading: false
      }
    },
    computed: {
      noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
      // load () {
      //   this.loading = true
      //   setTimeout(() => {
      //     this.count += 2
      //     this.loading = false
      //   }, 2000)
      // }
    }
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
