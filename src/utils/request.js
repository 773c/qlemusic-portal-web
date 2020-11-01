import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../store'
import router from '../router'
import {getToken, removeToken} from "./auth";
import NProgress from 'nprogress'

const service = axios.create({
  baseURL: 'http://47.94.161.88:8001',  //47.94.161.88
  timeout: 15000
})

// 请求拦截
service.interceptors.request.use(config => {
  if (config.headers.isLoadingNprogress || config.headers.isLoadingNprogress == null) {
    //进度条样式
    NProgress.inc(0.2)
    NProgress.configure({easing: 'ease', speed: 300, showSpinner: false})
    //出现进度条
    NProgress.start()
  }
  if (store.getters.token) {
    //在Header设置名为Authorization的token
    config.headers.Authorization = getToken()
  }
  return config
}, error => {
  console.log(error);
  router.push('/404')
})

// 响应拦截
service.interceptors.response.use(response => {
  //隐藏进度条
  NProgress.done()
  const data = response.data
  if (data.statusCode !== 200) {
    Message({
      message: data.message,
      type: 'error',
      center: true,
      offset: 70,
      duration: 2 * 1000
    })
    return Promise.reject('error')
  } else {
    return data;
  }
}, error => {
  console.log(error);
  if(error.response.status === 4031){
    removeToken()
    router.push('/')
  } else if (router.app.$route.meta.isNeedUserAuth) {
    router.push('/404')
  } else {
    Message({
      message: '未知错误',
      type: 'error',
      center: true,
      offset: 70,
      duration: 2 * 1000
    })
  }
  return Promise.reject(error)
})

export default service
