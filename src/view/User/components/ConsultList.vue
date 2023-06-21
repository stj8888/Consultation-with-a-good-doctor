<script setup lang="ts">
import ConsultItem from './ConsultItem.vue'
import { getConsultOrderList } from '@/services/consult'
import type {ConsultOrderItem,ConsultOrderListParams} from '@/types/consult'
import {ref} from 'vue'
import {ConsultType} from '@/enums'
const props = defineProps<{
type:ConsultType
}>()
const params = ref<ConsultOrderListParams>({
    type:props.type,
    current:1,
    pageSize:5
})
const loading = ref(false)
const finished = ref(false)
const list = ref<ConsultOrderItem[]>([])
const onLoad =async () => {
const res = await getConsultOrderList(params.value)
list.value.push(...res.data.data.rows)
console.log(res.data)
if (params.value.current < res.data.data.pageTotal) {
    params.value.current++
}else{
    finished.value=true
}

loading.value = false
}
const onDelete = (id:string) => {
      list.value = list.value.filter((item) => item.id !== id)
      if(!list.value.length) onLoad()
}
</script>

<template>
    <div class="consult-list">
<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
   <ConsultItem v-for="item in list" :key="item.id" :item="item" @on-delete="onDelete"></ConsultItem>
</van-list>
    </div>
</template>

<style lang="scss" scoped>

</style>