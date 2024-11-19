var board;          // tabla
var score = 0;      // puntuacion
var rows = 4;       // filas
var columns = 4;    // columnas

// Cuando abramos la ventana se llama a la funcion principal que inicia al juego.
window.onload = function() {
    init_game();
}

function init_game() {
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    //board = [
    //    [2,2,2,2],
    //    [2,2,2,2],
    //    [4,4,8,8],
    //    [4,4,8,8]
    //]

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

    setNum();
    setNum();
    updatePositions(); // Ajustar posiciones al iniciar
}

function restartGame() {
    document.getElementById("board").innerHTML = "";        // Borra los elementos de board.
    score = 0;                                              // Reinicia score.
    document.getElementById("score").innerText = score;
    init_game();                                            // Llamamos de nuevo a initGame.
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

document.addEventListener('keyup', (e) => {     // e = event
    if (e.code == "ArrowLeft") {
        slideLeft();
        setNum();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setNum();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setNum();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setNum();
    }
    document.getElementById("score").innerText = score;
    if (checkWinner()) {
        alert("You wins!");
    }
    if (checkGameOver()) {
        alert("Game Over! Press de button to try again...");
    }
})

// Esta funcion recibira un array por parametros y devulelve una copia pero los que tengan 0.
function eraseZeros(row) {
    return row.filter(num => num != 0);
}

function slide(row) {
    // [2,2,2,0]
    row = eraseZeros(row);
    
    // [2,2,2,0] -> [2,2,2]
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }

    // [2,2,2] -> [4,0,2]
    row = eraseZeros(row);

    // [4,0,2] -> [4,2]
    while (row.length < columns) {
        row.push(0);
    }

    // [4,2] -> [4,2,0,0]
    return (row);
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let box = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateBox(box, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let box = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateBox(box, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < rows; c++) {
        let row = [board[0][c],board[1][c],board[2][c],board[3][c]];
        row = slide(row);
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];
        for (let r = 0; r < rows; r++) {
            let box = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateBox(box, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < rows; c++) {
        let row = [board[0][c],board[1][c],board[2][c],board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let box = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateBox(box, num);
        }
    }
}

// Chequeamos si existe algun espacio con 0 (vacio).
function emptySpace() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return (true);
            }
        }
    }
    return (false);
}

// Con esta funcion añadiremos un numero al azar entre 2 y 4 siempre que haya un espacio vacio.
function setNum() {
    if(!emptySpace()) {
        return ;
    }
    let isSpace = false;
    while (!isSpace) {
        let r = Math.floor(Math.random() * rows);       //con esto redondearemos el numero de la casilla.
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            let newValue = Math.random() < 0.9 ? 2 : 4; // 90% (2) - 10% (4)
            board[r][c] = newValue;
            let box = document.getElementById(r.toString() + "-" + c.toString());
            box.innerText = newValue;
            box.classList.add("x" + newValue, "appear");
            isSpace = true;
        }
    }
    setTimeout(updatePositions, 200); // Actualizamos las posiciones despues de la animacion. 
}

//
function updatePositions() {
    // Recorrer el tablero para actualizar las posiciones de cada caja
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let box = document.getElementById(r.toString() + "-" + c.toString());
            box.style.transform = `translate(${c}px, ${r}px)`; // Ajusta las nuevas posiciones.
        }
    }
}

// Funcion de game over.
function checkGameOver() {
    if (emptySpace()) {
        return (false);
    }
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 1; c++) {
            if (board[r][c] == board[r][c + 1]) {
                return (false);
            }
        }
    }
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 1; r++) {
            if (board[r][c] == board[r + 1][c]) {
                return (false);
            }
        }
    }
    return (true);
}

// Funcion de ganar.
function checkWinner() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 2048) {
                return (true);
            }
        }
    }
    return (false);
}
