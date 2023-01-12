export default function isGameComplete (count,pieceList) {
//清空count
count.value = 0
//確認有多少拼圖在正確位置
for(let i = 0 ; i < pieceList.value.length ; i ++) {
    if (pieceList.value[i].pieceID == i + 1) {
        count.value++
    }
}
//全部拼圖在正確位置，遊戲結束
if(count.value === pieceList.value.length) {
        setTimeout(() => {
            alert('complete')
        }, 500);
    }

}