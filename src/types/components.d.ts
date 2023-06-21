import CpNavBar from '@/components/cpNavBar.vue'
import CpRadioBtn from '@/components/CpRadioBtn.vue'
import CpPaySheet from '@/components/CpPaySheet.vue'
declare module 'vue' {
    interface GlobalComponents {
        CpNavBar:typeof CpNavBar
        CpRadioBtn: typeof CpRadioBtn
        CpPaySheet: typeof CpPaySheet
    }
}