const path = require('path');
const chalk = require('chalk');

const SiTef = require('../../dist').default;
const config = require('../shared/config');
const { messages } = require('../shared/utils');

// Cria o objeto do SiTef
const dllPath = path.resolve(
  __dirname,
  '..',
  'shared',
  'bin',
  'libclisitef.so'
);
const sitef = new SiTef(dllPath);

const main = () => {
  const promise = sitef
    .configurar(config)
    .then((response) => {
      const message = messages.configuracao[response];
      if (response !== 0) throw message;

      console.log(`ConfiguraIntSiTefInterativo: ${message}`);
      return sitef.verificarPresenca();
    })
    .then((response) => {
      const message = messages.verificacaoPresenca[response];
      if (response !== 1) throw message;

      console.log(`VerificaPresencaPinPad: ${message}`);
      return sitef.escreverMensagem('Lorem ipsum.');
    })
    .then((response) => {
      const message =
        response === 0
          ? 'Mensagem escrita com sucesso.'
          : 'Não foi possível escrever a mensagem.';

      console.log(`EscreveMensagemPermanentePinPad: ${message}`);
    })
    .catch((err) => console.log(chalk.red(err)));

  return promise;
};

main().then(process.exit);
