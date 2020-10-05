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

export function getMyMusicList(id,isLoadingNprogress) {
  return request({
    url:'/audio/myMusic',
    method:'get',
    headers:{
      isLoadingNprogress:isLoadingNprogress
    },
    params:{
      id:id
    }
  })
}

export function getMusicByCollectId(params) {
  return request({
    url:'/audio/getMusicByCollectId',
    method:'get',
    params:params
  })
}
