import Vue from 'vue'
import VueRouter from 'vue-router'

const Layout = () => import('@/views/layout/Layout')
const Home = () => import('@/views/home')
const Download = () => import('@/views/download')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: Home,
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path:'/nav',
    component:Layout,
    children:[{
      path:'download',
      name:'download',
      component:Download,
      meta:{title:'下载',icon:'download'}
    }]
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({y: 0})
})

export default router
