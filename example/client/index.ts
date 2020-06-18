import chalk from 'chalk';

import { askQuestion } from '../shared/utils';
import * as client from './client';

type Option = {
  title: string;
  handler: Function;
};

const createOption = (title: string, handler: Function): Option => ({
  title,
  handler,
});

const options: { [index: string]: Option } = {
  C: createOption('Configurar', client.configurar),
  V: createOption('Verificar presença', client.verificarPresenca),
  E: createOption('Escrever mensagem', client.escreverMensagem),
  F: createOption('Simular função', client.simularFuncao),
  L: createOption('Limpar console', console.clear),
  M: createOption('Mostrar menu', showMenu),
  S: createOption('Sair', () => console.log('Encerrando o processo...')),
};

const keys = Object.keys(options);

function showMenu() {
  console.log(chalk.green('\n\t\tSiTef Interativo\n'));

  for (const key in options) {
    console.log(`- ${chalk.green(key + ':')} ${options[key].title}`);
  }

  console.log();
}

const main = async () => {
  showMenu();

  do {
    let option = await askQuestion('Opção: ');
    option = option ? option.toUpperCase() : '';

    if (!keys.includes(option)) {
      console.log(chalk.red('Opção inválida! Digite novamente.\n'));
    } else {
      await options[option].handler();

      if (option === 'S') {
        break;
      }
    }
  } while (true);
};

main();
