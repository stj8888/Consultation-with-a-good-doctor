import {getPrescriptionPic} from '@/services/consult'
import { showImagePreview}  from 'vant'
export const useShowPrescription = () => {
    const onShowPrescription = async (id?:string) => {
        if(id) {
            const res = await getPrescriptionPic(id)
            showImagePreview([res.data.data.url])
        }
    }
    return {onShowPrescription}
}