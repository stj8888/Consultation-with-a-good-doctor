<script setup lang="ts">
import { ref,onMounted,computed } from 'vue'
import { getAllDep} from '@/services/consult'
import type {TopDep} from '@/types/consult'
import {useConsultStore} from '@/stores/index'
const store =useConsultStore()
const allDep = ref<TopDep>({
id: '',
name: '',
child: []
})
onMounted( async () => {
    const res =await getAllDep()
    console.log(res)
    allDep.value = res.data.data
})
const active = ref(0)
const subDep = computed(()=>allDep.value[active.value]?.child)
</script>
<template>
    <div class="consult-dep-page">
        <cp-nav-bar title="选择科室"></cp-nav-bar>
        <div class="wrapper">
            <van-sidebar v-model="active">
                <van-sidebar-item :title="top.name" v-for="top in allDep" :key="top.id"></van-sidebar-item>
            </van-sidebar>
            <div class="sub-dep">
                <router-link to="/consult/illness" v-for="sub in subDep" :key="sub.id" @click="store.setDep(sub.id)">{{ sub.name }}</router-link>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.van-sidebar {
  width: 205px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.wrapper{
    height: calc(100vh - 46px);
    display: flex;
    text-align:start;
    overflow: hidden;
    .sub-dep{
        display: flex;
        flex-direction: column;
         line-height: 40px;
         font-weight: 100;
         overflow-y: auto;
         width: 100%;
         >a{
            padding: 4px 30px;
         }
    }
}
</style>