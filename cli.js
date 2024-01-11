const prompts = require("prompts");

async function exitProgram() {
  process.exit();
}

async function askForSize(message) {
  const response = await prompts({
    type: "number",
    name: "value",
    message: message,
  });

  // squaring the user's answer to create a square board
  // boardSize = response.value * response.value;
  return response.value;
}

async function playerTurn(rows) {
  console.info(`Select a cell by typing the row and column numbers (1 - ${rows}).`);
  const response = await prompts([
    {
      type: "number",
      name: "row",
      message: "Enter the row number:",
    },
    {
      type: "number",
      name: "col",
      message: "Enter the column number (1-3):",
    },
  ]);
  return [response.row, response.col];
}

module.exports = {
  exitProgram,
  playerTurn,
  askForSize,
};
