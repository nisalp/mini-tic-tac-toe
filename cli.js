const prompts = require("prompts");

async function exitProgram() {
  process.exit();
}

async function askForName(message) {
  const response = await prompts({
    type: "text",
    name: "value",
    message: message,
  });
  return response.value;
}

async function playerTurn(name, symbol) {
  console.info(`It's your turn ${name}(${symbol})}`);
  const response = await prompts([
    {
      type: "number",
      name: "row",
      message: "Enter the row number(1-3):",
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
  askForName,
};
