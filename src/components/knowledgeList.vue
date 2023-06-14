<script setup lang="ts">
import { ref } from 'vue'
import type { knowledgeType,knowledgeList,knowledgeParams} from '@/types/consult'
import {getKnowledgePage} from '@/services/consult'
const list = ref<knowledgeList>([])
    const props = defineProps<{
    type:knowledgeType
}>()
const loading = ref(false)
const finished = ref(false)
const params = ref<knowledgeParams>({
    type:props.type,
    current:1,
    pageSize:10
})
const onLoad =async () => {
  // 加载数据
  console.log('loading',loading.value)
  // 模拟加载更多
const res = await getKnowledgePage(params.value)
console.log(res)
      list.value.push(...res.data.data.rows)
      if(params.value.current>=res.data.data.pageTotal){
        finished.value=true
      }else{
        params.value.current++
      }
      loading.value=false
}
</script>
<template>
    <div class="konwledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    > 
    <knowledge-card v-for="item in list" :key="item.id" :item="item"></knowledge-card>
      </van-list>
    </div> 
</template>

<style lang="scss" scoped>

</style>