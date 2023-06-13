import CpNavBar from '@/components/cpNavBar.vue'
import CpRadioBtn from '@/components/CpRadioBtn.vue'
declare module 'vue' {
    interface GlobalComponents {
        CpNavBar:typeof CpNavBar
        CpRadioBtn: typeof CpRadioBtn
    }
}