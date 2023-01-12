import { computed,} from '@vue/runtime-core'
// import {reactive} from '@vue/reactivity'
// import { reactive } from '@vue/reactivity'

export default function getList (setupPiece) {
  const setupPieceInner = setupPiece
  let test = {}
  const totalPiece = computed(() => {
    return setupPieceInner.colPiece * setupPieceInner.rowPiece
})

  const pieceList = computed(() => {
    let arr = []
    for (let i = 0 ; i < totalPiece.value ; i ++) {
      arr.push({"pieceID" : i + 1 , "isChosen" : false})
  }
    arr.sort(() => Math.random() - .5)
    return arr
  })

  const canvasList = computed (() => {
    let arr = []
    for (let i = 0 ; i < totalPiece.value ; i ++) {
      arr.push({"canvasId" : i + 1})
  }
    return arr
  })

  test = pieceList

  return {totalPiece,pieceList, canvasList,test }
}