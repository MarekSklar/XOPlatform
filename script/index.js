const year = new Date().getFullYear();
if (document.querySelector("#xo-year") !== null) document.querySelector("#xo-year").textContent = `${(year.toString().slice(-2) - 8).toString().padStart(2, '0')}`;

const playerType = {
    x: true,
    y: false
};

let player = playerType.x;
let board = Array.from({ length: 15 }, () => Array(15).fill(null));

let recoredMoves = [];
let playingRecord = false;

let playRecordInterval;

let startGameTime;

function startGame() {
    document.querySelector("#menu").classList.add("hidden");
    document.querySelector("#game").classList.remove("hidden");
    document.querySelector("#game").classList.add("flex");

    document.querySelector("#game-back-button").classList.remove("hidden");
}

function endGame() {
    document.querySelector("#menu").classList.remove("hidden");
    document.querySelector("#game").classList.add("hidden");
    document.querySelector("#game").classList.add("flex");
}

function clearGameWithoutPlayRecords() {
    // clear element
    const boardBoxes = document.querySelectorAll('.board-box');
    for (let i = 0; i < boardBoxes.length; i++) {
        const boardBox = boardBoxes[i];
        boardBox.innerHTML = "";
    }

    // clear 2D array
    board = Array.from({ length: 15 }, () => Array(15).fill(null));

    // reset player
    player = playerType.x;

    // clear last move
    for (let i = 0; i < boardBoxes.length; i++) {
        const boardBox = boardBoxes[i];
        boardBox.classList.remove("bg-red/20");
        boardBox.classList.remove("bg-blue/20");
    }

    // reset timer
    startGameTime = new Date().getTime();

    // hide win popup
    document.querySelector("#win-popup-x").classList.add("hidden");
    document.querySelector("#win-popup-o").classList.add("hidden");
    document.querySelector("#win-popup-draw").classList.add("hidden");
    document.querySelector("#win-popup-x").classList.remove("flex");
    document.querySelector("#win-popup-o").classList.remove("flex");
    document.querySelector("#win-popup-draw").classList.remove("flex");
}

function clearGame() {
    clearGameWithoutPlayRecords();

    // clear recorded plays
    recoredMoves = [];

    // clear playing record
    playingRecord = false;

    // clear play record interval
    clearInterval(playRecordInterval);
}

function play(x, y, recorded = false) {
    if (playingRecord && !recorded) return;
    if (placeSymbol(x, y) === "full") return;
    if (checkWin(x, y)) activateWin();
    if (!board.flat().includes(null)) activateDraw();
    else togglePlayer();
}

function placeSymbol(x, y) {
    if (board[x][y] !== null) return "full";

    // place in element
    const linearCoords = 15*y + x;

    const img = document.createElement('img');
    img.src = `assets/img/${player ? "x" : "o"}.svg`;
    
    document.querySelectorAll('.board-box')[linearCoords].appendChild(img);

    // highlight board box
    const boardBoxes = document.querySelectorAll('.board-box');
    for (let i = 0; i < boardBoxes.length; i++) {
        const boardBox = boardBoxes[i];
        boardBox.classList.remove("bg-red/20");
        boardBox.classList.remove("bg-blue/20");
    }

    document.querySelectorAll('.board-box')[linearCoords].classList.add(player ? "bg-blue/20" : "bg-red/20");

    // place in 2D array
    board[x][y] = player;

    // record play
    if (!playingRecord) recoredMoves.push({x, y});
}

function checkWin(x, y) {
    const winStar = [
        [board[x]?.[y-4] ?? null, board[x]?.[y-3] ?? null, board[x]?.[y-2] ?? null, board[x]?.[y-1] ?? null, board[x]?.[y] ?? null, board[x]?.[y+1] ?? null, board[x]?.[y+2] ?? null, board[x]?.[y+3] ?? null, board[x]?.[y+4] ?? null],
        [board[x-4]?.[y] ?? null, board[x-3]?.[y] ?? null, board[x-2]?.[y] ?? null, board[x-1]?.[y] ?? null, board[x]?.[y] ?? null, board[x+1]?.[y] ?? null, board[x+2]?.[y] ?? null, board[x+3]?.[y] ?? null, board[x+4]?.[y] ?? null],
        [board[x-4]?.[y-4] ?? null, board[x-3]?.[y-3] ?? null, board[x-2]?.[y-2] ?? null, board[x-1]?.[y-1] ?? null, board[x]?.[y] ?? null, board[x+1]?.[y+1] ?? null, board[x+2]?.[y+2] ?? null, board[x+3]?.[y+3] ?? null, board[x+4]?.[y+4] ?? null],
        [board[x-4]?.[y+4] ?? null, board[x-3]?.[y+3] ?? null, board[x-2]?.[y+2] ?? null, board[x-1]?.[y+1] ?? null, board[x]?.[y] ?? null, board[x+1]?.[y-1] ?? null, board[x+2]?.[y-2] ?? null, board[x+3]?.[y-3] ?? null, board[x+4]?.[y-4] ?? null]
    ];    

    let winValue = 0;

    for (let i = 0; i < winStar.length; i++) {
        const starLine = winStar[i];
        
        for (let j = 0; j < starLine.length; j++) {
            const boardBoxValue = starLine[j];
            
            if (boardBoxValue === player) winValue++;
            else winValue = 0;

            if (winValue === 5) return true;
        }
    }

    return false;
}

function activateWin() {
    if (player) {
        document.querySelector("#win-popup-x").classList.remove("hidden");
        document.querySelector("#win-popup-x").classList.add("flex");
    } else {
        document.querySelector("#win-popup-o").classList.remove("hidden");
        document.querySelector("#win-popup-o").classList.add("flex");
    }
    
    sendAnalytics();
}

function activateDraw() {
    document.querySelector("#win-popup-draw").classList.remove("hidden");
    document.querySelector("#win-popup-draw").classList.add("flex");

    sendAnalytics();
}

function sendAnalytics() {
    if (!playingRecord) {
        sendData({
            data: {
                language: config.selectedLanguage,
                winner: (!board.flat().includes(null)) ? "draw" : (player ? "x" : "o"),
                moves: recoredMoves,
                movesCount: recoredMoves.length,
                board,
                duration: new Date().getTime() - startGameTime
            }
        });
    }
}

function togglePlayer() {
    player = !player;
}

function playGameRecord() {
    playingRecord = true;

    clearGameWithoutPlayRecords();
    const moveCount = recoredMoves.length - 1;
    let i = 0;

    playRecordInterval = setInterval(() => {
        
        playedMove = recoredMoves[i];

        const x = playedMove.x;
        const y = playedMove.y;
        play(x, y, true);

        if (i === moveCount) {
            clearInterval(playRecordInterval);
            playingRecord = false;
        }

        i++;
    }, 400);
}

// toggle XO web iframe
function toggleXOIframe() {
    const iframe = document.querySelector(".xoIframe");
    iframe.classList.toggle("hidden");
    iframe.classList.toggle("flex");
}