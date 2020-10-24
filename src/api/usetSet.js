import request from '@/utils/request'

export function updatePassword(data) {
  return request({
    url:'/usrset/updatePassword',
    method:'post',
    data:data
  })
}

export function updateTelephone(data) {
  return request({
    url:'/usrset/updateTelephone',
    method:'post',
    data:data
  })
}
