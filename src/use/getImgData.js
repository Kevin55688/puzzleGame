import { reactive } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

const uploadImgData = reactive({
    file : null,
    src : null,
    width: null,
    height: null,
    pic : new Image()
})

export default function getImgData (img) {
    const upload = (e) => {
        uploadImgData.file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(uploadImgData.file)
        reader.onload = () => {
            uploadImgData.src = reader.result
            uploadImgData.pic.src = reader.result
        }
    }

    watch(img , () => {
        uploadImgData.width = img.value.offsetWidth
        uploadImgData.height = img.value.offsetHeight
    })

    
    return {
        upload,
        uploadImgData,
    }
}