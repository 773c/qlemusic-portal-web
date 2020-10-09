const audio = {
  state:{
    qlaudio: {},
    count:0
  },
  mutations:{
    SET_QLAUDIO(state,qlaudio){
      state.qlaudio = qlaudio
    },
    SET_COUNT(state){
      state.count++
    }
  },
  actions:{
    SetQlAudio({commit},qlaudio){
      commit('SET_QLAUDIO',qlaudio)
    },
    IncreasePlayCount({commit}){
      commit('SET_COUNT')
    }
  }
}

export default audio
