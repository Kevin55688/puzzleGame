import {ref } from '@vue/reactivity'
let endTime = null
let completeTime = null
let isComplete = ref(false)




export default function isGameComplete (count,pieceList,startTime,historyList) {
//清空count
count.value = 0
// 初始化isComplete
isComplete.value = false
//確認有多少拼圖在正確位置
for(let i = 0 ; i < pieceList.value.length ; i ++) {
    if (pieceList.value[i].pieceID == i + 1) {
        count.value++
    }
}
//全部拼圖在正確位置，遊戲結束
if(count.value === pieceList.value.length) {
    endTime = Date.now()
    const totalSeconds = Math.floor((endTime - startTime) / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor(totalSeconds % 3600 / 60)
    const seconds = Math.floor(totalSeconds % 60)
    completeTime = hours + "時" + minutes + "分" + seconds + "秒"
    historyList.value.push(completeTime)
    isComplete.value = true
    }

    return {isComplete}


}