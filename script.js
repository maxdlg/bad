const gameBoard = (() => {
    let gameArray = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];

    return { gameArray };
})();

const displayController = (() => {
    let board = gameBoard.gameArray;

    function render() {
        const gameSpace = document.querySelector(".gameSpace");
        while (gameSpace.firstChild) {
            gameSpace.removeChild(gameSpace.lastChild);
        }
        let k = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const symbol = document.createElement("p");
                symbol.classList.add(j);
                symbol.classList.add(i);
                symbol.id = k;
                gameSpace.appendChild(symbol);
                document.getElementById(k).textContent = board[i][j];
                k++;
            }
        }
    }
    render();
    return { render };
})();

const player = (name, symbol) => {
    return { name, symbol };
};

//const logic = (() => {
(() => {
    const player1 = player("joe", "x");
    //const player2 = player(prompt("Choose name"), "o");
    let symbol = player1.symbol;
    let board = gameBoard.gameArray;

    document.addEventListener("click", playerChoice);

    function playerChoice(evt) {
        let xVal = evt.srcElement.classList[0];
        let yVal = evt.srcElement.classList[1];
        if (yVal === undefined) {
            yVal = xVal;
        }

        if (evt.srcElement.localName === "p") {
            if (board[yVal][xVal] === " ") {
                board[yVal].splice(xVal, 1, symbol);
            }
        }

        displayController.render();
    }
    return {};
})();
