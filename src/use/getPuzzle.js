// 取得各片拼圖
export default function getPuzzle (CANVAS_WIDTH,CANVAS_HEIGHT ,canvas,uploadImgData,col, row, index) {
    let xCor
    let yCor
    
    //處理邏輯
    getCoordinate(index,col)
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT 
    let ctx = canvas.getContext("2d")
    ctx.drawImage(uploadImgData.pic,xCor,yCor,CANVAS_WIDTH * col ,CANVAS_HEIGHT * row);

    // 取得每片拼圖的坐標
    function getCoordinate (index,col) {
        let coordinateYIndex = Math.ceil(index / col) - 1
        let coordinateXIndex 
        index % col === 0? coordinateXIndex = col -1 : coordinateXIndex = (index % col) - 1
        xCor = 0 - (CANVAS_WIDTH * coordinateXIndex)
        yCor = 0 - (CANVAS_HEIGHT * coordinateYIndex)
    }
}

