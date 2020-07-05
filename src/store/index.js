import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import getter from './getter'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app
  },
  getter
})

export default store
