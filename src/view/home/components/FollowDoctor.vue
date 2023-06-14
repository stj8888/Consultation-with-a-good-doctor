<script setup lang="ts">
import { ref,onMounted } from 'vue';
import DoctorCard from './DoctorCard.vue'
import { useWindowSize} from '@vueuse/core'
import {DoctorList} from '@/types/consult'
import {getDoctorPage} from '@/services/consult'
const {width} = useWindowSize()
const list =ref<DoctorList>()
const loadData = async () => {
    const res = await getDoctorPage({current:1,pageSize:5})
    list.value=res.data.data.rows
}
onMounted(()=>{
    loadData()
})
</script>
<template>
    <div class="follow-doctor">
   <div class="head">
    <p>推荐关注</p>
    <a href="javascript:;">查看更多<i class="van-icon van-icon-arrow"></i></a>
   </div>
   <div class="body">
    <van-swipe :width="(150 / 375) * width" :show-indicators="false" :loop="false">
    <van-swipe-item v-for="item in list" :key="item.id">
        <DoctorCard :item="item"></DoctorCard>
    </van-swipe-item>
  </van-swipe>
   </div>
    </div>
</template>



<style lang="scss" scoped>
.follow-doctor{
    padding: 20px 20px;

    background-color: var(--cp-bg);
    .head{
        display: flex;
        justify-content: space-between;
        a{
            color: var(--cp-tag);
        }
    }
    .body{
        .van-swipe{
    .van-swipe-item{
    margin-top: 10px;

}
        }

    }
   
}
</style>