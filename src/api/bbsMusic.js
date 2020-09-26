import request from '@/utils/request'

export function getRecommendList() {
  return request({
    url:'/audio/recommend',
    method:'get'
  })
}
