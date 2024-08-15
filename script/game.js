const playerType = {
    x: true,
    y: false
};

let player = playerType.x;
const table = Array.from({ length: 15 }, () => Array(15).fill(null));

function endGame() {
    document.querySelector("#menu").classList.remove("hidden");
    document.querySelector("#game").classList.add("hidden");
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
    document.querySelectorAll('.board-box')[linearCoords].innerHTML = player ? "x" : "o";

    // place in 2D array
    table[x][y] = player;
}

function checkWin(x, y) {
    const winStar = [
        [table[x][y-4], table[x][y-3], table[x][y-2], table[x][y-1], table[x][y], table[x][y+1], table[x][y+2], table[x][y+3], table[x][y+4]],
        [table[x-4][y], table[x-3][y], table[x-2][y], table[x-1][y], table[x][y], table[x+1][y], table[x+2][y], table[x+3][y], table[x+4][y]],
        [table[x-4][y-4], table[x-3][y-3], table[x-2][y-2], table[x-1][y-1], table[x][y], table[x+1][y+1], table[x+2][y+2], table[x+3][y+3], table[x+4][y+4]],
        [table[x-4][y+4], table[x-3][y+3], table[x-2][y+2], table[x-1][y+1], table[x][y], table[x+1][y-1], table[x+2][y-2], table[x+3][y-3], table[x+4][y-4]],
    ]

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
    console.log(`Hráč s ${player} vyhrál`);
    
}

function togglePlayer() {
    player = !player;
}