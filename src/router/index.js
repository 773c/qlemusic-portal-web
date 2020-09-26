import Vue from 'vue'
import VueRouter from 'vue-router'

const Error = () => import('@/views/404')
const Layout = () => import('@/views/layout/Layout')
const Home = () => import('@/views/home')
const Download = () => import('@/views/download')
const PersonalCenter = () => import('@/views/user/personalCenter')
const PersonalCollect = () => import('@/views/user/personalCollect')

Vue.use(VueRouter)

const routes = [
  {path: '/404', component: Error},
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
    path: '/nav',
    component: Layout,
    children: [{
      path: 'download',
      name: 'download',
      component: Download,
      meta: {title: '下载', icon: 'download'}
    }]
  },
  {
    path: '/usr',
    component: Layout,
    children: [
      {
        path: 'personal',
        name: 'personal',
        component: PersonalCenter,
        meta: {title: '个人中心', icon: 'personal'}
      },
      {
        path: 'collect',
        name: 'collect',
        component: PersonalCollect,
        meta: {title: '我的收藏', icon: 'collect'}
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({y: 0})
})

export default router
