const getter = {
  device:state => state.app.device,
  qlaudio:state => state.audio.qlaudio,
  token:state => state.user.token
}

export default getter
