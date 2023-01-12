<template>
    <div class="container">
        <input type="file" @change="upload">
        <div class="pic">
            <img  ref="img"  v-if="uploadImgData.src" :src="uploadImgData.src" alt="">
        </div>
        <div class="config">
            請選擇拼圖片數
            <label for="setupCol">
                <input type="number" id="setupCol" min="1" v-model.lazy="setupPiece.colPiece" placeholder="1">
            </label>
            <label for="setupRow">
                <input type="number" id="setupRow" min="1" v-model.lazy="setupPiece.rowPiece" placeholder="1">
            </label>
            <div class="pieceCount">
                {{ setupPiece.colPiece }} X {{ setupPiece.rowPiece }}
                片數
                {{ totalPiece  }}
            </div>
        </div>
        <button @click="creatPuzzle">start game</button>
        <div class="puzzle" ref="puzzle" >
            <canvas v-show="isGameStart" class="piece" :class="{ 'firstChosen' : isChosen[index] }"  v-for="(canvas,index) in canvasList" :key="canvas.Id" :ref="(el)=>{ canvasRef[index] = el }" @click="pickup" :data-index="index" width="null" height="null"></canvas>
        </div>
    </div>
</template>

<script>
import {reactive, ref} from '@vue/reactivity'
import getImgData from "@/use/getImgData"
import getPuzzle from "@/use/getPuzzle"
import getList from "@/use/getList"
import { watch } from '@vue/runtime-core'
import isGameComplete from '@/use/isGameComplete'
import setPieceSize from '@/use/setPieceSize'

export default {
    name : 'UploadImg',
    setup () {
        const img = ref(null)
        const puzzle = ref(null)
        const canvasRef = ref([])
        const pieces = reactive([])
        const setupPiece = reactive ({
            colPiece : 1,
            rowPiece : 1,
        })
        let changeTwoPiece = reactive([])
        const isChosen = reactive([])
        const isGameStart = ref(false)
        let count = ref(0)       
        //取得總拼圖片數，拼圖列表，畫布列表
        const {totalPiece,pieceList , canvasList} = getList(setupPiece)
        //上傳圖片
        const {upload,uploadImgData} = getImgData (img)
        const classVariable = reactive({
            puzzle : {  maxWidth : "80%",
                        padding : "3%",
                        border : "5px"    },
            piece  : { border : "1px"},

        })

        //初始化畫面寬度(先繪制一張canvas以取得正確的畫面長寬)
        const initialize = () => {
            isGameStart.value = true
            let {CANVAS_WIDTH , CANVAS_HEIGHT} = setPieceSize(uploadImgData, puzzle , setupPiece.colPiece,setupPiece.rowPiece,classVariable.puzzle.padding,classVariable.puzzle.border,classVariable.piece.border)
            getPuzzle(CANVAS_WIDTH, CANVAS_HEIGHT, canvasRef.value[0], uploadImgData,setupPiece.colPiece, setupPiece.rowPiece, pieceList.value[0].pieceID )
        }
        //創造拼圖
        const creatPuzzle = () => {
            initialize() 
            let {CANVAS_WIDTH , CANVAS_HEIGHT} = setPieceSize(uploadImgData, puzzle , setupPiece.colPiece,setupPiece.rowPiece,classVariable.puzzle.padding,classVariable.puzzle.border,classVariable.piece.border)
            //遊戲開始
            isGameStart.value = true
            //為每片canvas畫上對應的拼圖樣示
            for (let i = 0 ; i < totalPiece.value; i ++) {
            getPuzzle(CANVAS_WIDTH, CANVAS_HEIGHT, canvasRef.value[i], uploadImgData,setupPiece.colPiece, setupPiece.rowPiece, pieceList.value[i].pieceID )
            }   
            // isGameComplete(count,pieceList)

        }
        

        const pickup = (e) => {
            changeTwoPiece.push(e.target)
            isChosen[e.target.dataset.index] = true
        }

        watch (changeTwoPiece, () => {
            //當changeTwoPiece從2個被清空或選中相同canvas2次時被觸發
            if(changeTwoPiece[0] === changeTwoPiece[1] ) {
                isChosen.fill(false)
                changeTwoPiece.length = 0
            }
            if(changeTwoPiece.length === 2) {
                // 取得拼圖寬高
                let {CANVAS_WIDTH , CANVAS_HEIGHT} = setPieceSize(uploadImgData, puzzle , setupPiece.colPiece,setupPiece.rowPiece,classVariable.puzzle.padding,classVariable.puzzle.border,classVariable.piece.border)
                // 先取得特定canvas的index
                // 在pieceLIST裡這個index是對應哪一個pieceID
                // 更新canvas
                let ID1 = changeTwoPiece[0].dataset.index
                let ID2 = changeTwoPiece[1].dataset.index
                // 第一個canvas繪製成第二個canvas的圖形, 第二個canvas繪制成第一個canvas的圖型
                getPuzzle(CANVAS_WIDTH,CANVAS_HEIGHT,changeTwoPiece[0],uploadImgData,setupPiece.colPiece,setupPiece.rowPiece,pieceList.value[ID2].pieceID)
                getPuzzle(CANVAS_WIDTH,CANVAS_HEIGHT,changeTwoPiece[1],uploadImgData,setupPiece.colPiece,setupPiece.rowPiece,pieceList.value[ID1].pieceID)
                // 更新pieceLIST的順序
                const temp = pieceList.value[ID1]
                pieceList.value[ID1] = pieceList.value[ID2]
                pieceList.value[ID2] = temp
                // 確認拼圖是否完成
                isGameComplete(count,pieceList)
                // 清空changeTwoPiece
                changeTwoPiece.length = 0
            }
        })

        watch(setupPiece, () =>{
            isGameStart.value = false
        })

        watch(isGameStart , () =>{
            if(isGameStart.value) {
                setTimeout(() => {
                    let {CANVAS_WIDTH , CANVAS_HEIGHT} = setPieceSize(uploadImgData, puzzle , setupPiece.colPiece,setupPiece.rowPiece,classVariable.puzzle.padding,classVariable.puzzle.border,classVariable.piece.border)
            //遊戲開始
            isGameStart.value = true
            //初始化
            //為每片canvas畫上對應的拼圖樣示
            for (let i = 0 ; i < totalPiece.value; i ++) {

            getPuzzle(CANVAS_WIDTH, CANVAS_HEIGHT, canvasRef.value[i], uploadImgData,setupPiece.colPiece, setupPiece.rowPiece, pieceList.value[i].pieceID )
            }
                }, 1);
            }
        })
        return {
            uploadImgData,
            upload,
            img,
            puzzle,
            creatPuzzle,
            setupPiece,
            totalPiece,
            pieceList,
            canvasList,
            canvasRef,
            pieces,
            changeTwoPiece,
            pickup,
            isChosen,
            isGameStart,
            count,
            initialize,
            classVariable,
            
        }  
    },
    
}
</script>

<style lang="scss" scoped>
    .container{ 
        width: 100%;
        // background-color: blue;
        >.pic{
            >img{
                object-fit: contain;
                max-width: 100%;
                height: 100%;
            }
        }
        >.puzzle {
            // background-color: red;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            max-width: v-bind('classVariable.puzzle.maxWidth');
            padding: v-bind('classVariable.puzzle.padding');
            // margin: v-bind('classVariable.puzzle.margin');
            margin: auto;
            border-width: v-bind('classVariable.puzzle.border');
            border-color: black;
            border-style: solid;

            >.piece{
                // border: 1px solid black;
                border-width: v-bind('classVariable.piece.border');
            border-color: black;
            border-style: solid;
                transition:  .3s;
                box-sizing: border-box;
                &.firstChosen{
                    box-sizing: border-box;
                // border: 1px solid rgba(235,37,37,0.5);
                box-shadow: 7px -2px 29px 1px rgba(235,37,37,0.93);
                transform: translateY(-10px);
                }
            }
        }
    }
</style>