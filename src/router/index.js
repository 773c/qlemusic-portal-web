import Vue from 'vue'
import VueRouter from 'vue-router'

const Error = () => import('@/views/404')
const Layout = () => import('@/views/layout/Layout')
const Home = () => import('@/views/home')
const Download = () => import('@/views/download')
const PersonalCenter = () => import('@/views/user/personalCenter')
const Collect = () => import('@/views/user/collect')
const Set = () => import('@/views/user/set')
const MyMusic = () => import('@/views/user/myMusic')
const BbsMusic = () => import('@/views/bbsMusic')
const ManageHome = () => import('@/views/manage/home')
const EditMusic = () => import('@/views/manage/editMusic')
const Expectation = () => import('@/views/Expectation')
const MsgComment = () => import('@/views/msg/comment')

Vue.use(VueRouter)

const routes = [
  {path:'/expectation',component:Expectation},
  {path: '/404', component: Error, meta: {title: '404', icon: '404', isLoadingNprogress: false}},
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: Home,
      meta: {title: '首页', icon: 'home', isLoadingNprogress: false,isLevel: 1}
    }]
  },
  {
    path: '/nav',
    component: Layout,
    children: [{
      path: 'download',
      name: 'download',
      component: Download,
      meta: {title: '下载', icon: 'download', isLoadingNprogress: true,isLevel: 1}
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
        meta: {title: '个人中心', icon: 'personal', isLoadingNprogress: false,isLevel: 2}
      },
      {
        path: 'collect',
        name: 'collect',
        component: Collect,
        meta: {title: '我的收藏', icon: 'collect', isLoadingNprogress: true,isLevel: 2}
      },
      {
        path: 'set',
        name: 'set',
        component: Set,
        meta: {title: '账户设置', icon: 'set', isLoadingNprogress: true,isLevel: 2}
      }
    ]
  },
  {
    path: '/:uniqueId',
    component: Layout,
    name: 'bbsMusic',
    children: [
      {
        path: '',
        name: ':uniqueId',
        component: MyMusic,
        meta: {title: '我的音乐', icon: 'myMusic', isLoadingNprogress: true,isLevel: 2}
      }
    ]
  },
  {
    path: '/manage',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: ManageHome,
        meta: {title: '管理首页', icon: 'manageHome', isLoadingNprogress: false,isLevel: 3}
      },
      {
        path: 'edit',
        name: 'edit',
        component: EditMusic,
        meta: {title: '管理空间', icon: 'edit', isLoadingNprogress: true,isLevel: 3}
      }
    ]
  },
  {
    path: '/msg',
    component: Layout,
    children: [
      {
        path: 'comment',
        name: 'comment',
        component: MsgComment,
        meta: {title: '评论消息', icon: 'msgComment', isLoadingNprogress: true,isLevel: 4}
      }
    ]
  },
]

//路由重复点击报错
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({y: 0})
})

export default router
