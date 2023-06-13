import { type } from "os"


export type User = {
    token:string,
    id:string,
    account:string,
    mobile:string,
    avatar:string
}
export type CodeType='login'|'register'|'changeMobile'|'forgetPassword'|'bindMobile'
//个人信息
type OmitUser = Omit<User,'token'>
export type UserInfo = OmitUser & {
  likeNumber: number
  /** 收藏 */
  collectionNumber: number
  /** 积分 */
  score: number
  /** 优惠券 */
  couponNumber: number
  orderInfo: {
    /** 待付款 */
    paidNumber: number
    /** 待发货 */
    receivedNumber: number
    /** 待收货 */
    shippedNumber: number
    /** 已完成 */
    finishedNumber: number
}
}
export type Patient = {
  id?:string,
  name:string,
  idCard:string,
  defaultFlag:0 | 1
  gender: 0 | 1
  /** 性别文字 */
  genderValue?: string
  /** 年龄 */
  age?: number
}
export type PatientList = Patient[]