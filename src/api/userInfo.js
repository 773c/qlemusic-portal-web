import request from '@/utils/request'

export function updateAccountInfo(data) {
  return request({
    url:'/user/updateInfo',
    method:'post',
    data:data
  })
}

export function updateUniqueId(data) {
  return request({
    url:'/user/updateUniqueId',
    method:'post',
    data: data
  })
}

export function isUpdateUniqueId(id,isLoadingNprogress) {
  return request({
    url:'/user/isUpdateUniqueId',
    method:'get',
    headers:{
      isLoadingNprogress:isLoadingNprogress
    },
    params: {
      id:id
    }
  })
}

export function updateAvatar(data) {
  return request({
    url:'/user/updateAvatar',
    method:'post',
    headers:{'Content-type': 'multipart/form-data;boundary = ' + new Date().getTime()},
    data: data
  })
}

export function userInfo(id,isLoadingNprogress) {
  return request({
    url:'/user/info/'+id,
    method:'get',
    headers:{
      isLoadingNprogress:isLoadingNprogress
    }
  })
}

