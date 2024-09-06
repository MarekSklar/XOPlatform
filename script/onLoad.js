// change language
changeLanguage();

// generate the board
function generateBoard() {
    const board = document.querySelector(".board");

    // Create fragment for boxes
    const fragment = document.createDocumentFragment();

    // generate all board boxes
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {

            const boardBox = document.createElement('div');
            boardBox.className = 'board-box';
            boardBox.onclick = () => play(j, i);

            fragment.appendChild(boardBox);
        }
    }   

    board.appendChild(fragment);
}
generateBoard();

// change year of current XO
function currentXOYear() {
    const year = new Date().getFullYear();
    
    if (document.querySelector("#xo-year") !== null) document.querySelector("#xo-year").textContent = `${(year.toString().slice(-2) - 8).toString().padStart(2, '0')}`;
}
currentXOYear();