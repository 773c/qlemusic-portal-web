import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../store'
import router from '../router'
import {getToken} from "./auth";

const service = axios.create({
  baseURL: 'http://localhost:8001',  //47.94.161.88
  timeout: 15000
})

// 请求拦截
service.interceptors.request.use(config => {
  console.log("请求拦截Cookie中的token：" + getToken());
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
  if(router.app.$route.name !== 'home')
    router.push('/404')
})

export default service
