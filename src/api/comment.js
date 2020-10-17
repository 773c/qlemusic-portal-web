import request from '@/utils/request'

export function userComment(data,isLoadingNprogress) {
  return request({
    url: '/comment/user',
    method: 'post',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    },
    data: data
  })
}

export function replyuserComment(data,isLoadingNprogress) {
  return request({
    url: '/comment/replyuser',
    method: 'post',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    },
    data: data
  })
}

export function getUserByComment(data,isLoadingNprogress) {
  return request({
    url: '/comment/getUserByComment',
    method: 'post',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    },
    data: data
  })
}

export function getCommentByMusic(params,isLoadingNprogress) {
  return request({
    url: '/comment/getCommentByMusic',
    method: 'get',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    },
    params: params
  })
}
