import request from '@/utils/request'

export function like(data,isLoadingNprogress) {
  return request({
    url: '/like/bbsmusic',
    method: 'post',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    },
    data: data
  })
}

export function getLikeCount() {

}
