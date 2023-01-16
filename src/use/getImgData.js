import { reactive, ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import ame1 from "./defaultImage/ame-1.jpg"
import ame2 from "./defaultImage/ame-2.jpg"
import gura1 from "./defaultImage/gura-1.jpg"
import ina1 from "./defaultImage/ina-1.jpg"
import ina2 from "./defaultImage/ina-2.png"
import ina3 from "./defaultImage/ina-3.jpg"


const defaultImage = ref([
    ame1,
    ame2,
    gura1,
    ina1,
    ina2,
    ina3,
])

const uploadImgData = reactive({
    file : null,
    src : null,
    width: null,
    height: null,
    pic : new Image()
})

const openChoseImage = ref(true)
const openOriginalImage = ref(false)
const isGameStart = ref(false)

export default function getImgData (img) {
    // 當用戶有自行上傳圖片時觸發
    const upload = (e) => {
        uploadImgData.file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(uploadImgData.file)
        reader.onload = () => {
            uploadImgData.src = reader.result
            uploadImgData.pic.src = reader.result
            openChoseImage.value = false
            openOriginalImage.value = true
            isGameStart.value = false
        }
    }

    const choseSampleImg = (e) => {
        console.log(e.target.src)
        console.log(e.target.src.height)
        uploadImgData.src = e.target.src
        uploadImgData.pic.src = e.target.src
        openChoseImage.value = false
        openOriginalImage.value = true
        isGameStart.value = false
    }



    watch(img , () => {
        uploadImgData.width = img.value.offsetWidth
        uploadImgData.height = img.value.offsetHeight
    })

    
    return {
        upload,
        uploadImgData,
        defaultImage,
        choseSampleImg,
        openChoseImage,
        openOriginalImage,
        isGameStart,
    }
}