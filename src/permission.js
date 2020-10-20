import router from "./router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import {getToken} from '@/utils/auth'
import {Message, MessageBox} from 'element-ui'


router.beforeEach((to, from, next) => {
  if (getToken()) {
    console.log();
    if (to.meta.isLoadingNprogress) {
      //进度条样式
      NProgress.inc(0.2)
      NProgress.configure({easing: 'ease', speed: 300, showSpinner: false})
      //出现进度条
      NProgress.start()
    }
    if(to.meta.title === '404'){
      next()
    }else{
      store.dispatch('GetInfo',to.meta.isLoadingNprogress).then(response => {
        console.log("获取用户信息");
        next()
      }).catch(error => {
        console.log(error);
      })
    }
  } else {
    if(to.path !== '/home'){
      if(to.matched[0].path === '/usr' || to.matched[0].path === '/manage'){
        //说明是从主页面home点击的
        if(from.fullPath === '/'){
          Message({
            message: "用户登录信息已失效，正在为您跳转到首页",
            type: 'success',
            center: true,
            offset: 70,
            duration: 1.5 * 1000
          })
          setTimeout(()=>{
            next('/home')
          },1500)
        }else{
          Message({
            message: "用户登录信息已失效，正在为您跳转到首页",
            type: 'success',
            center: true,
            offset: 70,
            duration: 1.5 * 1000
          })
          setTimeout(()=>{
            document.getElementById("nav-logo").click()
          },1500)
        }
      }
    }
    else
      next()
  }
})
router.afterEach(() => {
  //隐藏进度条
  NProgress.done()
})

