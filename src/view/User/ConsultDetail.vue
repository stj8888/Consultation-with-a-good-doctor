<script setup lang="ts">
import {OrderType } from '@/enums'
import {getConsultOrderDetail} from '@/services/consult'
import type {ConsultOrderItem} from '@/types/consult'
import { useShowPrescription } from '@/components'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCancelOrder, useDeleteOrder } from '@/composable'
import { useClipboard } from '@vueuse/core'
import ConsultMore from './components/ConsultMore.vue'
import { showToast } from 'vant'
const {copy,isSupported} = useClipboard()
const oncopy = async () => {
    if(!isSupported.value) return showToast('未授权，不支持')
    await copy(item.value?.orderNo || '')
    showToast('已复制')
}
const {onShowPrescription} = useShowPrescription()
const router = useRouter()
const {loading,cancelConsultOrder} = useCancelOrder()
const { loading: deleteLoading, deleteConsultOrder } = useDeleteOrder(() => {
  router.push('/user/consult')
})
const route = useRoute()
const item = ref<ConsultOrderItem>()
onMounted(async () => {
  const res =await getConsultOrderDetail(route.params.id as string)
  // @ts-ignore
  item.value = res.data.data
  console.log(res.data)
})
const show = ref(false)
</script>

<template>
    <div class="consult-detail-page" v-if="item">
        <cp-nav-bar title="问诊详情" class="bar"></cp-nav-bar>
        <div class="detail-head">
            <div class="text">
                <h3>图文问诊 {{ item.payment }} 元</h3>
                <span :class="{orange:item.status === OrderType.ConsultPay,green:item.status === OrderType
                .ConsultChat}" class="sta">{{ item.statusValue }}</span>
                <p class="tip">服务医生信息</p>
            </div>
            <div class="card">
                <img src="@/assets/02.png" alt="">
                <p class="doc">
                    <span>极速问诊</span>
                    <span>{{ item.docInfo?.name }}</span>
                </p>
                <van-icon name="arrow"></van-icon>
            </div>
        </div>
        <div class="detail-patient">
            <van-cell-group :border="false">
                <van-cell title="患者信息" :value="`${item.patientInfo.name} | ${item.patientInfo.genderValue} | ${item.patientInfo.age}岁`"></van-cell>
                <van-cell title="患病时长" :value="item.illnessTime"></van-cell>
                <van-cell title="就诊情况" :value="item.consultFlag"></van-cell>
                <van-cell title="病情描述" :label="item.illnessDesc"></van-cell>
            </van-cell-group>
        </div>
        <div class="gray"></div>
        <div class="detail-order">
            <h3>订单信息</h3>
            <van-cell-group :border="false">
                <van-cell title="订单编号">
                    <template #value>
                        <span class="copy" @click="oncopy()">复制</span>
                        {{ item.orderNo }}
                    </template>
                </van-cell>
                <van-cell title="创建时间" :value="item.createTime" />
                <van-cell title="应付款" :value="`￥${item.payment}`" />
                <van-cell title="优惠券" :value="`-￥${item.couponDeduction}`" />
                <van-cell title="积分抵扣" :value="`-￥${item.pointDeduction}`" />
                <van-cell title="实付款" :value="`￥${item.actualPayment}`" class="price" />
            </van-cell-group>
        </div>
        <div class="detail-action van-hairline--top"  v-if="item.status === OrderType.ConsultPay">
     <div class="price">
        <span>需付款</span>
        <span>￥{{ item.actualPayment }}</span>
     </div>
     <van-button type="default" round :loading="loading" @click="cancelConsultOrder(item!)">
        取消问诊
      </van-button>
     <van-button type="primary" round  @click="show = true">继续支付</van-button>
        </div>
        <div
      class="detail-action van-hairline--top"
      v-if="item.status === OrderType.ConsultWait"
    >
    <van-button type="default" round :loading="loading" @click="cancelConsultOrder(item!)">
        取消问诊
      </van-button>
      <van-button type="primary" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>
    <div
      class="detail-action van-hairline--top"
      v-if="item.status === OrderType.ConsultChat"
    >
      <van-button type="default" round v-if="item.prescriptionId" @click
      ="onShowPrescription(item.prescriptionId)">
        查看处方
      </van-button>
      <van-button type="primary" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>
    <div
      class="detail-action van-hairline--top"
      v-if="item.status === OrderType.ConsultComplete"
    >
      <consult-more class="more"></consult-more>
      <van-button type="default" round :to="`/room?orderId=${item.id}`">
        问诊记录
      </van-button>
      <van-button type="default" round v-if="item.evaluateId">
        查看评价
      </van-button>
      <van-button type="primary" round v-else> 写评价 </van-button>
    </div>
    <div
      class="detail-action van-hairline--top"
      v-if="item.status === OrderType.ConsultCancel"
    >
      <van-button type="default" :loading="deleteLoading" round @click="deleteConsultOrder(item!)">删除订单</van-button>
      <van-button type="primary" round to="/">咨询其他医生</van-button>
    </div>
    <div class="detail-time" v-if="item.status === OrderType.ConsultPay">
      请在 <van-count-down :time="item.countdown * 1000" /> 内完成支付，超时订单将取消
    </div>
    <cp-pay-sheet v-model:show="show" :order-id="item.id" :actualPayment="item.actualPayment" />
    </div>
    <div class="consult-detail-page" v-else>
    <cp-nav-bar title="问诊详情" class="bar"></cp-nav-bar>
    <van-skeleton title :row="4" style="margin-top: 30px" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
    </div>
</template>

<style lang="scss" scoped>
.consult-detail-page {
    position: relative;
    .bar{
        position: fixed;
        width: 100vw;
      top: 0;
    }
    .detail-head {
        margin-top: 46px;
        position: relative;
        width: 100%;
        height: 135px;
        background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
        border-bottom-left-radius: 120px 45px;
        border-bottom-right-radius: 120px 45px;
        padding-top: 20px;
        .text {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 10px 15px;
            .green {
                color: green;
                font-weight: 600;
            }
            .orange {
        color: #f2994a;
      }
            .tip {
                width: 100%;
                font-size: 14px;
                padding-top: 5px;
            }
        }

        .card {
            width: 330px;
            position: absolute;
            border-radius: 10px;
            background-color: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 10px;
            margin-left: 10px;

            img {
                height: 40px;
                width: 40px;
                border-radius: 25px;
            }

            .doc {
                padding-left: 10px;
                display: flex;
                flex-direction: column;
                flex: 1;

                & :nth-child(1) {
                    font-weight: bold;
                }
            }
        }
    }

    .detail-patient {
        padding-top: 10px;
        color: #888889;

        .van-cell {
            padding-bottom: 15px;
        }
        &::after{
            content: '';
            display: block;
            height: 10px;
            background-color: #f6f7f9;;
        }
    }
    .detail-order {

    margin-bottom: 100px;
        .price {
            & :deep(.van-cell__value) {
                font-size: 16px;
                color: var(--cp-price);
            }
        }

        >h3 {
            padding-left: 15px;
            padding-top: 10px;
        }

        .van-cell-group {
            margin-top: 15px;
            .van-cell {
                line-height: 30px;
                .copy {
                    background-color: #ebf8f6;
                    color: #72d7c4;
                    text-align: center;
                    border: 1px solid #72d7c4;
                    border-radius: 15px;
                    display: inline-block;
                    width: 50px;
                    line-height: 20px;
                    // margin-right: 10px;
                }
                :deep(.van-cell__title) {
                        width: 70px;
                     flex: none;
                }
            }
        }
    }
    .detail-action{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 10px 10px;
        position: fixed;
        width: 100%;
         left: 0;
         bottom: 0;
         background-color: #fff;
        box-sizing: border-box;
        .price{
            flex: 1;
            >span:last-child{
                font-size: 18px;
                color: red;
                padding-left: 5px;
            }
        }
        .van-button{
        margin-left: 10px;
        padding-left: 15px;
        padding-right: 15px;
        }
    }
    .more{
        flex: 1;
        font-size: 16px;
        padding-left: 10px;
    }

.detail-time {
  position: fixed;
  left: 0;
  bottom: 65px;
  width: 100%;
  height: 44px;
  background-color: #fff7eb;
  text-align: center;
  line-height: 44px;
  font-size: 13px;
  color: #f2994a;
  .van-count-down {
    display: inline;
    color: #f2994a;
  }
}
}
</style>