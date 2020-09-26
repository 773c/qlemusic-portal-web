<template>
  <el-menu
    :default-active="$route.path"
    class="navbar"
    mode="horizontal"
    style="border-bottom-color: black"
    background-color="#000000"
    text-color="#fff"
    active-text-color="#ff2a00 ">
    <!--mobile菜单按钮-->
    <el-menu-item class="menu-button">
      <img src="@/assets/images/menu.png" width="26" height="26">
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
    <el-menu-item class="el-menu-item-select" index="/select">
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
    </el-menu-item>

    <!--导航链接-->
    <slot name="after-one"></slot>
    <slot name="after-two"></slot>
    <slot name="after-three"></slot>
    <slot name="after-four"></slot>

    <!--用户-->
    <slot name="user"></slot>
  </el-menu>
</template>

<script>
  import Drawer from '@/components/Drawer'

  export default {
    name: "index",
    data() {
      return {
        selectBox: '',
        isShowContent: false
      }
    },
    components: {
      Drawer
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
        if (this.$store.state.app.device === 'mobile') {
          this.isShowContent = false;
        } else {
          this.isShowContent = true;
        }
      },
      hideContent() {
        this.isShowContent = false;
      }
    }
  }
</script>

<style scoped>

</style>
