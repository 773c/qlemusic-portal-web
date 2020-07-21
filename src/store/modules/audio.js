const audio = {
  state:{
    qlaudio: {}
  },
  mutations:{
    SET_QLAUDIO(state,qlaudio){
      state.qlaudio = qlaudio
    }
  },
  actions:{
    SetQlAudio({commit},qlaudio){
      commit('SET_QLAUDIO',qlaudio)
      console.log(qlaudio);
      sessionStorage.setItem('qlaudio',qlaudio.toString())
    }
  }
}

export default audio
