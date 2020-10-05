import {Message} from 'element-ui'

export default {
  install(Vue, options) {
    Vue.prototype.$tip = {
      success: function (message) {
        return Message({
          message: message,
          type: 'success',
          center: true,
          offset: 70,
          duration: 2 * 1000
        })
      },
      error:function (message) {
        return Message({
          message: message,
          type: 'error',
          center: true,
          offset: 70,
          duration: 2 * 1000
        })
      }
    }
  }
}

