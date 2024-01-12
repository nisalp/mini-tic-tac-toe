const { askForSize, playerTurn, exitProgram } = require("./cli");
const { chooseMode, createBoard, validateClick, markCell } = require("./board");

async function main() {
  // asking the player for the size of the board
  const mode = await chooseMode();
  const rows = await createBoard(mode);

  while (true) {
    let turnResponse = await playerTurn(rows);
    console.log(turnResponse);

    // let click = validateClick(turnResponse);

    let mark = markCell(turnResponse, mode);

    if (mark === 1) {
      exitProgram();
    }
  }
}

main();
