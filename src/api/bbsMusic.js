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

export function getMyMusicList(id, isLoadingNprogress) {
  return request({
    url: '/audio/myMusic',
    method: 'get',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    },
    params: {
      id: id
    }
  })
}

export function getMusicByCollectId(params) {
  return request({
    url: '/audio/getMusicByCollectId',
    method: 'get',
    params: params
  })
}

export function like(id,userId,isLoadingNprogress) {
  return request({
    url: '/audio/like',
    method: 'get',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    },
    params: {
      id: id,
      userId:userId
    }
  })
}

export function getLikeCount() {

}

export function release(data) {
  return request({
    url: '/audio/release',
    method:'post',
    headers:{'Content-type': 'multipart/form-data;boundary = ' + new Date().getTime()},
    data: data
  })
}
