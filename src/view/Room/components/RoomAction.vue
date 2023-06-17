<script setup lang="ts">
import { ref} from 'vue'
import { uploadImage } from '@/services/consult'
import type { Image } from '@/types/consult'
import type { UploaderAfterRead } from 'vant/lib/uploader/types'
import { showLoadingToast,closeToast } from 'vant'

const emit  = defineEmits<{
  (e:'send-text',text:string):void
  (e: 'send-image', img: Image): void
}>()
defineProps<{
  disabled: boolean
}>()
const text = ref('')
const sendText = () => {
  emit('send-text',text.value)
  text.value = ''
}
const sendImage: UploaderAfterRead = async (data) => {
  if (Array.isArray(data)) return
  if (!data.file) return
   showLoadingToast('正在上传')
  const res = await uploadImage(data.file)
  closeToast()
  emit('send-image', res.data.data)
}
</script>
<template>
  <div class="room-action">
    <van-field
     :disabled="disabled"
     v-model="text"
     @keyup.enter="sendText"
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off">
    </van-field>
    <!-- 不预览，使用小图标作为上传按钮 -->
    <van-uploader upload-icon="photo-o" :max-size="5 * 1024 * 1024"  upload-text="上传图片" :preview-image="false" :disabled="disabled" :after-read="sendImage">
      <van-icon name="photo-o" />
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
