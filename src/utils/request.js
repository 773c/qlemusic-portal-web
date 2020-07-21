import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../store'

const service = axios.create({
  baseURL: 'http://47.94.161.88:8001',
  timeout: 15000
})

// 请求拦截
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error);
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
})

export default service
