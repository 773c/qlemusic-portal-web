const getters = {
  device:state => state.app.device,
  qlaudio:state => state.audio.qlaudio,
  token:state => state.user.token,
  userInfo:state => state.user.userInfo
}

export default getters
