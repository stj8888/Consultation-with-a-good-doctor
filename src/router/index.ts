import { createRouter,createWebHashHistory } from 'vue-router'
import routes from './routes.js'
import { useUserStore } from '@/stores/index.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
  const router = createRouter({
    history:createWebHashHistory(),
    routes:routes
  })
 router.beforeEach((to)=>{
  NProgress.start()
  const store =useUserStore()
  const wihteList=['/login','register']
  if(!store.user?.token&&!wihteList.includes(to.path))return '/login'
 })

 router.afterEach((to)=>{
NProgress.done()
  document.title=`${to.meta.title || ''}-优医问诊`
 })
 NProgress.configure({
  showSpinner:false
 })
  export default router
