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

export function commentList(id,isLoadingNprogress) {
  return request({
    url: '/comment/list/'+id,
    method: 'get',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    }
  })
}

export function msgCommentList(params,id,isLoadingNprogress) {
  return request({
    url: '/comment/msg/'+id,
    method: 'get',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    },
    params:params
  })
}

export function msgReplyList(id,isLoadingNprogress) {
  return request({
    url: '/comment/msg/reply/'+id,
    method: 'get',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    }
  })
}

export function noSeeMsgCommentCount(id,isLoadingNprogress) {
  return request({
    url: '/comment/msg/noSee/'+id,
    method: 'get',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    }
  })
}

export function updateNoSeeMsgCommentCount(id,isLoadingNprogress) {
  return request({
    url: '/comment/msg/updateNoSee/'+id,
    method: 'get',
    headers: {
      isLoadingNprogress: isLoadingNprogress
    }
  })
}
