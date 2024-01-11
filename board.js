// let board = function createBoard()
const { askForSize, playerTurn, exitProgram } = require("./cli");


let realBoard = [];
let pseudoBoard = [];

async function createBoard() {
    rows = await askForSize("Hi, player.\nWhat size do you want your board to be?\nYour answer is n.\nYour board size will be n*n.");

    // creating realBoard
    for (let i = 0; i < rows; i++) {
        realBoard.push([]);

        for (let j = 0; j < rows; j++) {
            realBoard[i].push(" ");
        }
    }

    // creating pseudoBoard;
    for (let i = 0; i < rows; i++) {
        pseudoBoard.push([]);

        for (let j = 0; j < rows; j++) {
            pseudoBoard[i].push(" ");
        }
    }

    console.log(`Your board has ${rows*rows} squares.`);
    printPseudoBoard(pseudoBoard, rows);
    assignBombs(realBoard, rows);
    // printBoard(board,rows);

    return rows;
}

function printPseudoBoard(pseudoBoard, rows) {
    // printing the top bar
    for (let i = 0; i < rows; i++) {
        process.stdout.write(` _`);
    }

    process.stdout.write(`\n`);

    // printing the actual board
    for (let i = 0; i < rows; i++) {
        process.stdout.write(`|`);
        for (let j = 0; j < rows; j++) {
            process.stdout.write(pseudoBoard[i][j]);
            process.stdout.write(`|`);
        }

        process.stdout.write(`\n`);
        
        // printing seperating horizontal line
        for (let j = 0; j < rows; j++) {
            process.stdout.write(` -`);
        }

        process.stdout.write(`\n`);
    }
}

function assignBombs(realBoard, row) {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < row; j++) {
            realBoard[i][j] = Math.floor((Math.random()*10000)%2);

            if (realBoard[i][j] == 1) {
                realBoard[i][j] = "X";
            } else {
                realBoard[i][j] = " ";
            }
        }
    }
}

function printRealBoard(realBoard, rows) {
    // printing the top bar
    for (let i = 0; i < rows; i++) {
        process.stdout.write(` _`);
    }

    process.stdout.write(`\n`);

    // printing the actual board
    for (let i = 0; i < rows; i++) {
        process.stdout.write(`|`);
        for (let j = 0; j < rows; j++) {
            process.stdout.write(realBoard[i][j]);
            process.stdout.write(`|`);
        }

        process.stdout.write(`\n`);
        
        // printing seperating horizontal line
        for (let j = 0; j < rows; j++) {
            process.stdout.write(` -`);
        }

        process.stdout.write(`\n`);
    }
}

function clickCell(turnResponse) {
    // turnResponse[0] is the row
    // turnResponse[1] is the column

    turnResponse[0] = turnResponse[0] - 1;
    turnResponse[1] = turnResponse[1] - 1;

    if (realBoard[turnResponse[0]][turnResponse[1]] === "X") {
        console.log(`Bomb. Game over.`);
        printRealBoard(realBoard,rows);
        return 1;
    } else {
        console.log(`All good. Carry on.`);

        let i = -1;
        let maxRow = 2;

        if (turnResponse[0] === 0) {
            i = 0;
        }

        if (turnResponse[0] === realBoard.length - 1) {
            maxRow = 1;
        }

        let bombCount = 0;

        for (i; i < maxRow; i++) {
            if (turnResponse[1] === 0) {
                j = 0;
            } else {
                j = -1;
            }
    
            if (turnResponse[1] === realBoard.length - 1) {
                maxColumn = 1;
            } else {
                maxColumn = 2;
            }

            for (j; j < maxColumn; j++) {
                if (realBoard[turnResponse[0] + i][turnResponse[1] + j] === "X") {
                    bombCount++;
                }
            }
        }

        pseudoBoard[turnResponse[0]][turnResponse[1]] = `${bombCount}`;
        realBoard[turnResponse[0]][turnResponse[1]] = `${bombCount}`;

        printPseudoBoard(pseudoBoard, rows);
        return 0;
    }
}

module.exports = {
    createBoard,
    clickCell
  };