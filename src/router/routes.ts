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
    },

    {
        path:'/consult/fast',
        component:() => import('@/view/Consult/ConsultFast.vue'),
        meta:{title:'急速问诊'}
    },
    {
        path:'/consult/dep',
        component:() => import('@/view/Consult/ConsultDep.vue'),
        meta:{title:'选择科室'}
    },
    {
        path:'/consult/illness',
        component: () => import('@/view/Consult/ConsultIllness.vue'),
        meta:{title:'病情描述'}
    },
    {
        path:'/consult/pay',
        component:() => import('@/view/Consult/ConsultPay.vue'),
        meta:{title:'问诊支付'}
    },
    {
        path:'/room',
        component:() => import('@/view/Room/index.vue'),
        meta:{title:'问诊室'},
        beforeEnter(to:any){
            if(to.query.payResult === 'false') return '/user/consult'
        }
    },
    {
        path:'/user/consult',
        component:() => import('@/view/User/ConsultPage.vue'),
        meta:{title:'问诊记录'}
    },{
        path:'/user/consult/:id',
        component:() => import('@/view/User/ConsultDetail.vue'),
        meta:{title:'问诊详情'}
    }
]
export default routes
