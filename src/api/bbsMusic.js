import request from '@/utils/request'

export function recommendList(params,isLoadingNprogress) {
  return request({
    url: '/audio/recommend',
    method: 'get',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    },
    params:params
  })
}

export function myMusicList(params, isLoadingNprogress) {
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

export function userHotList(params, isLoadingNprogress) {
  return request({
    url: '/audio/user/hot',
    method: 'get',
    params:params
  })
}
