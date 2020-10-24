<template>
  <div style="z-index: 999">
    <el-menu
      :default-active="$route.path"
      class="navbar"
      mode="horizontal"
      style="border-bottom-color: #888888;width: 100%"
      :style="userFormatStyle"
      text-color="#fff"
      active-text-color="#ff2a00">
      <!--mobile菜单按钮-->
      <div class="menu-button">
        <img src="@/assets/images/menu.png" width="23" height="23">
      </div>
      <!--logo图标-->
      <div class="el-menu-item-first">
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
      <div class="nav-search-wrapper" >
        <div class="search bar">
          <form class="search-form">
            <input
              class="search-input"
              v-model="selectBox"
              type="text"
              :style="inputStyle"
              placeholder="南方姑娘姓邱"
              @click="showContent">
            <span class="search-button" >
              <i class="el-icon-search"></i>
            </span>
          </form>
        </div>
        <div v-if="device === 'mobile'?false:true" class="search-drawer-wrapper">
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
    </el-menu>
  </div>
</template>

<script>

  export default {
    name: "index",
    components: {
    },
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
        drawer:false
      }
    },
    computed: {
      device() {
        return this.$store.state.app.device
      },
      userFormatStyle() {
        return {
          backgroundColor: 'rgba(10,10,10,0.1)'
        }
      },
      inputStyle(){
        if(this.drawer){
          return {
            width:'30vw',
            borderBottom: '2px solid white'
          }
        }else {
          return {
            width:'22vw',
            borderBottom: '1px solid white'
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
      drawerCloseTrigger(){
        this.drawer = false
      }
    }
  }
</script>

<style scoped>
</style>
