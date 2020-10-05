import request from '@/utils/request'

export function createCollect(userId,name,description) {
  return request({
    url:'/collect/createCollect',
    method:'post',
    data: {
      name:name,
      description:description
    },
    params:{
      userId:userId
    }
  })
}

export function getFavoriteList(id) {
  return request({
    url:'/collect/getCollectList',
    method:'get',
    params:{
      id:id
    }
  })
}

export function addCollect(collectId,musicId) {
  return request({
    url:'/collect/addCollect',
    method:'get',
    params:{
      collectId:collectId,
      musicId:musicId
    }
  })
}

export function deleteCollectContent(collectMusicId) {
  return request({
    url:'/collect/deleteCollectContent',
    method:'post',
    data:{
      collectMusicId:collectMusicId,
    }
  })
}

export function deleteCollect(id) {
  return request({
    url:'/collect/deleteCollect',
    method:'get',
    params:{
      id:id,
    }
  })
}
export function deleteCollectAndMove(id,moveId) {
  return request({
    url:'/collect/deleteCollectAndMove',
    method:'get',
    params:{
      id:id,
      moveId:moveId
    }
  })
}


export function deleteCollectAndContent(id) {
  return request({
    url:'/collect/deleteCollectAndContent',
    method:'get',
    params:{
      id:id
    }
  })
}

export function batchMoveContent(data) {
  return request({
    url:'/collect/batchMoveContent',
    method:'post',
    data:data
  })
}
