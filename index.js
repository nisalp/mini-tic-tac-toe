const { askForName, playerTurn, exitProgram } = require("./cli");

async function main() {
  const player1 = await askForName("Hi, player 1, what's your name?");
  const player2 = await askForName("Hi, player 2, what's your name?");

  while (true) {
    const turnResponse = await playerTurn(player1, "X");
    console.log(turnResponse);
    exitProgram();
  }
}

main();
