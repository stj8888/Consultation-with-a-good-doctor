<script setup lang="ts">
import {Doctor} from '@/types/consult'
import {useFollow} from '@/composable'
defineProps<{item:Doctor}>()
const {loading,follow} = useFollow()

</script>
<template>
    <div class="doctor-card">
   <van-image round :src="item.avatar"></van-image>
   <p class="name">{{ item.name }}</p>
   <p class="van-ellipsis">{{ item.hospitalName }} {{item.depName}}</p>
   <p>{{item.positionalTitles}}</p>
   <van-button  :loading="loading" class="button" round  type="primary" size="small" @click="follow(item)">
    {{ item.likeFlag === 1 ?'已关注' : '+关注' }}
   </van-button>
    </div>
</template>
<style lang="scss" scoped>
.doctor-card{
    margin-right: 10px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:space-around;
    background-color: #ffffff;
    border-radius: 20px;
    position: relative;
    .van-image{
        width: 4rem;
    }
    .button{
        width: 100px;
        height: 35px; 
    }
    .van-ellipsis{
        font-size: 12px;
        color: var(--cp-tag);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 110px;
      & + p{
        font-size: 12px;
        color: var(--cp-tag);
      }  
    }
}
</style>