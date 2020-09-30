import request from '@/utils/request'

export function getRecommendList(isLoadingNprogress) {
  return request({
    url:'/audio/recommend',
    method:'get',
    headers:{
      isLoadingNprogress:isLoadingNprogress
    }
  })
}
