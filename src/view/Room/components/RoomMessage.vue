<script setup lang="ts">
import { IllnessTime, MsgType } from '@/enums'
import { flagOptions, timeOptions } from '@/services/constants'
import { Image } from '@/types/consult'
import { Message } from '@/types/room'
import { showImagePreview  } from 'vant'
import dayjs from 'dayjs'
import {useUserStore} from '@/stores'
import { getPrescriptionPic } from '@/services/consult'
import evaluateCard from './evaluateCard.vue'
import {useShowPrescription} from '@/components'
  const showPrescription = async (id?: string) => {
    if (id) {
      const res = await getPrescriptionPic(id)
      showImagePreview([res.data.data.url])
    }
  }

const formatTime = (time: string) => dayjs(time).format('HH:mm')
const store = useUserStore()
const previewImg = (pictures?: Image[]) => {
  if (pictures && pictures.length)  showImagePreview (pictures.map((item) => item.url))
}
 defineProps<{list:Message[]}>()
const getIllnessTimeText = (time: IllnessTime) =>
  timeOptions.find((item) => item.value === time)?.label
  const getConsultFlagText = (flag: 0 | 1) =>
  flagOptions.find((item) => item.value === flag)?.label

</script>
<template>
  <!-- 患者卡片 -->
<div v-for=" { msgType, msg,createTime,from } in list">
  <div class="msg msg-illness" v-if="msgType === MsgType.CardPat">
    <div class="patient van-hairline--bottom" v-if="msg.consultRecord">
      <p>{{ msg.consultRecord.patientInfo.name }}
          {{ msg.consultRecord.patientInfo.genderValue }}
          {{ msg.consultRecord.patientInfo.age }}岁</p>
      <p> {{ getIllnessTimeText(msg.consultRecord.illnessTime) }} |
          {{ getConsultFlagText(msg.consultRecord.consultFlag) }}</p>
    </div>
    <VanRow>
      <VanCol span="6">病情描述</VanCol>
      <VanCol span="18">{{ msg.consultRecord?.illnessDesc }}</VanCol>
      <VanCol span="6">图片</VanCol>
      <VanCol span="18"  @click="previewImg(msg.consultRecord?.pictures)">点击查看</VanCol>
    </VanRow>
  </div>
  <!-- 通知-温馨提示 -->
  <div class="msg msg-tip" v-if="msgType === MsgType.NotifyTip">
    <div class="content">
      <span class="green">温馨提示：</span>
      <span>{{ msg.content }}</span>
    </div>
  </div>
    <!-- 通知-通用 -->
    <div class="msg msg-tip" v-if="msgType === 31">
    <div class="content">
      <span>{{ msg.content }}</span>
    </div>
  </div>
    <!-- 发送文字 -->
       <!-- 我发的消息 -->
       <div class="msg msg-to" v-if="msgType === MsgType.MsgText && store.user?.id === from">
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <div class="pao">{{ msg.content }}</div>
      </div>
      <van-image :src="store.user?.avatar" />
    </div>

    <!-- 医生发的消息 -->
    <div class="msg msg-from" v-if="msgType === MsgType.MsgText && store.user?.id !== from">
      <van-image :src="store.user?.avatar" />
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <div class="pao">{{ msg.content }}</div>
      </div>
    </div>

  <!-- 通知-结束 -->
  <!-- <div class="msg msg-tip msg-tip-cancel">
    <div class="content">
      <span>订单取消</span>
    </div>
  </div> -->
  <!-- 发送图片 -->
  <div class="msg msg-to" v-if="msgType === MsgType.MsgImage && store.user?.id === from">
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <van-image fit="contain" :src="msg.picture?.url" />
      </div>
      <van-image :src="store.user?.avatar" />
    </div>
  <!-- 接收文字 -->
  <!-- <div class="msg msg-from" v-if="msgType === MsgType.MsgText && store.user?.id !== from">
      <van-image :src="store.user?.avatar" />
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <div class="pao">{{ msg.content }}</div>
      </div>
    </div> -->
  <!-- 接收图片 -->
  <div class="msg msg-from" v-if="msgType === MsgType.MsgImage && store.user?.id !== from">
      <van-image :src="store.user?.avatar" />
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <van-image fit="contain" :src="msg.picture?.url" />
      </div>
    </div>
      <!-- 处方卡片 -->
<!-- 处方 -->
<div class="msg msg-recipe" v-if="msgType === MsgType.CardPre">
      <div class="content" v-if="msg.prescription">
        <div class="head van-hairline--bottom">
          <div class="head-tit">
            <h3>电子处方</h3>
            <p @click="showPrescription(msg.prescription?.id)">
              原始处方 <van-icon name="arrow"></van-icon>
            </p>
          </div>
          <p>
            {{ msg.prescription.name }}
            {{ msg.prescription.genderValue }}
            {{ msg.prescription.age }}岁
            {{ msg.prescription.diagnosis }}
          </p>
          <p>开方时间：{{ msg.prescription.createTime }}</p>
        </div>
        <div class="body">
          <div class="body-item" v-for="med in msg.prescription.medicines" :key="med.id">
            <div class="durg">
              <p>{{ med.name }} {{ med.specs }}</p>
              <p>{{ med.usageDosag }}</p>
            </div>
            <div class="num">x{{ med.quantity }}</div>
          </div>
        </div>
        <div class="foot">
          <span @click="buy(msg.prescription)">购买药品</span>
        </div>
      </div>
    </div>
    <div
      class="msg msg-comment"
      v-if="msgType === MsgType.CardEva || msgType === MsgType.CardEvaForm"
    >
      <evaluate-card :evaluateDoc="msg.evaluateDoc" />
    </div>
      <!-- 通知-结束 -->
    <div class="msg msg-tip msg-tip-cancel" v-if="msgType === MsgType.NotifyCancel">
      <div class="content">
        <span>{{ msg.content }}</span>
      </div>
    </div>
  </div>

  <!-- 评价卡片，后期实现 -->
</template>

<style lang="scss" scoped>
@import '@/styles/room.scss';
</style>
