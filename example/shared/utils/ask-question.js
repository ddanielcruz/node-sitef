const readline = require("readline");
const chalk = require("chalk");

module.exports = query => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  return new Promise(resolve =>
    rl.question(chalk.yellow(query), ans => {
      rl.close();
      resolve(ans);
    })
  );
};
