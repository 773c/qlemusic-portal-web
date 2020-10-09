import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import audio from './modules/audio'
import getters from './getters'

Vue.use(Vuex)

const state = {
  openWebType:'_self'
}

const store = new Vuex.Store({
  modules: {
    app,
    user,
    audio
  },
  getters
})

export default store
