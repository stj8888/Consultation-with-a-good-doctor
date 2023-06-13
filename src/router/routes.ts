const routes = [
    {
        path: '/',
        name: '容器',
        component: () => import('@/view/Layout/index.vue'), //.vue不能省略
        redirect:'/home',
        children:[
            {path:'/home',component:()=>import('@/view/home/index.vue'),meta:{title:'首页'}},
            {path:'/article',component:()=>import('@/view/Article/index.vue'),meta:{title:'健康百科'}},
            {path:'/notify',component:()=>import('@/view/Notify/index.vue'),meta:{title:'消息通知'}},
            {path:'/user',component:()=>import('@/view/User/index.vue'),meta:{title:'个人中心'}}
        ]
    },
    {
        path:'/login',
        name:'login',
        meta:{ title:'登录'},
        component:() => import('@/view/Login/index.vue'), //.vue不能省略
    },
    {
        path:'/user/patient',
        component:() => import('@/view/User/PatientPage.vue'),
        meta:{title:'家庭档案'}
    }
]
export default routes
