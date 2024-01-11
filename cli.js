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

async function askForMode() {
    const response = await prompts({
      type: "text",
      name: "value",
      message: `Do you want Test Mode or Play Mode?\n\nFor Test Mode enter T.\nIn Test Mode, you will be shown an additional board with the bombs so you can test by clicking the cell you want.\n\nFor Play Mode, enter P.\nIn Play Mode you will only be shown the blank board, like the actual game.\n\nTest Mode(T) or Play Mode(P)? `,
    });
    
    answer = response.value;

    return answer.toLowerCase();
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
  askForMode
};
