<script setup lang="ts">
import {getConsultOrderPre,createConsultOrder,getConsultOrderPayUrl} from '@/services/consult'
import {getPatientDetail} from '@/services/user'
import {useConsultStore} from '@/stores'
import type {ConsultOrderPreData,PartialConsult} from '@/types/consult'
import type {Patient} from '@/types/user'
import { showConfirmDialog, showDialog, showLoadingToast, showToast } from 'vant'
import { onMounted,ref } from 'vue'
import { onBeforeRouteLeave,useRouter } from 'vue-router'
const store = useConsultStore()
const payInfo = ref<ConsultOrderPreData>()
const router = useRouter()
const loadData = async () => {
    const res = await getConsultOrderPre({
        type:store.consult.type,
        illnessType:store.consult.illnessType
    })
    console.log(res)
    payInfo.value = res.data.data
    store.setCoupon(payInfo.value?.couponId)
}
const patient =ref<Patient>()
const loadPatient = async () => {
    if(!store.consult.patientId) return 
    const res = await getPatientDetail(store.consult.patientId)
    patient.value = res.data.data
}
type key = keyof PartialConsult
onMounted(() => {
    const validkeys : key[] = [
    'type',
    'illnessType',
    'depId',
    'illnessDesc',
    'illnessTime',
    'consultFlag',
    'patientId'
    ]
    const valid = validkeys.every((key) => store.consult[key] !== undefined)
    if (!valid) {
    return showDialog({
      title: '温馨提示',
      message:
        '问诊信息不完整请重新填写，如有未支付的问诊订单可在问诊记录中继续支付！',
      closeOnPopstate: false
    }).then(() => {
      router.push('/')
    })
  }
    loadData()
    loadPatient()
})
const agree = ref(false)
const show = ref(false)
const paymentMethod = ref<0 | 1>()
const loading = ref(false)
const orderId = ref('')
const submit = async () => {
    if(!agree.value) return showToast('请勾选我已同意支付协议')
    loading.value = true
    console.log(store.consult)
    const res =await createConsultOrder(store.consult)
    orderId.value = res.data.data.id
    loading.value = false
    store.clear()
    show.value = true
}
onBeforeRouteLeave(() => {
    console.log(orderId.value)
    if(orderId.value) return false
})
const onClose = async () => {
return await showConfirmDialog({
title: '关闭支付',
message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
cancelButtonText: '仍要关闭',
confirmButtonText: '继续支付'
}).then(()=>{
    return false
}).catch(()=>{
    orderId.value = ''
   router.push('/user/consult')
return true

})
}
const pay = async() =>{
    if(paymentMethod.value  === undefined) return showToast('请选择支付方式')
    showLoadingToast({message:'跳转支付',duration:0})
    const res = await getConsultOrderPayUrl({orderId:orderId.value,paymentMethod:paymentMethod.value,
    payCallback:'http://localhost:5173/room'
})
    window.location.href=res.data.data.payUrl
}
</script>
<template>
    <div class="consult-pay-page" v-if="payInfo  && patient">
    <CpNavBar title="支付"></CpNavBar>
<div class="pay-info">
 <p class="tit">图文问诊 {{payInfo.payment}} 元</p>
 <div class="body">
    <VanImage
  round
  width="2.5rem"
  height="2.5rem"
  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
/>
<p class="desc">
    <span>极速问诊</span>
    <span>自动分配医生</span>
</p>
 </div>
    </div>
    <VanCellGroup>
    <VanCell title="优惠券" :value="`-¥${payInfo.couponDeduction}`" />
      <VanCell title="积分抵扣" :value="`-¥${payInfo.pointDeduction}`" />
      <VanCell title="实付款"  :value="`¥${payInfo.actualPayment}`" />
    </VanCellGroup>
    <div class="py-space"></div>
    <VanCellGroup>
      <VanCell title="患者信息"  :value="`${patient.name} | ${patient.genderValue} | ${patient.age}岁`"></VanCell>
      <VanCell title="病情描述" :label="store.consult.illnessDesc"></VanCell>
    </VanCellGroup>
    <div class="pay-schema">
      <VanCheckbox v-model="agree">我已同意 <span class="text">支付协议</span></VanCheckbox>
    </div>
    <VanSubmitBar button-type="primary"  :price="payInfo.actualPayment * 100" button-text="立即支付" text-align="left" @click="submit" :loading="loading"/>
    <van-action-sheet v-model:show="show" title="选择支付协议" :close-on-popstate="false" :closeable="false" :before-close="onClose">
    <div class="pay-type">
        <p class="price">￥{{payInfo.actualPayment.toFixed(2)}}</p>
<van-cell-group>
  <van-cell title="微信支付"  @click="paymentMethod = 0">
  <template #icon>
    <van-icon class-prefix="icon"  name="weixin" class="search-icon iconfont" style="color: green;" size="20"/>
  </template>
  <template #extra>
    <VanCheckbox :checked="paymentMethod === 0"></VanCheckbox>
  </template>
 </van-cell>
  <van-cell title="支付宝支付"  @click="paymentMethod = 1">
    <template #icon>
        <van-icon class-prefix="icon"  name="zhifubaozhifu" class="search-icon iconfont" size="20"/>
  </template>
  <template #extra>
    <VanCheckbox :checked="paymentMethod === 1"></VanCheckbox>
  </template>
  </van-cell>
</van-cell-group>
<van-button type="primary" round size="large" @click="pay">立即支付</van-button>
    </div>
    </van-action-sheet>
    </div>
</template>

<style lang="scss" scoped>
.consult-pay-page{
   .pay-info{
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    font-size: 16px;
    font-weight: 500;
    .body{
        margin-top: 10px;
        display: flex;
  .desc{
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    span:nth-child(2){
        color: var(--cp-tag);
    }
   }
    }
   }
.van-cell-group{
    font-weight: 500;
    color: #535353;
    padding: 10px 0;
    .pay-price{
        :deep(.van-cell__value){
            color: var(--cp-price);
        }
        
    }
}
.py-space{
height: 15px;
background-color: #f6f7f9;
}
.pay-type{
    margin: 10px 10px;
    .price{
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 14px;
    }
    .search-icon{
        font-size: 16px;
        line-height: inherit;
   }
}
}
.pay-schema{
    height: 56px;
display: flex;
justify-content: center;
align-items: center;
.text{color:var(--cp-primary)}
.van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
}
::v-deep(){
   .van-submit-bar__button{
    font-weight: normal;
    width: 160px;
    }
   
}
</style>