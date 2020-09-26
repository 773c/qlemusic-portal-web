import router from "./router";
import store from '@/store'
import {getToken} from '@/utils/auth'

router.beforeEach((to, from, next) => {
  if (getToken()) {
      store.dispatch('GetInfo').then(response => {
        console.log("获取用户信息");
        next()
      }).catch(error => {
        console.log(error);
      })
  } else {
    console.log("getToken已过期");
    next()
  }
})
router.afterEach(() => {
})
