<template>
  <div id="left2">
    <el-card class="left2-card" shadow="never" :style="heightStyle">
      <el-menu
        :default-active="$route.path"
        :router="true"
        style="border-right:none;width: 210px;margin-top: -10px">
        <el-menu-item index="/usr/personal">
          <i class="el-icon-user"></i>
          <span>个人资料</span>
        </el-menu-item>
        <el-menu-item index="/usr/collect">
          <i class="el-icon-star-off"></i>
          <span>我的收藏</span>
        </el-menu-item>
        <el-menu-item index="/home">
          <i class="el-icon-circle-plus-outline"></i>
          <span>我关注的人</span>
        </el-menu-item>
        <el-menu-item index="/home">
          <i class="el-icon-magic-stick"></i>
          <span>我的粉丝</span>
        </el-menu-item>
        <el-menu-item>
          <i class="el-icon-wallet"></i>
          <span>我的钱包</span>
        </el-menu-item>
        <el-menu-item>
          <i class="el-icon-paperclip"></i>
          <span>我的标签</span>
        </el-menu-item>
        <el-menu-item index="#manage" @click="clickForward">
          <i class="el-icon-aim"></i>
          <span>管理空间</span>
        </el-menu-item>
        <el-menu-item>
          <i class="el-icon-download"></i>
          <span>我的下载</span>
        </el-menu-item>
        <el-menu-item>
          <i class="el-icon-chat-round"></i>
          <span>我的问答</span>
        </el-menu-item>
      </el-menu>
    </el-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "left2",
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
    },
    data() {
      return {
        height: 488,
        top: 0,
        count: 0
      }
    },
    computed: {
      heightStyle() {
        return {
          height: this.height + 'px',
          marginTop: this.top + 'px'
        }
      }
    },
    methods: {
      //当滚动条到达最底端的时候加载新内容
      load() {
        // 滚动条到最顶端的距离
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        // 滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        //向下滚动时
        if (Math.ceil(scrollTop) >= this.count) {
          this.height += Math.ceil(scrollTop)
          this.top = -Math.ceil(scrollTop)
          this.count = Math.ceil(scrollTop)
          if (Math.ceil(scrollTop) >= 200) {
            this.height = 688
            this.top = -200
          }
        } else {
          //向上滚动
          if (Math.ceil(scrollTop) <= 200) {
            this.height += Math.ceil(scrollTop)
            this.top = -Math.ceil(scrollTop)
          } else if (Math.ceil(scrollTop) >= 200) {
            this.height = 688
            this.top = -200
          }
        }
      },
      clickForward() {
        let routeUrl = this.$router.resolve({
            path: '/manage/home'
          })
          window.open(routeUrl.href, '_blank');
      }
    },
    mounted() {
      this.$nextTick(function () {
        window.addEventListener('scroll', this.load, true)
      })
    },
    destroyed() { //离开该页面需要移除这个监听的事件
      window.removeEventListener('scroll', this.load)
    }
  }
</script>

<style scoped>

</style>
