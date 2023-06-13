<script setup lang="ts">
import { getPatientList, addPatient, editPatient, delPatient } from '@/services/user'
import type { PatientList, Patient } from '@/types/user'
import { onMounted, ref, computed } from 'vue'
import { nameRules, idCardRules } from '@/utils/rules'
import { FormInstance, showConfirmDialog, showSuccessToast } from 'vant';
const list = ref<PatientList>()
let length: number
const loadList = async () => {
    const res = await getPatientList()
    list.value = (res.data as any).data as PatientList
    length = ((res.data as any).data as PatientList).length
}
onMounted(() => {
    loadList()
})
const options = [
    { label: '男', value: 1 },
    { label: '女', value: 0 }
]
const show = ref(false)
const showPopup = (_item?: Patient) => {
    if (_item) {
        const { id, gender, name, idCard, defaultFlag } = _item
        console.log(_item)
        patient.value = { id, gender, name, idCard, defaultFlag }
    } else {
        patient.value = { ...initPatient }
    }
    show.value = true
}
const patient = ref<Patient>({
    name: '',
    idCard: '',
    gender: 1,
    defaultFlag: 0
})
const defaultFlag = computed({
    get() {
        return patient.value.defaultFlag === 1 ? true : false
    },
    set(value) {
        return patient.value.defaultFlag = value ? 1 : 0
    }
})
const initPatient: Patient = {
    name: '',
    idCard: '',
    gender: 1,
    defaultFlag: 0
}
const form = ref<FormInstance>()
const onsubmit = async () => {
    await form.value?.validate()
    const gender = +patient.value.idCard.slice(-2, -1) % 2
    if (gender !== patient.value.gender) {
        await showConfirmDialog({
            title: '温馨提醒',
            message: '填写的性别和身份证号中的不一致\n您确认提交吗？'
        })
    }
    patient.value.id ? await editPatient(patient.value) : await addPatient(patient.value)
    show.value = false
    loadList()
    showSuccessToast(patient.value.id ? '编辑成功' : '添加成功')
}
const remove = async () => {
    if (patient.value.id) {
        await showConfirmDialog({
            title: '温馨提示',
            message: `您确认要删除 ${patient.value.name} 患者信息吗 ？`
        })
        await delPatient(patient.value.id)
        show.value = false
        loadList()
        showSuccessToast('删除成功')
    }
}
</script>
<template>
    <div class="patient-page">
        <cp-nav-bar title="家庭档案"></cp-nav-bar>
        <div class="patient-list">
            <div class="patient-item" v-for="item in list" :key="item.id">
                <div class="info">
                    <span class="name">{{ item.name }}</span>
                    <span class="id">{{ item.idCard.replace(/^(.{6}).+(.{4})$/, '\$1********\$2') }}</span>
                    <span style="padding-left: 20px;">{{ item.genderValue }}</span>
                    <span>{{ item.age }}岁</span>
                </div>
                <div class="icon" @click="showPopup(item)"><van-icon name="edit"></van-icon></div>
                <div class="tag" v-if="item.defaultFlag">默认</div>
            </div>
            <div class="patient-add" v-if="length < 6" @click="showPopup()">
                <van-icon name="plus" style="padding-top: 20px;"></van-icon>
                <p>添加患者</p>
            </div>
            <div class="patient-tip">最多可添加6人</div>
        </div>
        <van-popup v-model:show="show" position="right">
            <cp-nav-bar :title="patient.id ? '编辑患者' : '添加患者'" right-text="保存" :back="() => { show = false }"
                @click-right="onsubmit()"></cp-nav-bar>
            <van-form autocapitalize="off" ref="form">
                <van-field label="真实姓名" placeholder="请输入真实姓名" :rules="nameRules" v-model="patient.name"></van-field>
                <van-field label="身份证号" placeholder="请输入身份证号" :rules="idCardRules" v-model="patient.idCard"></van-field>
                <van-field label="性别" class="pd4">
                    <template #input>
                        <cp-radio-btn v-model="patient.gender" :options="options"></cp-radio-btn>
                    </template>
                </van-field>
                <van-field label="默认就诊人">
                    <template #input>
                        <van-checkbox v-model="defaultFlag" :iconSize="18" round></van-checkbox>
                    </template>
                </van-field>
            </van-form>
            <van-action-bar v-if="patient.id">
                <van-action-bar-button @click="remove">删除</van-action-bar-button>
            </van-action-bar>
        </van-popup>
    </div>
</template>
<style lang="scss" scoped>
.van-action-bar {
    padding: 0 10px;
    margin-bottom: 10px;

    .van-button {
        color: var(--cp-price);
        background-color: var(--cp-bg);
    }
}

.patient-page {
    :deep() {
        .van-popup {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
        }
    }
}

.patient-list {
    .patient-add {
        margin: 20px 20px;
        background-color: #f6f6f9;
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 50px;
        justify-content: space-around;
        color: #42c1a3;
        font-weight: bold;
        border-radius: 10px;
    }

    .patient-tip {
        padding-left: 20px;
        font-weight: lighter;
        color: var(--cp-tag);
    }

    .patient-item {
        margin: 20px 20px;
        background-color: #f6f6f9;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        position: relative;

        .info {
            margin: 20px 0px;
            color: var(--cp-tag);

            span {
                margin-right: 20px;
                line-height: 30px;
            }

            .name {
                color: var(--cp-text2);
                padding: 10px 0px 0px 20px;
                font-size: 16px;
            }

            .id {
                color: var(--cp-text2);
                padding: 10px 20px 0px 20px;
            }
        }

        .tag {
            background-color: #42c1a3;
            color: white;
            position: absolute;
            right: 50px;
            top: 25px;
        }
    }
}
</style>