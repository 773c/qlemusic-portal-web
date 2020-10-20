import request from '@/utils/request'

export function getRecommendList(isLoadingNprogress) {
  return request({
    url: '/audio/recommend',
    method: 'get',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    }
  })
}

export function getMyMusicList(params, isLoadingNprogress) {
  return request({
    url: '/audio/myMusic',
    method: 'get',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    },
    params: params
  })
}

export function getMusicByCollectId(params) {
  return request({
    url: '/audio/getMusicByCollectId',
    method: 'get',
    params: params
  })
}


export function release(data) {
  return request({
    url: '/audio/release',
    method:'post',
    headers:{'Content-type': 'multipart/form-data;boundary = ' + new Date().getTime()},
    data: data
  })
}

export function getHotMusic(params, isLoadingNprogress) {
  return request({
    url: '/audio/getHotMusic',
    method: 'get',
    params: params
  })
}
