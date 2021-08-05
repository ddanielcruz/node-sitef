import path from 'path';
import chalk from 'chalk';

import SiTef from '../../src';
import config from '../shared/config';
import { messages } from '../shared/utils';

const main = async () => {
  // Define o caminho para as DLLs do SiTef e instancia o client
  const dlls = path.resolve(__dirname, '..', 'shared', 'bin', 'CliSiTef64I.dll');
  const sitef = new SiTef(dlls);

  try {
    // Configurando o SiTef
    let response = await sitef.configurar(config);
    let message = messages.configuracao[response];
    if (response !== 0) throw new Error(message);
    console.log(chalk.green('ConfiguraIntSiTefInterativo:'), message);

    // Verificando a presença do PinPad
    response = await sitef.verificarPresenca();
    message = messages.verificacaoPresenca[response];
    if (response !== 1) throw new Error(message);
    console.log(chalk.green('VerificaPresencaPinPad:'), message);

    // Escrevendo a mensagem permanente
    response = await sitef.escreverMensagem("I'm watching you");
    const title = 'EscreveMensagemPermanentePinPad:';

    if (response === 0) {
      console.log(chalk.green(title), 'Mensagem escrita com sucesso.');
    } else {
      console.log(chalk.red(title), 'Não foi possível escrever a mensagem.');
    }
  } catch (error) {
    return console.error(chalk.red(error.message));
  }
};

main();
