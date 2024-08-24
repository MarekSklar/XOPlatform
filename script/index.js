const year = new Date().getFullYear();
if (document.querySelector("#xo-year") !== null) document.querySelector("#xo-year").textContent = `${(year.toString().slice(-2) - 8).toString().padStart(2, '0')}`;

const playerType = {
    x: true,
    y: false
};

let player = playerType.x;
let table = Array.from({ length: 15 }, () => Array(15).fill(null));

let recoredPlays = [];
let playingRecord = false;

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
    table = Array.from({ length: 15 }, () => Array(15).fill(null));

    // reset player
    player = playerType.x;

    // clear last move
    for (let i = 0; i < boardBoxes.length; i++) {
        const boardBox = boardBoxes[i];
        boardBox.classList.remove("bg-red/20");
        boardBox.classList.remove("bg-blue/20");
    }

    // hide win popup
    document.querySelector("#win-popup-x").classList.add("hidden");
    document.querySelector("#win-popup-o").classList.add("hidden");
    document.querySelector("#win-popup-x").classList.remove("flex");
    document.querySelector("#win-popup-o").classList.remove("flex");
}

function clearGame() {
    clearGameWithoutPlayRecords();

    // clear recorded plays
    recoredPlays = [];
}

function play(x, y, recorded = false) {
    if (placeSymbol(x, y) === "full" || (playingRecord && !recorded)) return;
    if (checkWin(x, y)) activateWin();
    else togglePlayer();
}

function placeSymbol(x, y) {
    if (table[x][y] !== null) return "full";

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
    table[x][y] = player;

    // record play
    if (!playingRecord) recoredPlays.push({x, y});
}

function checkWin(x, y) {
    const winStar = [
        [table[x]?.[y-4] ?? null, table[x]?.[y-3] ?? null, table[x]?.[y-2] ?? null, table[x]?.[y-1] ?? null, table[x]?.[y] ?? null, table[x]?.[y+1] ?? null, table[x]?.[y+2] ?? null, table[x]?.[y+3] ?? null, table[x]?.[y+4] ?? null],
        [table[x-4]?.[y] ?? null, table[x-3]?.[y] ?? null, table[x-2]?.[y] ?? null, table[x-1]?.[y] ?? null, table[x]?.[y] ?? null, table[x+1]?.[y] ?? null, table[x+2]?.[y] ?? null, table[x+3]?.[y] ?? null, table[x+4]?.[y] ?? null],
        [table[x-4]?.[y-4] ?? null, table[x-3]?.[y-3] ?? null, table[x-2]?.[y-2] ?? null, table[x-1]?.[y-1] ?? null, table[x]?.[y] ?? null, table[x+1]?.[y+1] ?? null, table[x+2]?.[y+2] ?? null, table[x+3]?.[y+3] ?? null, table[x+4]?.[y+4] ?? null],
        [table[x-4]?.[y+4] ?? null, table[x-3]?.[y+3] ?? null, table[x-2]?.[y+2] ?? null, table[x-1]?.[y+1] ?? null, table[x]?.[y] ?? null, table[x+1]?.[y-1] ?? null, table[x+2]?.[y-2] ?? null, table[x+3]?.[y-3] ?? null, table[x+4]?.[y-4] ?? null]
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
}

function togglePlayer() {
    player = !player;
}

function playGameRecord() {
    playingRecord = true;
    console.log(recoredPlays);
    

    clearGameWithoutPlayRecords();
    const moveCount = recoredPlays.length - 1;
    let i = 0;

    const playRecordInterval = setInterval(() => {
        console.log(i, recoredPlays.length);
        
        playedMove = recoredPlays[i];

        const x = playedMove.x;
        const y = playedMove.y;
        play(x, y, true);

        if (i === moveCount) {
            clearInterval(playRecordInterval);
            playingRecord = false;
            console.log(recoredPlays);
        }

        i++;
    }, 400);
}