import request from '@/utils/request'


export function like(musicId,userId,isLike,isLoadingNprogress) {
  return request({
    url: '/like/bbsmusic',
    method: 'post',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    },
    data: {
      musicId: musicId,
      userId:userId,
      isLike:isLike
    }
  })
}

export function getLikeCount() {

}
