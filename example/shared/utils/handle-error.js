const chalk = require("chalk");

module.exports = error => {
  const message = error.message || `Erro desconhecido (${error.name}).`;
  console.log(chalk.red(message), "\n");
};
