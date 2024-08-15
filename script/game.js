const playerType = {
    x: true,
    y: false
};

let player = playerType.x;
let table = Array.from({ length: 15 }, () => Array(15).fill(null));

function endGame() {
    document.querySelector("#menu").classList.remove("hidden");
    document.querySelector("#game").classList.add("hidden");
}

function clearGame() {
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

    // hide win popup
    document.querySelector("#win-popup").classList.add("hidden");
    document.querySelector("#win-popup").classList.remove("flex");
}

function play(x, y) {
    if (placeSymbol(x, y) === "full") return;
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

    // place in 2D array
    table[x][y] = player;
}

function checkWin(x, y) {
    const winStar = [
        [table[x]?.[y-4] ?? null, table[x]?.[y-3] ?? null, table[x]?.[y-2] ?? null, table[x]?.[y-1] ?? null, table[x]?.[y] ?? null, table[x]?.[y+1] ?? null, table[x]?.[y+2] ?? null, table[x]?.[y+3] ?? null, table[x]?.[y+4] ?? null],
        [table[x-4]?.[y] ?? null, table[x-3]?.[y] ?? null, table[x-2]?.[y] ?? null, table[x-1]?.[y] ?? null, table[x]?.[y] ?? null, table[x+1]?.[y] ?? null, table[x+2]?.[y] ?? null, table[x+3]?.[y] ?? null, table[x+4]?.[y] ?? null],
        [table[x-4]?.[y-4] ?? null, table[x-3]?.[y-3] ?? null, table[x-2]?.[y-2] ?? null, table[x-1]?.[y-1] ?? null, table[x]?.[y] ?? null, table[x+1]?.[y+1] ?? null, table[x+2]?.[y+2] ?? null, table[x+3]?.[y+3] ?? null, table[x+4]?.[y+4] ?? null],
        [table[x-4]?.[y+4] ?? null, table[x-3]?.[y+3] ?? null, table[x-2]?.[y+2] ?? null, table[x-1]?.[y+1] ?? null, table[x]?.[y] ?? null, table[x+1]?.[y-1] ?? null, table[x+2]?.[y-2] ?? null, table[x+3]?.[y-3] ?? null, table[x+4]?.[y-4] ?? null]
    ];

    console.log(winStar);
    

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
    // edit text
    document.querySelector("#win-message").textContent = player ? "Křížek Vyhrál" : "Kolečko vyhrálo";
    
    // edit gradient
    document.querySelector("#win-popup").classList.remove("hidden");

    if (player) {
        document.querySelector("#win-popup").classList.remove("from-red/50");
        document.querySelector("#win-popup").classList.add("from-blue/50");
    } else {
        document.querySelector("#win-popup").classList.remove("from-blue/50");
        document.querySelector("#win-popup").classList.add("from-red/50");
    }

    // show win popup
    document.querySelector("#win-popup").classList.remove("hidden");
    document.querySelector("#win-popup").classList.add("flex");
}

function togglePlayer() {
    player = !player;
}