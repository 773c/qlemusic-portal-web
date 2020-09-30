import request from '@/utils/request'

export function login(data) {
  return request({
    url:'/portal/login',
    method:'post',
    data:data
  })
}

export function getInfo(isLoadingNprogress) {
  return request({
    url:'/portal/info',
    method:'get',
    headers:{
      isLoadingNprogress:isLoadingNprogress
    }
  })
}

export function sendSms(telephone) {
  return request({
    url:'/portal/sendSms',
    method:'post',
    params:{
      telephone:telephone
    }
  })
}

export function register(telephone,password,rePassword){
  return request({
    url:'/portal/telRegister',
    method:'post',
    data:{
      telephone:telephone,
      password:password,
      rePassword:rePassword
    }
  })
}

export function matchVerify(telephone,verify) {
  return request({
    url:'/portal/matchVerify',
    method:'post',
    data:{
      telephone:telephone,
      verify:verify
    }
  })
}

export function logout() {
  return request({
    url:'/portal/logout',
    method:'post'
  })
}
