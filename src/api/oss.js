import request from '@/utils/request'

export function policy() {
  return request({
    url:'/aliyun/oss/policy',
    method:'get'
  })
}

export function uploadOss(data) {
  return request({
    url:'/portal/uploadOss',
    method:'post',
    headers:{'Content-type': 'multipart/form-data;boundary = ' + new Date().getTime()},
    data: data
  })
}
