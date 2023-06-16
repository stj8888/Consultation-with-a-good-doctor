<script setup lang="ts">
import type {ConsultIllness,Image} from '@/types/consult'
import { ref,computed,onMounted } from 'vue'
import {IllnessTime} from '@/enums'
import type { UploaderAfterRead, UploaderFileListItem } from 'vant/lib/uploader/types'
import {uploadImage} from '@/services/consult'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'
import {useConsultStore} from '@/stores'
const timeOptions = [
    {label:'一周内',value:IllnessTime.Week},
    {label:'一月内',value:IllnessTime.Month},
    {label:'半年内',value:IllnessTime.HalfYear},
    {label:'大于半年',value:IllnessTime.More},
]
const flagOptions =  [
    {label:'就诊过',value:0},
    {label:'没就诊过',value:1}
]
const form = ref<ConsultIllness>({
    illnessDesc:'',
    illnessTime:undefined,
    consultFlag:undefined,
    pictures:[]
})
const fileList = ref<Image[]>([])
const onAfterRead:UploaderAfterRead = (item) => {
  //上传图片
  if(Array.isArray(item)) return
  if(!item.file) return
  //开始上传
  item.status = 'uploading'
  item.message = '上传中...'
  uploadImage(item.file).then(res=>{
    item.status = 'done'
    item.message = undefined
    item.url = res.data.data.url
    console.log(res.data)
    form.value.pictures?.push(res.data.data)
  }).catch(() => {
    item.status = 'failed'
    item.message = '上传失败'
  })
}
const onDeleteImg = (item:UploaderFileListItem) => {
  //删除图片
  form.value.pictures = form.value.pictures?.filter((pic) => pic.url !== item.url)
}
const disabled = computed(()=>!form.value.illnessDesc || form.value.illnessTime === undefined || form.value.consultFlag === undefined)
const store = useConsultStore()
const router = useRouter()
const next = () => {
  if(!form.value.illnessDesc) return showToast('请输入病情描述')
  if(form.value.illnessTime === undefined) return showToast('请选择病症持续时间')
  if(form.value.consultFlag === undefined) return showToast('请选择是否已经就诊')
  store.setIllness(form.value)
  router.push('/user/patient?isChange=1')
}
onMounted(() => {
  if(store.consult.illnessDesc) {
    showConfirmDialog({
      title:'温馨提醒',
      message:'是否恢复您之前填写的病情信息?',
      closeOnPopstate: false
    }).then(()=>{
      //确认
      const {illnessDesc,illnessTime,consultFlag,pictures} = store.consult
      form.value = {illnessDesc,illnessTime,consultFlag,pictures}
      //图片回显
      fileList.value = pictures || []
    })
  }
})
</script>
<template>
    <div class="consult-illness-page">
 <cp-nav-bar title="图文问诊"></cp-nav-bar>
 <div class="head">
<van-image
  round
  width="4rem"
  height="4rem"
  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
/>
<div class="head-right">
    <h3>在线医生</h3>
    <div class="head-right-text">
        请描述绍等会撒大声地手动滑稽开始的圣诞树结婚登记
    </div>
    <van-icon name="shield-o">内容仅医生可见</van-icon>   
</div>
 </div>
 <div class="illness-form">
    <van-field
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
        v-model="form.illnessDesc"
      ></van-field>
      <div class="illnesstime">
        <p>本次患病多久了?</p>
        <cp-radio-btn :options="timeOptions" v-model="form.illnessTime"></cp-radio-btn>
      </div>
      <div class="illnessdo">
        <p>此次病情是否去医院就诊过?</p>
        <cp-radio-btn :options="flagOptions" v-model="form.consultFlag" />
      </div>
 </div>
 <div class="illness-img">
  <van-uploader upload-icon="photo-o" upload-text="上传图片" max-count="9" :max-size="5 * 1024 * 1024" :after-read="onAfterRead" @delete="onDeleteImg" v-model="fileList"></van-uploader>
  <p class="tip">上传内容仅医生可见，最多9张图，最大5MB</p>
 </div>
 <van-button :class={disabled:disabled} @click="next" type="primary" block round >下一步</van-button>
    </div>
</template>

<style lang="scss" scoped>
.consult-illness-page{
  padding: 0 10px;
.head{
    margin: 10px 0px;
    display: flex;
    .van-image{
        margin-top: 10px;
    }
    .head-right{
     margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 120px;
      &>h3{
        font-size: 18px;
        color: #373c48;
      }
      .head-right-text{
        border: 1px solid #f6f7f9;
        line-height: 20px;
        padding: 10px;
        background-color: #f6f7f9;
        color: #969697;
        font-weight:1000;
      }
      &>.van-icon{
        font-size: 1px;
        color: #7b7b7c;
        padding-bottom: 5px;
      }
    }
}
.illness-form{
height: 280px;
border-top: 1px solid var(--cp-tip);
font-size: 15px;
display: flex;
flex-direction: column;
justify-content: space-between;
.illnessdo{
    line-height: 50px;
}
.illnesstime{
    line-height: 50px;
}
}
.illness-img{
  .van-uploader{
    border-radius: 15px;
  }
  margin:10px 0px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: var(--cp-tip);
}
}
.van-button {
  font-size: 16px;
  margin-top: 30px ;
  &.disabled {
    opacity: 1;
    background: #fafafa;
    color: #d9dbde;
    border: #fafafa;
  }
}
</style>