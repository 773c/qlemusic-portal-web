const socket = {
  state: {
    websocket: null
  },
  mutations: {
    SET_WEBSOCKET: (state, websocket) => {
      console.log("vuex",websocket);
      state.websocket = websocket;
    }
  },
  actions: {
    GetWebsocket({commit},websocket){
      commit('SET_WEBSOCKET',websocket)
    }
  }
}

export default socket
