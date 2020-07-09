import request from '@/utils/request'

export function getBbsMusicList() {
  return request({
    url:'/audio/list',
    method:'get'
  })
}
