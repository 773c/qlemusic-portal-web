import request from '@/utils/request'

export function updateAccountInfo(data) {
  return request({
    url:'/portal/updateInfo',
    method:'post',
    data:data
  })
}

export function updateUniqueId(params) {
  return request({
    url:'/portal/updateUniqueId',
    method:'get',
    params: params
  })
}

export function isUpdateUniqueId(id,isLoadingNprogress) {
  return request({
    url:'/portal/isUpdateUniqueId',
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
    url:'/portal/updateAvatar',
    method:'post',
    headers:{'Content-type': 'multipart/form-data;boundary = ' + new Date().getTime()},
    data: data
  })
}

export function getUserById(id,isLoadingNprogress) {
  return request({
    url:'/portal/getUserById',
    method:'get',
    headers:{
      isLoadingNprogress:isLoadingNprogress
    },
    params: {
      id:id
    }
  })
}

