const { askForName, playerTurn, exitProgram } = require("./cli");
const { matrix, modifyMatrix } = require("./matrix");

async function main() {
  const player1 = await askForName("Hi, player 1, what's your name?");
  const player2 = await askForName("Hi, player 2, what's your name?");
  let currentTurn = 1;

  while (true) {
    let turnResponse;

    if (currentTurn % 2 == 1) {
      await player1Cycle();
    } else {
      await player2Cycle();
    }

    async function player1Cycle() {
      turnResponse = await playerTurn(player1, "X");
    }

    async function player2Cycle() {
      turnResponse = await playerTurn(player2, "O");
    }

    let acceptTurn = modifyMatrix(turnResponse);

    if (currentTurn === 9 ) {
      console.log(`It's a draw! No winner.`);
      console.log(`Shake hands and go home, ${player1} and ${player2}`);
      console.log(`You are both losers.`);
      exitProgram();
    } else if (acceptTurn[1] === 1) {
      console.log(`We have a winner!`);

      if (currentTurn % 2 === 1) {
        console.log(`Congratulations, ${player1}!`)
      } else {
        console.log(`Congratulations, ${player2}!`)
      }

      console.log(`You receive nothing for your efforts.`);
      console.log(`Alexa, exit program.\n`);
      exitProgram();
    }

    if (acceptTurn[0] === 1) {
      currentTurn++;
    }
  }
}

main();
