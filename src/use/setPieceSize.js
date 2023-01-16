export default function setPieceSize (uploadImgData,puzzle,col,row,padding,puzzleBorder,pieceBoder,container) {
    // 取得原始圖片及puzzle寬度大小
    // 計算原始圖片及puzzle長寬比值 puzzle/原始圖片
    // 計算每片拼圖需要的長寬大小，並乘上比值
    let imgWidth = uploadImgData.pic.width
    let imgHeight = uploadImgData.pic.height 
    // 各種變數宣告
    const PADDING = parseFloat(padding)
    const PUZZLE_BORDER =parseFloat(puzzleBorder)  
    const PIECE_BORDER =parseFloat(pieceBoder)  





    const originRatio = ((puzzle.value.offsetWidth - (container.value.offsetWidth * (PADDING * 0.01) * 2) - (PUZZLE_BORDER * 2) -2) / imgWidth)
    let CANVAS_WIDTH = (imgWidth * originRatio/ col )  - (PIECE_BORDER * 2)
    let CANVAS_HEIGHT = (imgHeight * originRatio / row)

    console.log("puzzle.value.offsetWidth",puzzle.value.offsetWidth)
    console.log("CANVAS_WIDTH" ,CANVAS_WIDTH)
    console.log("container.value.offsetWidth * (PADDING * 0.01) * 2",container.value.offsetWidth * (PADDING * 0.01) * 2)
    console.log("container.value.offsetWidth",container.value.offsetWidth)
    return {CANVAS_WIDTH , CANVAS_HEIGHT }
} 