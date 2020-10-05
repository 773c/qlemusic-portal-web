import router from "./router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import {getToken} from '@/utils/auth'

router.beforeEach((to, from, next) => {
  if (getToken()) {
    console.log(to.meta.isLoadingNprogress);
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
    console.log("getToken已过期");
    next()
  }
})
router.afterEach(() => {
  //隐藏进度条
  NProgress.done()
})

