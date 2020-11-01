import request from '@/utils/request'

export function visit(params,isLoadingNprogress) {
  return request({
    url:'/visit/usered',
    method:'get',
    headers:{
      isLoadingNprogress:isLoadingNprogress
    },
    params: params
  })
}

export function visitCount(id,isLoadingNprogress) {
  return request({
    url:'/visit/count/'+id,
    method:'get',
    headers:{
      isLoadingNprogress:isLoadingNprogress
    }
  })
}
