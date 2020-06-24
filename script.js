const gameBoard = (() => {
    let originalArray = [
        ["  ", "  ", " "],
        [" ", " ", "  "],
        ["  ", " ", " "],
    ];
    let gameArray = [
        ["  ", "  ", " "],
        [" ", " ", "  "],
        ["  ", " ", " "],
    ];
    return { gameArray, originalArray };
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
                symbol.id = "num" + k;
                gameSpace.appendChild(symbol);
                document.getElementById("num" + k).textContent = board[i][j];
                k++;
            }
        }
    }
    render();

    document.addEventListener("click", choosePlacement);
    function choosePlacement(evt) {
        let xVal = evt.srcElement.classList[0];
        let yVal = evt.srcElement.classList[1];
        if (yVal === undefined) {
            yVal = xVal;
        }
        logic.testPlacement(xVal, yVal, evt);
    }

    function resetBoard() {
        gameBoard.gameArray = gameBoard.originalArray;
        console.log(gameBoard.gameArray);
        console.log(gameBoard.originalArray);
    }

    function endGame(state) {
        document.removeEventListener("click", choosePlacement);
        const messageArea = document.querySelector("#messageArea");

        if (state === "win") {
            messageArea.textContent = "Congrats, you won!";
        } else {
            messageArea.textContent = "Cat's Game";
        }
    }
    return { render, resetBoard, endGame };
})();

const player = (name, symbol) => {
    return { name, symbol };
};

const logic = (() => {
    let board = gameBoard.gameArray;

    const player1 = player("joe", "x");
    const player2 = player("mama", "o");
    let symbol = player1.symbol;

    let turnCounter = 0;
    function getTurn() {
        if (turnCounter % 2 === 0) {
            symbol = player2.symbol;
        } else {
            symbol = player1.symbol;
        }
        turnCounter++;
        if (turnCounter > 4) {
            getCurrentWinBoards();
        }
    }

    function testPlacement(xVal, yVal, evt) {
        if (evt.srcElement.localName === "p") {
            if (board[yVal][xVal] === " " || board[yVal][xVal] === "  ") {
                board[yVal].splice(xVal, 1, symbol);
                getTurn();
                displayController.render();
                console.log(true);
            }
        }
    }

    function getCurrentWinBoards() {
        let possibleBoards = [
            board[0],
            board[1],
            board[2],
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]],
        ];
        testForWinner(possibleBoards);
    }

    function testForWinner(winBoards) {
        const allEqual = (arr) => arr.every((v) => v === arr[0]);
        for (const element of winBoards) {
            if (allEqual(element)) {
                displayController.endGame("win");
                break;
            } else if (turnCounter === 9) {
                displayController.endGame("tie");
            }
        }
    }

    return { testPlacement, getCurrentWinBoards };
})();

const AI = (() => {
    const simClick = document.getElementById("simClick");
    simClick.addEventListener("click", simAI);
    function simAI() {
        document.getElementById("num" + Math.floor(Math.random() * 9)).click();
    }
})();
