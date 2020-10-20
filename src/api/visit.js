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

export function getVisitCount(params,isLoadingNprogress) {
  return request({
    url:'/visit/getVisitCount',
    method:'get',
    headers:{
      isLoadingNprogress:isLoadingNprogress
    },
    params: params
  })
}
