import request from '@/utils/request'

export function play(params,isLoadingNprogress) {
  return request({
    url: '/play/bbsmusic',
    method: 'get',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    },
    params: params
  })
}
