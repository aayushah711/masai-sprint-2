var check = false;

// Places all the pieces to initial position
function resetGame(){
    for (var i=1;i<=8;i++){
        // Places the pawns to initial position
        placeNewPiece("Pawn","w","2",i)
        placeNewPiece("Pawn","b","7",i)
    }
    var pieces = ["Rook","Knight","Bishop"]
    for (var i=0;i<pieces.length;i++){
        // Places the animals to initial position
        placeNewPiece(pieces[i],"w","1",i+1)
        placeNewPiece(pieces[i],"w","1",8-i)
        placeNewPiece(pieces[i],"b","8",i+1)
        placeNewPiece(pieces[i],"b","8",8-i)
    }
    placeNewPiece("King","w","1",4)
    placeNewPiece("Queen","w","1",5)
    placeNewPiece("King","b","8",4)
    placeNewPiece("Queen","b","8",5)

    function placeNewPiece(piece, color, row, col){
        var div = document.getElementById("r"+row).children[col-1]
        var img = "resources/"+piece+"_"+color+".png"
        div.style.backgroundImage = "url("+img+")"
        div.addEventListener("click", possibleMove)

    }
}

// Place a single piece to the mentioned row & col
function placePiece(piece, color, row, col,old_row,old_col){
    var div = document.getElementById("r"+old_row).children[old_col-1]
    var old_piece = getPiece(div.style.backgroundImage)[0]
    var old_color = getPiece(div.style.backgroundImage)[1]

    if (div.style.backgroundImage != "" && (old_piece === piece) && (old_color === color) && ( (color === "b" && turn === false) || (color === "w" && turn === true) )){
        div.style.backgroundImage = ""
        div.removeEventListener("click", possibleMove)
        var div = document.getElementById("r"+row).children[col-1]
        var img = "resources/"+piece+"_"+color+".png"
        div.style.backgroundImage = "url("+img+")"
        div.addEventListener("click", possibleMove)
        turn = !turn
        if (turn === true){
            var move = document.getElementById("white")
            move.textContent = "White has to play"
            var move = document.getElementById("black")
            move.textContent = ""
        }
        else{
            var move = document.getElementById("white")
            move.textContent = ""
            var move = document.getElementById("black")
            move.textContent = "Black has to play"
        }
        console.log(turn)
        }
}

// Highlights all the cells where a piece can be moved to
function possibleMove(e){
    var row = Number(e.target.parentElement.id.split("")[1])
    var col = Number(e.target.className.split("")[1])
    var piece = getPiece(e.target.style.backgroundImage)[0]
    var color = getPiece(e.target.style.backgroundImage)[1]

    if (piece === "Pawn"){
        if (color === "b" && turn === false){
            if (row === 7){
                highlight(row, col, piece, color, row-2, col)
            }
            highlight(row, col, piece, color, row-1, col)
        }
        else if (color === "w" && turn === true) {
            if (row === 2){
                highlight(row, col, piece, color, row+2, col)
            }
            highlight(row, col, piece, color, row+1, col)
        }
    }
    else if (piece === "Knight"){
        if ((color === "b" && turn === false) || (color === "w" && turn === true)){
            highlight(row, col, piece, color, row+2, col+1)
            highlight(row, col, piece, color, row+2, col-1)
            highlight(row, col, piece, color, row-2, col+1)
            highlight(row, col, piece, color, row-2, col-1)
            highlight(row, col, piece, color, row+1, col+2)
            highlight(row, col, piece, color, row+1, col-2)
            highlight(row, col, piece, color, row-1, col+2)
            highlight(row, col, piece, color, row-1, col-2)
        }
    }
    else if (piece === "Rook"){
        if ((color === "b" && turn === false) || (color === "w" && turn === true)){
            for (var i=1;i<=8;i++){
                if (checkEmpty(row+i, col)===true){
                    highlight(row, col, piece, color, row+i, col)
                }
                else {
                    break
                }
            }
            for (var i=1;i<=8;i++){
                if (checkEmpty(row-i, col)===true){
                    highlight(row, col, piece, color, row-i, col)
                }
                else {
                    break
                }
            }
            for (var i=1;i<=8;i++){
                if (checkEmpty(row, col+i)===true){
                    highlight(row, col, piece, color, row, col+i)
                }
                else {
                    break
                }
            }
            for (var i=1;i<=8;i++){
                if (checkEmpty(row, col-i)===true){
                    highlight(row, col, piece, color, row, col-i)
                }
                else {
                    break
                }
            }
        }
    }
    else if (piece === "Bishop"){
        if ((color === "b" && turn === false) || (color === "w" && turn === true)){
            for (var i=1;i<=8;i++){
                if (checkEmpty(row+i, col+i)===true){
                    highlight(row, col, piece, color, row+i, col+i)
                }
                else {
                    break
                }
            }
            for (var i=1;i<=8;i++){
                if (checkEmpty(row+i, col-i)===true){
                    highlight(row, col, piece, color, row+i, col-i)
                }
                else {
                    break
                }
            }
            for (var i=1;i<=8;i++){
                if (checkEmpty(row-i, col-i)===true){
                    highlight(row, col, piece, color, row-i, col-i)
                }
                else {
                    break
                }
            }
            for (var i=1;i<=8;i++){
                if (checkEmpty(row-i, col+i)===true){
                    highlight(row, col, piece, color, row-i, col+i)
                }
                else {
                    break
                }
            }
        }
    }
    else if (piece === "Queen"){
        if ((color === "b" && turn === false) || (color === "w" && turn === true)){
            for (var i=1;i<=8;i++){
                if (checkEmpty(row+i, col)===true){
                    highlight(row, col, piece, color, row+i, col)
                }
                else {
                    break
                }
            }
            for (var i=1;i<=8;i++){
                if (checkEmpty(row-i, col)===true){
                    highlight(row, col, piece, color, row-i, col)
                }
                else {
                    break
                }
            }
            for (var i=1;i<=8;i++){
                if (checkEmpty(row, col+i)===true){
                    highlight(row, col, piece, color, row, col+i)
                }
                else {
                    break
                }
            }
            for (var i=1;i<=8;i++){
                if (checkEmpty(row, col-i)===true){
                    highlight(row, col, piece, color, row, col-i)
                }
                else {
                    break
                }
            }
            for (var i=1;i<=8;i++){
                if (checkEmpty(row+i, col+i)===true){
                    highlight(row, col, piece, color, row+i, col+i)
                }
                else {
                    break
                }
            }
            for (var i=1;i<=8;i++){
                if (checkEmpty(row+i, col-i)===true){
                    highlight(row, col, piece, color, row+i, col-i)
                }
                else {
                    break
                }
            }
            for (var i=1;i<=8;i++){
                if (checkEmpty(row-i, col-i)===true){
                    highlight(row, col, piece, color, row-i, col-i)
                }
                else {
                    break
                }
            }
            for (var i=1;i<=8;i++){
                if (checkEmpty(row-i, col+i)===true){
                    highlight(row, col, piece, color, row-i, col+i)
                }
                else {
                    break
                }
            }
        }
    }
    else if (piece === "King"){
        if ((color === "b" && turn === false) || (color === "w" && turn === true)){
            highlight(row, col, piece, color, row+1, col)
            highlight(row, col, piece, color, row-1, col)
            highlight(row, col, piece, color, row, col+1)
            highlight(row, col, piece, color, row, col-1)
            highlight(row, col, piece, color, row+1, col+1)
            highlight(row, col, piece, color, row-1, col-1)
            highlight(row, col, piece, color, row+1, col-1)
            highlight(row, col, piece, color, row-1, col+1)
        }
    }
}

function highlight(row, col, piece, color, new_row,new_col){
    if (1<=new_row && new_row<=8 && 1<=new_col && new_col<=8 ){
        var div = document.getElementById("r"+new_row).children[new_col-1]
        if (checkEmpty(new_row, new_col) === true){
            div.textContent = "o"
            // Used my first callback function
            console.log("removed",div)
            for (var i=0;i<10;i++){
                div.removeEventListener("click",playPiece)
                div.removeEventListener("click", possibleMove)
            }
            div.removeEventListener("click",playPiece)
            div.addEventListener("click", playPiece)
        }
    }
    
    function playPiece(e){
        var div = e.target
        placePiece(piece,color,new_row,new_col,row,col)
        removeX()
        div.removeEventListener("click",playPiece)
    }
}

function checkPath(){

}

function removeX(){
    var rows = document.getElementsByClassName("row")
    for (var i=0;i<rows.length;i++){
        var row = rows[i].children
        for (var j=0;j<row.length;j++){
            row[j].textContent = row[j].textContent.replace("o","")
        }
    }
}

function getPiece(piece){
    piece = piece.split("/")[1]
    piece = piece.split(".")[0]
    piece = piece.split("_")
    return piece
}
function checkEmpty(row,col){
    if (1<=row && row<=8 && 1<=col && col<=8 ){
        var div = document.getElementById("r"+row).children[col-1]
        console.log(div)
        if (div.style.backgroundImage === ""){
            return true
        }
        else {
            return false
        }
    }
}
var turn = true
resetGame()
