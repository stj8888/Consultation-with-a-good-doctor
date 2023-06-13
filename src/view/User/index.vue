<script setup lang="ts">
import {getUserInfo} from '@/services/user'
import type { UserInfo } from '@/types/user'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'
const store = useUserStore()
const router= useRouter()
const user =ref<UserInfo>()
onMounted(async()=>{
    const res = await getUserInfo() 
    user.value= (res.data as any).data as UserInfo 
    console.log(res)
})
const tools = [
  { label: '我的问诊', path: '/user/consult' },
  { label: '我的处方', path: '/' },
  { label: '家庭档案', path: '/user/patient' },
  { label: '地址管理', path: '/user/address' },
  { label: '我的评价', path: '/' },
  { label: '官方客服', path: '/' },
  { label: '设置', path: '/' }
]
const show = ref(false)
const logout = async () => {
  show.value=true
}
const Cance = () =>{
show.value=false
}
const confirm = () =>{
  store.delUser()
  router.push('/login')
}
</script>
<template>
  <dialog-page @cance="Cance" v-if="show" @confirm="confirm" title="温馨提醒" title2="您确认要退出优医问诊吗?"></dialog-page>
  <div class="user-page" v-if="user">
   <div class="user-page-head">
    <div class="top">
      <van-image round fit="cover" :src="user.avatar"></van-image>
      <div class="name"><p>{{user.account}}</p><p><van-icon name="edit"/></p></div>  
    </div>
    <van-row>
        <van-col span="6">
          <p>{{user.collectionNumber}}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>{{user.likeNumber}}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{user.score}}</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>{{user.couponNumber}}</p>
          <p>优惠券</p>
        </van-col>
    </van-row>
   </div>
   <div class="user-page-order">
    <div class="head">
        <h3>药品管理</h3>
        <router-link to="/order">全部订单<van-icon name="arrow"></van-icon></router-link>
    </div>
    <van-row>
        <van-col span="6">
            <van-badge :content="user.orderInfo.paidNumber || ''">
                <van-icon name="peer-pay" size="30" color="#f57c25"/>
            </van-badge>
          <p>待付款</p>
        </van-col>
        <van-col span="6">
            <van-badge :content="user.orderInfo.shippedNumber || ''">
                <van-icon name="tosend" size="30" color="#4c71f1"/>
            </van-badge>
          <p>待发货</p>
        </van-col>
        <van-col span="6">
            <van-badge :content="user.orderInfo.receivedNumber || ''">
                <van-icon name="logistics" size="30" color="#c7221d"/>
            </van-badge>
          
          <p>待收货</p>
        </van-col>
        <van-col span="6">
            <van-badge :content="user.orderInfo.finishedNumber || ''">
                <van-icon name="completed" size="30" color="#3fb8ad"/>
            </van-badge>
          
          <p>已完成</p>
        </van-col>
    </van-row>
   </div>
   <div class="user-page-group">
    <h3>快捷工具</h3>
    <van-cell v-for="(item,i) in tools" :key="item.label" :title="item.label" :to="item.path" is-link :border="false">
    <template #icon>
      <van-icon class=“iconfont” class-prefix='icon' :name="`g${i+1}`" />
    </template>
    </van-cell>
   </div>
   <a class="logout" href="javascript:;" @click="logout()">退出登录</a>
    </div>
    <div v-else class="lo1">加载中</div>
</template>

<style lang="scss" scoped>
.user-page{
    background-color: var(--cp-bg);
    min-height: calc(100vh - 50vh);
    padding: 0 15px 65px;
    &-head{
        background: linear-gradient(180deg,rgba(44,181,165,0.46),rgba(44,181,165,0));
        height: 200px;
      margin: 0 -15px;
      padding: 0 15px;
    .top{
    padding-top: 50px;
    display: flex;
    align-items: center;
    .van-image{
        width: 70px;
        height: 70px;
    }
    .name{
        padding-left: 10px;
        font-size: 18px;
        font-weight: bold;
        .van-icon{
            margin-top: 10px;
            padding-top: 16px;
            color: var(--cp-primary);
        }
    }
}
.van-row{
margin: 0 -15px;
padding-top: 15px;
p{
    text-align: center;
    &:first-child{
        font-size: 18px;
        font-weight: 500;
    }
    &:last-child{
        color: var(--cp-dark);
        font-size: 12px;
        padding-top: 4px;
    }
}
}
}
&-order{
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    .head{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        line-height: 50px;
       padding: 0 15px;
       a{
        color: var(--cp-tip);
       }
    }
    .van-col{   
    text-align: center;
    margin-top: 5px;
   p{
    font-size: 12px;
    padding-top: 4px;
   }
    }
}
&-group{
background-color: #fff;
border-radius: 8px;
overflow: hidden;
h3{
  padding-left: 16px;
  line-height: 44px;
  font-weight: bold;
  margin-bottom: 10px;
}
.van-cell{
  align-items: center;
  padding-bottom: 15px;
  .van-icon{
  font-size: 17px;
}
}
}
.logout {
    display: block;
    margin: 20px auto;
    width: 100px;
    text-align: center;
    color: var(--cp-price);
    border: 1px solid red;
    border-radius: 10px;
  }
}

</style>