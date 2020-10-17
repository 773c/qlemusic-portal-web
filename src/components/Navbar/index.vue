<template>
  <div style="z-index: 999">
    <el-menu
      :default-active="$route.path"
      class="navbar"
      mode="horizontal"
      style="border-bottom-color: #999999;"
      :style="userFormatStyle"
      text-color="#fff"
      active-text-color="#ff2a00">
      <!--mobile菜单按钮-->
      <el-menu-item class="menu-button">
        <img src="@/assets/images/menu.png" width="22" height="22">
      </el-menu-item>
      <!--logo图标-->
      <el-menu-item class="el-menu-item-first">
        <slot name="logo"></slot>
      </el-menu-item>
      <!--导航链接-->
      <div class="nav-link">
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
      <div class="el-menu-item-select">
        <el-input
          placeholder="请输入内容"
          v-model="selectBox"
          class="select-box"
          size="small"
          @focus="showContent"
          @blur="hideContent">
          <el-button type="danger" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-card class="select-content" v-show="isShowContent">
          asdas
        </el-card>
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
        <div class="right-user"><slot name="user"></slot></div>
      </div>
    </el-menu>
  </div>
</template>

<script>
  import Drawer from '@/components/Drawer'

  export default {
    name: "index",
    components: {
      Drawer
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
        isShowContent: false
      }
    },
    computed: {
      userFormatStyle() {
        return {
          backgroundColor: 'rgba(100,100,100,0.1)'
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
      //当为移动端时的显示
      showContent() {
        if (this.$store.state.app.device === 'mobile') {
          this.isShowContent = false;
        } else {
          this.isShowContent = true;
        }
      },
      //当为移动端时的隐藏
      hideContent() {
        this.isShowContent = false;
      }
    }
  }
</script>

<style scoped>
</style>
