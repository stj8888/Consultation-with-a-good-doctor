 <script setup lang="ts">
 import {ref} from 'vue'
 import FollowDoctor from './components/FollowDoctor.vue'
 import { useConsultStore} from '@/stores/index'
 import {ConsultType} from '@/enums'
 const store = useConsultStore()
   const active = ref(0);
 </script>
<template>
<div class="home-page">
  <!-- 头部 -->
  <div class="home-header">
    <div class="con">
        <h1>优医</h1>
        <div class="serch">
        <van-search  placeholder="搜一搜：疾病/症状/医生/健康知识" background="#f7f8fa" shape="round"/>
        </div>
    </div>
  </div>
  <!-- 导航 -->
  <div class="home-navs">
    <van-row>
      <van-col span="8">
      <router-link to="/" class="nav">
        <van-icon  class='iconfont' class-prefix='icon' name="-yiliao-yisheng" size="38px"></van-icon>
        <p class="title">问医生</p>
        <p class="desc">按科室查问医生</p>
      </router-link>
      </van-col>
      <van-col span="8">
      <router-link to="/consult/fast" @click="store.setType(ConsultType.Fast)" class="nav">
        <van-icon class='iconfont' class-prefix='icon' name="wenzhen" size="38px"></van-icon>
        <p class="title">急速问诊</p>
        <p class="desc">20s医生急速回复</p>
      </router-link>
      </van-col>
      <van-col span="8">
      <router-link to="/" class="nav">
        <van-icon class='iconfont' class-prefix='icon' name="menzhen" size="38px"></van-icon>
        <p class="title">开药门诊</p>
        <p class="desc">线上买药更方便</p>
      </router-link>
      </van-col>
    </van-row>
    <van-row>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <van-icon class='iconfont' class-prefix='icon' name="yaopindingdan" size="38px"></van-icon>
            <p class="title">药品订单</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <van-icon class='iconfont' class-prefix='icon' name="jiankangdangan" size="38px"></van-icon>
            <p class="title">健康档案</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <van-icon class='iconfont' class-prefix='icon' name="wodechufang" size="38px"></van-icon>
            <p class="title">我的处方</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <van-icon class='iconfont' class-prefix='icon' name="chaxun" size="38px"></van-icon>
            <p class="title">疾病查询</p>
          </router-link>
        </van-col>
      </van-row>
  </div>
  <!-- 轮播 -->
  <div class="home-banner">
    <van-swipe indicator-color="#fff" >
        <van-swipe-item >
          <img src="@/assets/02.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/02.png" alt="" />
        </van-swipe-item>
      </van-swipe>
  </div>
  <van-tabs shrink sticky v-model:active="active">
  <van-tab title="关注" name="like">
    <FollowDoctor></FollowDoctor>
    <knowledge-list type="like"></knowledge-list></van-tab>
  <van-tab title="推荐"><knowledge-list type="recommend"></knowledge-list></van-tab>
  <van-tab title="减脂"><knowledge-list type="fatReduction"></knowledge-list></van-tab>
  <van-tab title="饮食"><knowledge-list type="food"></knowledge-list></van-tab>
</van-tabs>
    </div>
</template>
<style lang="scss" scoped>
.home-banner {
  margin: 10px 15px;
  img {
    width: 100%;
    border-radius: 15px;
    height: 100px;
  }
}
.home-navs {
  padding: 10px 15px 0 15px;
  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    .iconfont{
      margin-left: 12px;
      }
    .title {
      font-weight: 500;
      margin-top: 5px;
      color: var(--cp-text1);
    }
    .desc {
      font-size: 11px;
      color: var(--cp-tag);
      margin-top: 2px;
    }
    &.min {
      .cp-icon {
        font-size: 31px;
      }
      .title {
        font-size: 13px;
        color: var(--cp-text2);
        font-weight: normal;
      }
    }
  }
}
.home-header{
    &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 90px;
    background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }
.con{
    position: relative;
    padding: 0 15px;
    h1{
       
      font-size: 18px;
      color: #fff;
      font-weight: normal;
      padding: 20px 0;
      line-height: 1;
      padding-left: 5px;
    }
    .serch{
        padding: 0 1px;
       :deep(){
        .van-search{
        height: 40px;
        border-radius: 50px;
        }
       } 
       
    }
}
}
</style>