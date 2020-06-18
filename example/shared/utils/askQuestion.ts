import readline from 'readline';
import chalk from 'chalk';

export default (query: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  return new Promise((resolve) =>
    rl.question(chalk.yellow(query), (ans) => {
      rl.close();
      resolve(ans);
    })
  );
};
