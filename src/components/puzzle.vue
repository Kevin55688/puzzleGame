<template>
    <div class="container" ref="container">
        <nav class="nav">
            <ul>
                <li @click="openChoseImage = true">
                    <a href="#">
                        <div class="icon">
                            <ion-icon name="image-outline"></ion-icon>
                        </div>
                        <span>選擇圖片</span>  
                    </a>
                </li>
                <li @click="classVariable.config.isActive = !classVariable.config.isActive">
                    <a href="#">
                        <div class="icon">
                            <ion-icon name="settings-outline"></ion-icon>
                        </div>
                        <span>設定</span>  
                    </a>
                </li>
                <li @click="openOriginalImage = true">
                    <a href="#">
                        <div class="icon">
                            <ion-icon name="alert-outline"></ion-icon>
                        </div>
                        <span>提示</span>  
                    </a>
                </li>
                <div class="indicator"></div>
            </ul>
        </nav>
        <div @click.self="openChoseImage = false" :class="['choseImage', {'openChoseImage' : openChoseImage }]">
            <div class="choseImage-container">
                <strong>請選擇圖片或上傳圖片</strong>
                <div class="sampleList">
                    <div class="sample" v-for="(sample) in defaultImage" :key="sample" @click="choseSampleImg">
                        <img :src="sample" alt="" class="sample">
                    </div>
                </div>
                <input type="file" @change="upload">
            </div>
        </div>

        <div @click.self="openOriginalImage = false" :class="['OriginalImage' , {'openOriginalImage' : openOriginalImage}]">
            <div class="pic">
                <img  ref="img"  v-if="uploadImgData.src" :src="uploadImgData.src" alt="">
            </div>        
        </div>





        <div :class="['config',{'isActive' :classVariable.config.isActive }]">
            請選擇拼圖片數
            <div class="setting">
                <label for="setupCol">
                    橫向:<input type="number" id="setupCol" min="1" v-model.lazy="setupPiece.colPiece" placeholder="1">
                </label>
                <label for="setupRow">
                    縱向:<input type="number" id="setupRow" min="1" v-model.lazy="setupPiece.rowPiece" placeholder="1">
                </label>
            </div>
            <div class="pieceCount">
                {{ setupPiece.colPiece }} X {{ setupPiece.rowPiece }}
                片數
                {{ totalPiece  }}
            </div>
            <button @click="creatPuzzle">start game</button>
        </div>
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
import { onMounted, onUnmounted, watch } from '@vue/runtime-core'
import isGameComplete from '@/use/isGameComplete'
import setPieceSize from '@/use/setPieceSize'

export default {
    name : 'puzzleComponent',
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
        let count = ref(0)   
        const container = ref(null)    
        //取得總拼圖片數，拼圖列表，畫布列表
        const {totalPiece,pieceList , canvasList} = getList(setupPiece)
        //上傳圖片
        const {upload,uploadImgData ,defaultImage ,choseSampleImg,openChoseImage,openOriginalImage,isGameStart} = getImgData (img)
        const classVariable = reactive({
            puzzle : {  maxWidth : "51%",
                        padding : "3%",
                        border : "17px",
                        borderStyle : "none",
                        bgc   :   "none",
                        boxShadow : 'none'     },
            piece  : { border : "2px"},
            config : {isActive : true}
        })

        //初始化畫面寬度(先繪制一張canvas以取得正確的畫面長寬)
        const initialize = () => {
            isGameStart.value = true
            let {CANVAS_WIDTH , CANVAS_HEIGHT} = setPieceSize(uploadImgData, puzzle , setupPiece.colPiece,setupPiece.rowPiece,classVariable.puzzle.padding,classVariable.puzzle.border,classVariable.piece.border,container)
            getPuzzle(CANVAS_WIDTH, CANVAS_HEIGHT, canvasRef.value[0], uploadImgData,setupPiece.colPiece, setupPiece.rowPiece, pieceList.value[0].pieceID )
        }
        //創造拼圖
        const creatPuzzle = () => {
            classVariable.config.isActive = false
            initialize() 
            let {CANVAS_WIDTH , CANVAS_HEIGHT} = setPieceSize(uploadImgData, puzzle , setupPiece.colPiece,setupPiece.rowPiece,classVariable.puzzle.padding,classVariable.puzzle.border,classVariable.piece.border,container)
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

        // resize時觸發
        const resizeHandler = () => {
            isGameStart.value = false
            creatPuzzle()
        }

        watch (changeTwoPiece, () => {
            //當changeTwoPiece從2個被清空或選中相同canvas2次時被觸發
            if(changeTwoPiece[0] === changeTwoPiece[1] ) {
                isChosen.fill(false)
                changeTwoPiece.length = 0
            }
            if(changeTwoPiece.length === 2) {
                // 取得拼圖寬高
                let {CANVAS_WIDTH , CANVAS_HEIGHT} = setPieceSize(uploadImgData, puzzle , setupPiece.colPiece,setupPiece.rowPiece,classVariable.puzzle.padding,classVariable.puzzle.border,classVariable.piece.border,container)
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
                    let {CANVAS_WIDTH , CANVAS_HEIGHT} = setPieceSize(uploadImgData, puzzle , setupPiece.colPiece,setupPiece.rowPiece,classVariable.puzzle.padding,classVariable.puzzle.border,classVariable.piece.border,container)
            //遊戲開始
            isGameStart.value = true
            //初始化
            //為每片canvas畫上對應的拼圖樣示
            for (let i = 0 ; i < totalPiece.value; i ++) {

            getPuzzle(CANVAS_WIDTH, CANVAS_HEIGHT, canvasRef.value[i], uploadImgData,setupPiece.colPiece, setupPiece.rowPiece, pieceList.value[i].pieceID )
            }
                }, 1);

                classVariable.puzzle .borderStyle = "solid"
                classVariable.puzzle .bgc = "rgb(229, 231, 233)"
                classVariable.puzzle.boxShadow = "inset 39px -40px 20px -23px rgb(66, 66, 66),inset -12px 15px 20px -2px rgb(66, 66, 66)"

            }

            else {
                classVariable.puzzle .borderStyle = "none"
                classVariable.puzzle .bgc = "none"
                classVariable.puzzle .boxShadow = "none"
            }
        })

        onMounted (() => {
            window.addEventListener('resize' , resizeHandler)
        })

        onUnmounted(() => {
            window.removeEventListener('resize', resizeHandler);
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
            resizeHandler,
            openChoseImage,
            defaultImage,
            choseSampleImg,
            openOriginalImage,
            container,

            
        }  
    },
    
}
</script>

<style lang="scss" scoped>
    .container{ 
        //變數區
        $clr : rgb(189, 167, 117);
        // 變數區結束
        width: 100%;
        text-align: center;
        >.nav{
            position: relative;
            width: 300px;
            height: 70px;
            background-color: rgba(255, 255, 255);
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 50px auto 0;
            border-radius: 10px;
            z-index: 2;
            >ul{
                display: flex;
                width: 280px;
                justify-content: center;
                position: relative;
                >li{
                    position: relative;
                    list-style: none;
                    width: 70px;
                    height: 70px;
                    z-index: 3; 
                    &:hover .icon{
                        transform: translateY(-35px);
                    }
                    &:hover a span{
                        opacity: 1;
                        transform: translateY(10px);
                    }
                    &:hover ~ .indicator {
                        top: -41px;
                        opacity: 1;
                    }
                    &:hover:nth-child(1) ~ .indicator {
                        transform: translateX(70px * 0);
                    }
                    &:hover:nth-child(2) ~ .indicator {
                        transform: translateX(70px * 1);
                    }
                    &:hover:nth-child(3) ~ .indicator {
                        transform: translateX(70px * 2);
                    }
                    >a{
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        width: 100%;
                        text-align: center;
                        font-weight: 500;
                        >.icon{
                            position: relative;
                            display: block;
                            line-height: 75px;
                            font-size: 1.5rem;
                            text-align: center;
                            transition: .5s;
                            color: $clr;
                        }
                        >span{
                            position: absolute;
                            color: $clr;
                            font-weight: 400;
                            letter-spacing:.05em;
                            transition: .5s;
                            opacity: 0;
                            transform: translateY(20px);
                        }
                    }
                }
                >.indicator{
                    position: absolute;
                    width: 70px;
                    height: 70px;
                    background-color: rgba(117, 139, 189 );
                    border-radius: 50%;
                    border: 6px solid $clr;
                    left: 29px;
                    top: -38px;
                    transition: .5s;
                    opacity: 0;
                    &::before{
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: -22px;
                        width: 20px;
                        height: 20px;
                        background-color: transparent;
                        border-top-right-radius: 20px;
                        box-shadow:0px -10px 0 0 $clr ;
                    }
                    &::after{
                        content: '';
                        position: absolute;
                        top: 50%;
                        right: -22px;
                        width: 20px;
                        height: 20px;
                        background-color: transparent;
                        border-top-left-radius: 20px;
                        box-shadow:0px -10px 0 0 $clr ;
                    }
                }
            }
        }
        >.sample{
            cursor: pointer;
        }
        >.choseImage{    
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 9999;
            display: flex;
            visibility: hidden;
            align-items: center;
            justify-content: center;
            background-color: rgba(0,0,0,0.4);
            opacity: 0;
            transition: 500ms;
            &.openChoseImage{
                visibility: visible;
                opacity: 1;
            }
            >.choseImage-container {
                position: absolute;
                max-width: 80%;
                min-height: 30%;
                border: solid 5px blue;
                border-radius: 10px;
                background-color: white;
                box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
                overflow-y: auto;
                padding: 30px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                >.sampleList{
                    width: 80%;
                    display: flex;
                    margin: 20px auto;
                    border: 3px solid black;
                    border-radius: 10px;
                    padding: 5px;
                    overflow-x: auto;

                    >.sample{
                        width: 200px;
                        height: 200px;
                        flex-shrink: 0;
                        >img{
                            object-fit: contain;
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }


        >.OriginalImage{
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 9999;
            display: flex;
            visibility: hidden;
            align-items: center;
            justify-content: center;
            background-color: rgba(0,0,0,0.4);
            opacity: 0;
            transition: 1s;
            &.openOriginalImage{
                visibility: visible;
                opacity: 1;
            }
            >.pic{
                transition: 1s;
                position: absolute;
                max-width: 80%;
                max-height: 80%;
                border: solid 5px blue;
                border-radius: 10px;
                background-color: white;
                box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
                overflow-y: auto;
                >img{
                    object-fit: contain;
                    max-width: 80%;
                    max-height: 80%;
                }
            }
        }
        >.puzzle {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            max-width: v-bind('classVariable.puzzle.maxWidth');
            padding: v-bind('classVariable.puzzle.padding');
            margin: auto;
            border-width: v-bind('classVariable.puzzle.border');
            border-color: rgb(158, 158, 158 ) ;
            border-style: v-bind('classVariable.puzzle .borderStyle');
            border-radius: 10px;
            background-color: v-bind('classVariable.puzzle.bgc');
            box-shadow: v-bind('classVariable.puzzle.boxShadow');
            transform: translateY(-100px);

            >.piece{
                border-width: v-bind('classVariable.piece.border');
                border-color: black;
                border-style: solid;
                transition:  .3s;
                box-sizing: border-box;
                &.firstChosen{
                    box-sizing: border-box;
                box-shadow: 7px -2px 29px 1px rgba(235,37,37,0.93);
                transform: translateY(-10px);
                }
            }
        }
        >.config{
            position: relative;
            background-color: rgb(117, 139, 189);
            width: 300px;
            height: 100px;
            border-radius: 10px;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: $clr;
            margin: 0 auto;
            z-index: 1;
            opacity: 0;
            transform: translateY(-70px);
            transition: .5s;
            padding: 10px 0;
            &.isActive{
                opacity: 1;
                transform: translateY(10px);
            }
            &::before{
                content : '';
                position: absolute;
                top: -15px;
                border-width: 6px 6px 10px 6px;
                border-color: transparent transparent rgb(117, 139, 189) transparent;
                border-style: solid;
            }
            >.setting{
                display: flex;
                justify-content: center;
                align-items: center;
                >label{
                    width: 100%;
                    >input{
                        width: 100px;
                        margin: 5px;
                        font-size: 16px;
                        border-width: 2px;
                        border-color: #141312;
                        background-color: #ffffff;
                        color: #bda775;
                        border-style: solid;
                        border-radius: 5px;
                        box-shadow: 2px 1px 8px rgba(66,66,66,.62);
                        &:focus{
                            outline: none;
                        }
                    }
                }
            }
            >button{
                    box-shadow:inset 0px 1px 0px 0px #a6827e;
                    background:linear-gradient(to bottom, #7d5d3b 5%, #634b30 100%);
                    background-color:#7d5d3b;
                    border-radius:10px;
                    border:1px solid #54381e;
                    display:inline-block;
                    cursor:pointer;
                    color:#ffffff;
                    font-family:Arial;
                    font-size:13px;
                    padding:3px 12px;
                    text-decoration:none;
                    text-shadow:0px 1px 0px #4d3534;
                    &:hover{
                        background:linear-gradient(to bottom, #634b30 5%, #7d5d3b 100%);
                        background-color:#634b30;
                    }
                    &:active{
                        position:relative;
                        top:1px;
                    }
                }
        }
    }
</style>