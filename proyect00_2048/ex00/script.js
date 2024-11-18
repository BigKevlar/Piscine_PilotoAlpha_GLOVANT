var board;          // tabla
var score = 0;      // puntuacion
var rows = 4;       // filas
var columns = 4;    // columnas

// Cuando abramos la ventana se llama a la funcion principal que inicia al juego.
window.onload = function() {
    init_game();
}

function init_game() {
    //board = [
    //    [0, 0, 0, 0],
    //    [0, 0, 0, 0],
    //    [0, 0, 0, 0],
    //    [0, 0, 0, 0]
    //]

    board = [
        [2, 2, 2, 2],
        [2, 2, 2, 2],
        [4, 4, 4, 4],
        [8, 8, 8, 8]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //
            let box = document.createElement("div");
            box.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateBox(box, num);                          // le facilitamos ...
            document.getElementById("board").append(box);
        }
    }
}

function updateBox(box, num) {
    box.innerText = "";
    box.classList.value = ""; // borrara las clases para luego añadir una.
    box.classList.add("box");
    if (num > 0) {
        box.innerText = num.toString();
        if (num <= 4096) {
            box.classList.add("x" + num.toString());
        }
        else {
            box.classList.add("x8192");
        }
    }
}

function setNum() {
    if (!isEmpty()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function isEmpty() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}

document.addEventListener('up', (e) => {
    if (e.code == "Left") {
        slideLeft();
    }
})

function goLeft() {
    for (let l + 0; )
}