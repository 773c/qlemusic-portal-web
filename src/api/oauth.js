import request from '@/utils/request'

export function qqLogin() {
  return request({
    url:'/oauth/qqLogin',
    method:'post'
  })
}

export function qqLoginAuthSuccess(params) {
  return request({
    url:'/oauth/qqLoginAuthSuccess',
    method:'get',
    params:params
  })
}
