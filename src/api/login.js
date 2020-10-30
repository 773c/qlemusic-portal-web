import request from '@/utils/request'

export function sendSms(telephone) {
  return request({
    url:'/user/sendSms',
    method:'post',
    params:{
      telephone:telephone
    }
  })
}

export function register(data){
  return request({
    url:'/user/telRegister',
    method:'post',
    data:data
  })
}

export function matchVerify(data) {
  return request({
    url:'/user/matchVerify',
    method:'post',
    data:data
  })
}

export function login(data) {
  return request({
    url:'/user/login',
    method:'post',
    data:data
  })
}

export function getInfo(isLoadingNprogress) {
  return request({
    url:'/user/info',
    method:'get',
    headers:{
      isLoadingNprogress:isLoadingNprogress
    }
  })
}

export function logout() {
  return request({
    url:'/user/logout',
    method:'post'
  })
}
