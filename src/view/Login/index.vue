<script setup lang="ts">
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { showSuccessToast, showToast,type FormInstance } from 'vant';
import { ref } from 'vue'
import { loginByPassword,sendMobileCode,loginByMobile } from '@/services/user'
import { useUserStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
import { onUnmounted } from 'vue';
const store = useUserStore()
const router = useRouter()
const route = useRoute()
const mobile = ref<string>('')
const password = ref<string>('')
const code = ref<string>('')
const agree = ref(false)
const ispass = ref(true)
const login = async () => {
    if (!agree.value) return showToast({ message: '请勾选我已同意', position: 'middle' })
    const res  =(ispass.value ? await loginByPassword(mobile.value, password.value) :await loginByMobile(mobile.value,code.value))as {data:any}
    store.setUser(res.data.data)
    router.push((route.query.returnUrl as string) || '/user')
    showSuccessToast('登陆成功')
}
//发送验证码
const form=ref<FormInstance>()
const time = ref(0)
let timeId:number
const send =async () => {
    if (time.value > 0) return
    await form.value?.validate('mobile')
  const code1=  await sendMobileCode(mobile.value,'login')
    console.log(code1)
    showSuccessToast('发送成功')
    time.value=60
    //倒计时
    clearInterval(timeId)
    timeId = window.setInterval(()=>{
        time.value--
        if(time.value<=0) window.clearInterval(timeId)
    },1000)
}
onUnmounted(()=>{
    window.clearInterval(timeId)
})
</script>
<template>
    <div class="login-page">
        <cp-nav-bar rightText="注册" @click-right="$router.push('/register')"></cp-nav-bar>
        <div class="login-head">
            <h3>{{ ispass ? '密码登录' : '短信验证码登录' }}</h3>
            <a href="javascript:;" @click="ispass = !ispass">
                <span>{{ ispass ? '短信验证码登录' : '密码登录' }}</span>
                <van-icon name="arrow" />
            </a>
        </div>
        <!-- 表单 -->
        <van-form autocomplete="off" @submit="login">
            <van-field placeholder="请输入手机号" type="tel" v-model="mobile" :rules="mobileRules" name="mobile"/>
            <van-field v-if="ispass" placeholder="请输入密码" type="password" v-model="password" :rules="passwordRules" />
            <van-field v-else placeholder="请输入验证码" type="text" v-model="code" :rules="codeRules">
                <template #button>
                    <span class="btn-send" @click="send">
                        {{ time > 0 ?`${time}s后在发送`:'发送验证码' }}
                    </span>
                 
                </template>
            </van-field>
            <div class="cp-cell">
                <van-checkbox v-model="agree" iconSize="13px">
                    <span>我已同意</span>
                    <a href="javascript:;">用户协议</a>
                    <span>及</span>
                    <a href="javascript:;">隐私条款</a>
                </van-checkbox>
                <van-toast v-model:show="agree" style="padding: 0px">
                </van-toast>
            </div>
            <div class="cp-cell">
                <van-button block round color="#42c2a3" size="normal" nativeType="submit">登录</van-button>
            </div>
            <div class="cp-cell">
                <a href="javascript:;" style="color: var(--cp-text2);">忘记密码?</a>
            </div>
        </van-form>
        <!-- 底部 -->
        <div class="login-other">
            <van-divider>第三方登录</van-divider>
            <div class="icon">
                <img src="@/assets/icon_QQ.svg" alt="">
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.login-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    padding: 30px 30px 50px 30px;

    h3 {
        font-weight: normal;
        font-size: 24px;
    }

    a {
        font-size: 15px;
    }
}

.van-form {
    padding: 0 14px;

    .cp-cell {
        height: 52px;
        line-height: 24px;
        padding: 14px 16px;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        a {
            color: var(--cp-primary);
            padding: 0 5px;
        }
    }
}

.login-other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
        height: 50px;
        display: flex;
        justify-content: center;

        img {
            height: 100%;
        }
    }

}
</style>