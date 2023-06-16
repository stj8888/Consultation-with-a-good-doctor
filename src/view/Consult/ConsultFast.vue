<script setup lang="ts">
import { useConsultStore } from '@/stores'
const store =useConsultStore()
</script>
<template>
    <div class="consult-fast-page">
  <cp-nav-bar title="急速问诊" right-text="问诊激记录"></cp-nav-bar>
  <div class="fast-log">
    <img src="@/assets/doctor.png" alt="">
    <p class="text"><span>20s</span>快速匹配专业医生</p>
  </div>
<div class="fast-type">
    <router-link to="/consult/dep" class="item" @click="store.setIllnessType(1)">
    <van-icon name="user-circle-o" color="#59d5d8" size="40" class="consult-doctor"></van-icon>
   <div class="info">
    <p>三甲图文问诊</p>
    <p>三甲主治及以上级别医生</p>
  </div>
  <van-icon name="arrow" class="arrow"></van-icon>
    </router-link>
    <router-link to="/consult/dep" class="item" @click="store.setIllnessType(0)">
    <van-icon name="chat-o" color="#6bb0f3" size="40" class="consult-doctor"></van-icon>
   <div class="info">
    <p>普通图文问诊</p>
    <p>二甲主治及以上级别医生</p>
  </div>
  <van-icon name="arrow" class="arrow"></van-icon>
    </router-link>
</div>
    </div>
</template>
<style lang="scss" scoped>
.fast-log{
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;
    img{
        width: 300px;
    }
    .text{
        font-size: 16px;
        font-weight:560;
        span{
            color: var( --cp-primary);
            padding-right: 10px;
        }
    }
}
.fast-type{
    margin: 0 15px;
 .item{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 30px 0px;
    border-radius: 4px;
    border: 1px solid var( --cp-line);
    height:70px;
    .consult-doctor{
     flex:0.2;
     padding-left: 20px;
    }
    .info{
        flex: 1;
        & :nth-child(1) {
            font-size:18px;
            color: var( --cp-text1);
            font-weight: 400;
        }
        & :nth-child(2) {
            color: var(--cp-text3);
        }
    }
    .arrow{
        flex:0.1
    }
 }
}
</style>