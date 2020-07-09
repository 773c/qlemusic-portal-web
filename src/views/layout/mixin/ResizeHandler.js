import store from '@/store'

const { body } = document
const WIDTH = 768
const RATIO = 3

export default {
  // watch: {
  //   $route(route) {
  //     if (this.device === 'mobile') {
  //       store.dispatch('CloseSideBar', { withoutAnimation: false })
  //     }
  //   }
  // },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('ToggleDevice', 'mobile')
      // store.dispatch('CloseSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop')

        // if (isMobile) {
        //   store.dispatch('CloseSideBar', { withoutAnimation: true })
        // }
      }
    }
  }
}
