<template>
  <div @mouseenter="isHoverNav = true" @mouseleave="scrollTop === 0?isHoverNav = false:isHoverNav = true">
    <el-menu
      :default-active="$route.path"
      class="navbar"
      :class="navbarClass"
      mode="horizontal"
      :style="userFormatStyle"
      text-color="#fff"
      active-text-color="#ff2a00">
      <div class="navbar-content-wrapper">
        <!--mobile菜单按钮-->
        <div class="menu-button" @click="mobileMenuTrigger">
          <img src="@/assets/images/menu.png" width="23" height="23">
        </div>
        <!--logo图标-->
        <div class="logo-wrapper">
          <slot name="logo"></slot>
        </div>
        <!--导航链接-->
        <div class="nav-link-wrapper">
          <slot name="one"></slot>
          <slot name="two"></slot>
          <slot name="three"></slot>
          <slot name="four"></slot>
          <slot name="five"></slot>
          <slot name="six"></slot>
          <slot name="seven"></slot>
          <slot name="eight"></slot>
          <slot name="nine"></slot>
        </div>
        <!--搜索框-->
        <div class="nav-search-wrapper">
          <div class="search bar">
            <form class="search-form">
              <input
                class="search-input"
                v-model="selectBox"
                type="text"
                :style="inputStyle"
                placeholder="南方姑娘姓邱 😄"
                @click="showContent">
              <span class="search-button">
              <i class="el-icon-search" :style="drawer?{color:'white'}:{color:'#bbbbbb'}"></i>
            </span>
            </form>
          </div>
          <div v-show="device === 'mobile'?false:true" class="search-drawer-wrapper">
            <el-drawer
              class="search-drawer"
              :visible.sync="drawer"
              :modal="false"
              direction="ttb"
              :size="'40%'"
              :show-close="false"
              :withHeader="false">
            </el-drawer>
          </div>
        </div>

        <div class="nav-right-user">
          <!--导航链接-->
          <div class="right-link">
            <slot name="after-one"></slot>
            <slot name="after-two"></slot>
            <slot name="after-three"></slot>
            <slot name="after-four"></slot>
          </div>
          <!--用户-->
          <div class="right-user">
            <slot name="user"></slot>
          </div>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>

  export default {
    name: "index",
    components: {},
    props: {
      isUserFormat: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        selectBox: '',
        isShowContent: false,
        drawer: false,
        isHoverNav: false,
        scrollTop: 0
      }
    },
    computed: {
      device() {
        return this.$store.state.app.device
      },
      navbarClass() {
        return {
          scrollNavbar: true
        }
      },
      userFormatStyle() {
        if (this.isHoverNav) {
          return {
            backgroundColor: 'rgba(41, 17, 39,0.9)',
            borderBottomColor: 'rgba(10,10,10,0.1)',
            webkitTransition: '0.5s',
            mozTransition: '0.5s',
            oTransition: '0.5s',
            msTransition: '0.5s'
          }
        } else {
          return {
            backgroundColor: 'rgba(10,10,10,0)',
            borderBottomColor: 'rgba(10,10,10,0)',
            webkitTransition: '0.5s',
            mozTransition: '0.5s',
            oTransition: '0.5s',
            msTransition: '0.5s'
          }
        }
      },
      inputStyle() {
        if (this.drawer) {
          return {
            width: '30vw',
            borderBottom: '2px solid white'
          }
        } else {
          return {
            width: '22vw',
            borderBottom: '1px solid #bbbbbb'
          }
        }
      }
    },
    methods: {
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      },
      showContent() {
        this.drawer = true
      },
      drawerCloseTrigger() {
        this.drawer = false
      },
      mobileMenuTrigger(){

      },
      //当滚动条到达最底端的时候加载新内容
      load() {
        // 滚动条到最顶端的距离
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.scrollTop = scrollTop
        if (scrollTop === 0) {
          this.isHoverNav = false
        } else {
          this.isHoverNav = true
        }
      }
    },
    mounted() {
      this.$nextTick(function () {
        window.addEventListener('scroll', this.load)
      })

    },
    destroyed() { //离开该页面需要移除这个监听的事件
      window.removeEventListener('scroll', this.load)
    }
  }
</script>

<style scoped>
</style>
