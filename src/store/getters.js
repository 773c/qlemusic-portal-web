const getters = {
  device:state => state.app.device,
  token:state => state.user.token,
  userInfo:state => state.user.userInfo,
  userCommentInfo:state => state.user.userCommentInfo,
  websocket:state => state.socket.websocket
}

export default getters
