<script setup lang="ts">
import type {ConsultOrderItem} from '@/types/consult'
import { OrderType } from '@/enums'
import { useShowPrescription } from '@/components'
import ConsultMore from './ConsultMore.vue'
import { useCancelOrder, useDeleteOrder } from '@/composable'
const { loading: deleteLoading, deleteConsultOrder } = useDeleteOrder(()=>{
  emit('on-delete', props.item.id)
})
const {loading,cancelConsultOrder} = useCancelOrder()
const {onShowPrescription} = useShowPrescription()
const props= defineProps<{item:ConsultOrderItem}>()
const emit = defineEmits<{
    (e:'on-delete',id:string):void
}>()
//删除订单
const onSelect = (i:number) => {
    if(i === 0) {
        onShowPrescription(props.item.prescriptionId)
    }
    if(i === 1) {
        //删除
        deleteConsultOrder(props.item)
    }
}
</script>

<template>
    <div class="consult-item">
   <div class="head van-hairline-bottom">
    <img src="@/assets/02.png" alt="" class="img">
    <p>{{ item.docInfo?.name || '暂未分配医生' }}</p>
    <span :class="{orange:item.status === OrderType.ConsultPay,green:item.status===OrderType.ConsultChat}">{{ item.statusValue }}</span>
   </div>
   <div class="body" @click="$router.push(`/user/consult/${item.id}`)">
    <div class="body-row">
        <div class="body-lable">病情描述</div>
        <div class="body-value">{{ item.illnessDesc }}</div>
    </div>
    <div class="body-row">
        <div class="body-lable">价格</div>
        <div class="body-value price">￥{{item.payment.toFixed(2)}}</div>
    </div>
    <div class="body-row">
        <div class="body-lable">创建时间</div>
        <div class="body-value tip">{{item.createTime}}</div>
    </div>
   </div>
   <div class="foot" v-if="item.status === OrderType.ConsultPay">
   <van-button class="gray" plain size="small" round :loading="loading" @click="cancelConsultOrder(item)">取消问诊</van-button>
   <van-button type="primary"  plain size="small" round style="text-align: center; padding: 0 15px;" @click="$router.push(`/user/consult/${item.id}`)">去支付</van-button>
   </div>
   <div class="foot" v-if="item.status === OrderType.ConsultWait">
   <van-button class="gray" plain size="small" round :loading="loading" @click="cancelConsultOrder(item)">取消问诊</van-button>
   <van-button type="primary"  plain size="small" round style="text-align: center; padding: 0 15px;">继续沟通</van-button>
   </div>
   <div class="foot" v-if="item.status === OrderType.ConsultChat">
   <van-button class="gray" plain size="small" round  v-if="item.prescriptionId" @click="onSelect(0)">查看处方</van-button>
   <van-button type="primary"  plain size="small" round style="text-align: center; padding: 0 15px;">继续沟通</van-button>
   </div>
   <div class="foot" v-if="item.status === OrderType.ConsultComplete">
    <ConsultMore  :disabled="!item.prescriptionId"
        @on-delete="deleteConsultOrder(item)"
        @on-preview="onShowPrescription(item.prescriptionId)"></ConsultMore>
   <van-button class="gray" plain size="small" round :to="`/room?orderId=${item.id}`">问诊记录</van-button>
   <van-button v-if="!item.evaluateId" type="primary" plain size="small" round>
        去评价
      </van-button>
      <van-button v-else class="gray" plain size="small" round> 查看评价 </van-button>
   </div>
   <div class="foot" v-if="item.status === OrderType.ConsultCancel">
      <van-button class="gray" plain size="small" round :loading="deleteLoading" @click="deleteConsultOrder(item!)">删除订单</van-button>
      <van-button type="primary" plain size="small" round to="/">咨询其他医生</van-button>
    </div>
    </div>
</template>

<style lang="scss" scoped>
.consult-item{
    margin: 10px 15px;
    background-color:#ffffff;
    border-radius: 10px;
    .head {

        padding: 10px;
        display: flex;
        justify-content: space-around;
        >p{
            flex: 1;
            padding-left: 10px;
            font-size: 15px;
        }
        >span{
            color: var(--cp-text3);
            &.orange {
        color: #f2994a;
      }
      &.green {
        color: var(--cp-primary);
      }
        }
    .img{
     height: 20px;
      width: 20px;
      border-radius: 10px;
        }
    }
    .body{
        margin-top: 5px;
        border-top: 1px solid #f6f7f9;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100px;
        .body-row{
            padding-bottom: 5px;
            padding-left: 10px;
            display: flex;
            .body-lable{
  font-size: 13px;
  color: #c3c3c5;
            }
            .body-value{
        padding-left: 10px;
              
            }
            .price{
                padding-left: 32px;
            }
            .tip{
                font-size: 15px;
                color: #c3c3c5;
            }
        }
    }
    .foot{
        display: flex;
        justify-content: flex-end;
        .more{
            color: var(--cp-text3);
            flex: 1;
            font-size: 13px;
            padding-top: 5px;
            padding-left: 15px;
        }
        .gray{
            text-align: center;
            padding: 0 10px;
            background-color: #f6f7f9;
            color: var(--cp-text3);
        }
        .van-button{
           margin-bottom: 10px;
           margin-right: 10px;
        }
    }
}
</style>