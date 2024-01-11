const { askForSize, playerTurn, exitProgram } = require("./cli");
const { createBoard, clickCell } = require("./board");

async function main() {
  // asking the player for the size of the board
  const rows = await createBoard();

  while (true) {
    const turnResponse = await playerTurn(rows);
    console.log(turnResponse);

    let click = clickCell(turnResponse);

    if (click === 1) {
      exitProgram();
    }
  }
}

main();
