<script setup lang="ts">
import type {knowledge} from '@/types/consult'
import {useFollow} from '@/composable'
defineProps<{item:knowledge}>()
const {follow} = useFollow('knowledge')
</script>

<template>
    <div class="page-list">
   <div class="head">
    <van-image
    round
    width="3rem"
    height="3rem"
    cover
    :src="item.creatorAvatar"
     /> 
<div class="text">
    <p class="name">{{item.creatorName}}</p>
    <span class="wen">{{item.creatorHospatalName}}{{ item.creatorDep }}{{ item.creatorTitles }}</span>
</div>
    <div class="guanzu" @click="follow(item)">
        <van-icon name="plus" v-if="item.likeFlag !== 1"></van-icon>
        <p>{{ item.likeFlag === 1 ?'已关注':'关注' }}</p>
    </div>
   </div>
   <div class="body">
    <h3 class="body-title">{{item.title}}</h3>
    <p class="body-tag">
      <span v-for="(tag,i) in item.topics" :key="i">#{{ tag }}</span>
    </p>
    <p class="body-text van-multi-ellipsis--l2">
    {{  item.content.replace(/<[^>]+>/g, '')}}
    </p>
    <div class="body-img" :class="{large:item.coverUrl.length===1}">
      <img v-for="(url,i) in item.coverUrl" :key="i" :src="url" alt="">
    </div>
    <p class="body-logs">
      <span>{{ item.collectionNumber }}收藏</span>
      <span>{{ item.commentNumber }}评论</span>
    </p>
   </div>
    </div>
</template>


<style lang="scss" scoped>

.page-list{
    padding: 0 10px;
    .body{
      margin-top: 10px;
      &-logs{
       color: var(--cp-tag);
       margin-top: 10px;
       >span{
        margin-right: 16px;
        font-size: 12px;
       }
      }
    &-text{
      line-height: 25px;
      color: var(--cp-text3);
    }
    &-img{
      margin-top: 10px;
      display: flex;
      justify-content:space-around;
      align-items: center;
      img{
        height: 110px;
        width: 110px;
        border-radius: 10px;
        object-fit: cover;
      }
    }  
    }
    .head{
        margin-top: 30px;
      display: flex;
      justify-content: space-evenly;
      align-items:flex-start;
      .text{
        padding-left: 10px;
        width:200px;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        .name{
          font-size: 18px;
          font-weight: 800;
        }
        .wen{
            color: var( --cp-dark);
        }
      }
      .guanzu{
        margin-top: 10px;
        width: 90px;
        border-radius: 80px;
        border: 1px solid var(--cp-primary);
        height: 35px;
        display: flex;
        justify-content: center;
        align-items:center;
        color: var(--cp-primary);
      }
    }
}
</style>