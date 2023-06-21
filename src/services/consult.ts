import type {knowledgePage,knowledgeParams,PageParams,DoctorPage,FollowType,TopDep,Image,ConsultOrderPreData,ConsultOrderPreParams, PartialConsult, ConsultOrderItem} from '@/types/consult'
import {request} from '@/utils/request'
import type { ConsultOrderListParams, ConsultOrderPage } from '@/types/consult'
export const getKnowledgePage = (params:knowledgeParams) => request<knowledgePage>('/patient/home/knowledge','GET',params)
export const getDoctorPage = (params:PageParams) => request<DoctorPage>('/home/page/doc','GET',params)

export const followOrUnfollow = (id: string, type: FollowType = 'doc') =>
  request('/like', 'POST', { id, type })
export const getAllDep = () => request<TopDep>('/dep/all')
export const  uploadImage = (file:File) => {
  const fd = new FormData()
  fd.append('file',file)
  return request<Image>('/upload','POST',fd)
}
// 拉取预支付订单信息
export const getConsultOrderPre = (params:ConsultOrderPreParams) => request<ConsultOrderPreData>('/patient/consult/order/pre','GET',params)
export const createConsultOrder = (data:PartialConsult) => request<{
[x: string]: any 
id:string
}>('/patient/consult/order','POST',data)
//获取支付地址 0是微信 1是支付宝
export const getConsultOrderPayUrl = (params:{paymentMethod:0|1,orderId:string,payCallback:string}) => request<{
[x: string]: any  
payurl:string
}>('/patient/consult/pay','POST',params)
export const getConsultOrderDetail = (orderId: string) =>
  request<ConsultOrderItem>('/patient/consult/order/detail', 'GET', { orderId })
// 查看处方
export const getPrescriptionPic = (id: string) =>
  request<{
[x: string]: any 
url: string 
}>(`/patient/consult/prescription/${id}`)
  // 评价问诊
export const evaluateConsultOrder = (data: {
  docId: string
  orderId: string
  score: number
  content: string
  anonymousFlag: 0 | 1
}) => request<{ id: string }>('/patient/order/evaluate', 'POST', data)
export const getConsultOrderList = (params: ConsultOrderListParams) =>
  request<ConsultOrderPage>('/patient/consult/order/list', 'GET', params)
// 取消订单
export const cancelOrder = (id: string) => request(`/patient/order/cancel/${id}`, 'PUT')
// 删除订单
export const deleteOrder = (id: string) => request(`/patient/order/${id}`, 'DELETE')


