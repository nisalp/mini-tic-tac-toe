const { playerTurn } = require("./cli");

let matrix = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
]

function modifyMatrix(turnResponse) {
    if (matrix[turnResponse[0] - 1][turnResponse[1] - 1] === " ") {
        matrix[turnResponse[0] - 1][turnResponse[1] - 1] = turnResponse[2];

        printMatrix(matrix);
        
        console.log(`Turn Accepted!.`);
        accept = 1;

        winCheck = checkWin(matrix);

        return [accept, winCheck];
    } else {
        printMatrix(matrix);

        console.log(`Turn refused!\nSlot [${turnResponse[0]}, ${turnResponse[1]}] is already taken or out of bounds. Try a different slot.`);
        accept = 0;

        return accept;
    }
}

function checkWin(matrix) {
    for (let i = 0; i < matrix[0].length; i++) {
        if (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2]) {
            if (matrix[i][0] !== " ") {
                // console.log(`We have a winner! - row`)
                return 1;
            }
        }

        if (i === 2) {
            for (let k = 0; k < matrix[0].length; k++) {
                if (matrix[0][k] === matrix[1][k] && matrix[1][k] === matrix[2][k]) {
                    if (matrix[0][k] !== " ") {
                        // console.log(`We have a winner! - column`)
                        return 1;
                    }
                }

                if (k === 2) {
                    equalCounter = 0;
                    for (let t = 1; t < matrix[0].length; t++) {
                        if (matrix[t][t] === matrix[t - 1][t - 1]) {
                            equalCounter++;
                        }

                        if (t === 2) {
                            if (equalCounter === 2) {
                                if (matrix[t][t] !== " ") {
                                    // console.log(`We have a winner - backward diagonal!`)
                                    return 1;
                                }
                            }

                            equalCounter = 0;
                            for (let g = 1; g < matrix[0].length; g++) {
                                if (matrix[g][matrix[0].length - 1 - g] === matrix[g - 1][matrix[0].length - 1 - g + 1]) {
                                    equalCounter++;

                                    if (equalCounter === 2) {
                                        if (matrix[g][matrix[0].length - 1 - g] !== " ") {
                                            // console.log(`We have a winner! - forward diagonal`)
                                            return 1;
                                        } else {
                                            console.log (`No winner yet. Continue.`);
                                            return 0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            
        }
    }
}

function printMatrix(matrix) {
    console.log(`\`\`\``);

    for (let i = 0; i < matrix[0].length; i++) {
        console.log(`-------`);

        for (let j = 0; j < matrix[i].length; j++) {
            process.stdout.write(`|${matrix[i][j]}`);
        }

        console.log(`|`);
    }

    console.log(`-------`);
    console.log(`\`\`\``);
}

module.exports = {
    matrix,
    modifyMatrix,
  };