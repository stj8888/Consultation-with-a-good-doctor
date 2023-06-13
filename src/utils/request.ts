import axios,{type Method} from 'axios'
import { useUserStore } from '@/stores'
import router from '@/router'
import {showToast} from 'vant'
const baseURL='https://consult-api.itheima.net/'
const instance = axios.create({
    baseURL,
    timeout:10000
})
instance.interceptors.request.use((config)=>{
    const store = useUserStore()
    if(store.user?.token&&config.headers){
        config.headers['Authorization']=`Bearer ${store.user.token}`
    }
    return config
},
(err)=>{
    return Promise.reject(err)
}
)
instance.interceptors.response.use((res)=>{
    if(res.data?.code!==10000){
        showToast(res.data?.message||'业务失败')
        return Promise.reject(res.data)
    }
    return res
},(err)=>{
    if(err.response.status===401){
        const store=useUserStore()
        store.delUser()
        router.push({
            path:'/login',
            query:{returnUrl:router.currentRoute.value.fullPath}
        })
    }
    return Promise.reject(err)
})
type Data<T> = {
 code:number,
 message:string,
 data:T
}
 const request = <T>(url:string, method:Method='GET',submitData?:Object)=>{
    return ( instance.request<T, Data<T>>({
        url,
        method,
        [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
    }))
}

export {baseURL,instance,request}