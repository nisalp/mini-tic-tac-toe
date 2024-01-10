const { askForName, playerTurn, exitProgram } = require("./cli");

async function main() {
  const player1 = await askForName("Hi, player 1, what's your name?");
  const player2 = await askForName("Hi, player 2, what's your name?");

  let turn = 0;
  let board = [];
  let inversedBoard = [];

  for (let i = 0; i < 3; i++) {
    board.push([" ", " ", " "]);
    inversedBoard.push([" ", " ", " "]);
  }

  while (true) {
    let turnResponse;

    if (turn % 2 === 0) {
      turnResponse = await playerTurn(player1, "X");
    } else {
      turnResponse = await playerTurn(player2, "O");
    }

    let row = turnResponse[0];
    let column = turnResponse[1];

    if (board[row - 1][column - 1] !== " ") {
      console.log("Square already marked!\n");
      continue;
    }

    if (turn % 2 === 0) {
      board[row - 1][column - 1] = "X";
    } else {
      board[row - 1][column - 1] = "O";
    }

    printBoard(board);
    console.log("\n");

    if (turn > 3) {
      let winner = checkWinner(board);

      if (winner === "X") {
        console.log("Player '" + player1 + "'  Won!");
        exitProgram();
      }
      if (winner === "Y") {
        console.log("Player " + player2 + " Won!");
        exitProgram();
      }
    }
    turn++;
  }
}

function printBoard(board) {
  console.log("-------");
  for (let i = 0; i < 3; i++) {
    process.stdout.write("|");

    for (let j = 0; j < 3; j++) {
      process.stdout.write(board[i][j] + "|");
    }
    console.log("\n-------");
  }
}

function checkWinner(board) {
  let inversedBoard = [];
  for (let i = 0; i < 3; i++) {
    inversedBoard.push([" ", " ", " "]);
  }

  let rightToLeftDiaganolMatches = 0;
  let rightToLeftDiaganolfirst = board[0][0];

  let leftToRightDiaganolmatches = 0;
  let leftToRightDiaganolFirst = board[0][2];

  for (let i = 0; i < 3; i++) {
    let fElement = board[i][0];
    let rowMatches = 0;

    if (board[i][i] === rightToLeftDiaganolfirst) rightToLeftDiaganolMatches++;
    if (board[i][board.length - 1 - i] === leftToRightDiaganolFirst)
      leftToRightDiaganolmatches++;

    for (let j = 0; j < 3; j++) {
      inversedBoard[j][i] = board[i][j];

      if (fElement !== " ") {
        if (board[i][j] === fElement) {
          rowMatches++;
        }
      }
    }
    if (rowMatches === 3) return fElement;
    if (rightToLeftDiaganolMatches === 3) return rightToLeftDiaganolfirst;
    if (leftToRightDiaganolmatches === 3) return leftToRightDiaganolFirst;
  }

  console.log(inversedBoard);
  return checkWinner(inversedBoard);
}

main();
