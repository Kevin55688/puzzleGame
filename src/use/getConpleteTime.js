import { ref } from '@vue/reactivity'

const startTime = ref(null)
const endTime = ref(null)
const completeTime = ref(null)


export default function getCompleteTime () {
  if (!startTime) {
    startTime.value = Date.now() + 0
    return 
  }
  endTime.value = Date.now()
  const totalSeconds = Math.floor((endTime.value - startTime.value / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor(totalSeconds % 3600 / 60)
  const seconds = Math.floor(totalSeconds % 60)
  completeTime.value = hours + "時" + minutes + "分" + seconds + "秒"
  return {completeTime}
}