<script setup lang="ts">
import { ref } from 'vue';
const active =ref(1)
</script>
<template>
<div class="layout-page">
<router-view></router-view>
<van-tabbar route v-model="active" active-color="#42c2b3">
  <van-tabbar-item icon="home-o" to="/home">
    <span>首页</span>
  </van-tabbar-item>
  <van-tabbar-item  to="/article">
    <span>健康百科</span>
    <template #icon="">
        <van-icon name="balance-list" />
        </template>
  </van-tabbar-item>
  <van-tabbar-item  to="/notify">
     <span> 消息中心</span>
      <template #icon="">
        <van-icon name="bell" />
        </template>
  </van-tabbar-item>
  <van-tabbar-item icon="setting-o" to="/user">
      <span>我的</span>
      <template #icon="">
        <van-icon name="manager" />
        </template>
  </van-tabbar-item>
</van-tabbar>

    </div>
</template>

<style lang="scss" scoped>
.layout-page {
  :deep() {
    .van-tabbar-item {
      &__icon {
        font-size: 21px;
      }
      &__text {
        font-size: 11px;
      }
      &:not(.van-tabbar-item--active) {
        color: var(--cp-text3);
      }
    }
  }
}
</style>