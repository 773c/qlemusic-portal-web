import axios from 'axios'

export function getAddr() {
  return axios({
    url: '/apis/cityjson?ie=utf-8',
    method: 'post'
  })
}
