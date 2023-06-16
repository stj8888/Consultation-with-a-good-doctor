import type { User, CodeType, Patient } from "@/types/user";
import { request } from '@/utils/request'
export const loginByPassword = (mobile: string, password: string) => {
    return request<User>('/login/password', 'POST', { mobile, password })
}
//获取短信验证码
export const sendMobileCode = (mobile: string, type: CodeType) => {
    return request('/code', 'GET', { mobile, type })
}
//短信验证码登录
export const loginByMobile = (mobile: string, code: string) => {
    return request('/login', 'POST', { mobile, code })
}
//获取个人信息
export const getUserInfo = () => request('/patient/myUser')
export const getPatientList = () =>request('/patient/mylist')
export const  addPatient = (patient:Patient) => request('/patient/add','POST',patient)
export const editPatient = (patient:Patient) => request('/patient/update','PUT',patient)
export const delPatient = (id:string) => request(`/patient/del/${id}`,'DELETE')
// 查询患者详情
export const getPatientDetail = (id: string|undefined) => request<Patient>(`/patient/info/${id}`)
