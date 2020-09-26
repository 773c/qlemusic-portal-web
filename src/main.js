import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

import '@/styles/index.scss'
import '@/icons'
import '@/utils/ql-audio.js'
import './permission'

import App from './App.vue'
import router from './router'
import store from './store'


Vue.use(ElementUI,{locale})
Vue.use(VueVideoPlayer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
