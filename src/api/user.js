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

export function isUpdateUniqueId(id) {
  return request({
    url:'/portal/isUpdateUniqueId',
    method:'get',
    params: {
      id:id
    }
  })
}
