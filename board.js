// let board = function createBoard()
const { askForMode, askForSize, playerTurn, exitProgram } = require("./cli");

async function chooseMode() {
    let assignMode;

    while (assignMode !== "p" || assignMode !== "t"){
        assignMode = await askForMode();

        if (assignMode === "p") {
            console.log();
            return 0;
        }
        
        if (assignMode === "t") {
            console.log();
            return 1;
        }
    }
}

let realBoard = [];
let pseudoBoard = [];
let cellsFilled = 0;

async function createBoard(mode) {
    rows = await askForSize("Hi, player.\nLet\'s set up your board.\n\nYour board will have the same number of rows as it has columns.\nBasically a square.\n\nSo, how many rows (and thereby columns) do you want in your board? ");

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

    assignBombs(realBoard, rows);
    console.log(`Your board has ${rows*rows} squares.`);

    if (mode === 1) {
        console.log(`\nSince you are in Test Mode, here is the real board.\nYou will see this in every round. So no need to memorise.\nX is where the bombs are.`);
        printRealBoard(realBoard,rows);
        console.log(`\nBelow, you have the user facing board that you see in the actual game. Enjoy!`);
    }

    printPseudoBoard(pseudoBoard, rows);
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
                cellsFilled++;
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

// function validateClick(turnResponse) {
//     if (turnResponse[0] < 1 || turnResponse [1] < 1 || turnResponse[0] > realBoard.length || turnResponse[1] > realBoard.length) {
//         console.log(`Row and Column numbers should be between 1 and ${realBoard.length}`);
//         return 1;
//     } else {
//         return 0;
//     }
// }

function markCell(turnResponse, mode) {
    // turnResponse[0] is the row
    // turnResponse[1] is the column

    // Validation
    if (turnResponse[0] < 1 || turnResponse [1] < 1 || turnResponse[0] > realBoard.length || turnResponse[1] > realBoard.length) {
        console.log(`Row and Column numbers should be between 1 and ${realBoard.length}`);
        return 2;
    }

    // 0-indexing user input
    turnResponse[0] = turnResponse[0] - 1;
    turnResponse[1] = turnResponse[1] - 1;

    // Checking whether user has clicked on a bomb
    if (realBoard[turnResponse[0]][turnResponse[1]] === "X") {
        printRealBoard(realBoard,rows);
        console.log(`\nThat's a bomb! Game over.\n`);

        return 1;
    } else {
        let bombCount = 0;

        // because if row is 0 then there are no rows before that
        if (turnResponse[0] === 0) {
            i = 0;
        } else {
            i = -1;
        }

        // if row is the final row then no rows beyond it
        if (turnResponse[0] === realBoard.length - 1) {
            maxRow = 1;
        } else {
            maxRow = 2;
        }

        for (i; i < maxRow; i++) {
            // same logic as assigning i but j is for columns
            if (turnResponse[1] === 0) {
                j = 0;
            } else {
                j = -1;
            }
    
            // same logic as maxRow but for columns
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

        cellsFilled++;

        if (cellsFilled === realBoard.length*realBoard.length) {
            printRealBoard(realBoard, rows);
            console.log(`\nCongratulations, you win!\n`);
            
            return 1;
        } else {
            if (mode === 1) {
                printRealBoard(realBoard, rows);
            }

            printPseudoBoard(pseudoBoard, rows);
            console.log(`All good. Carry on.`);

            return 0;
        }
        
    }
}

module.exports = {
    chooseMode,
    createBoard,
    markCell
  };