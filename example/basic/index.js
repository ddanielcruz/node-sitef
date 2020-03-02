const path = require("path");
const chalk = require("chalk");

const CliSiTef = require("../../src/cli-sitef");
const config = require("../shared/config");
const { messages } = require("../shared/utils");

// Cria o objeto do SiTef
const dllPath = path.resolve(
  __dirname,
  "..",
  "shared",
  "bin",
  "libclisitef.so"
);
const sitef = new CliSiTef(dllPath);

const main = () => {
  const promise = sitef
    .configurar(config)
    .then(response => {
      const message = messages.configuracao[response];
      if (response !== 0) throw message;

      console.log(`ConfiguraIntSiTefInterativo: ${message}`);
      return sitef.verificarPresenca();
    })
    .then(response => {
      const message = messages.verificacaoPresenca[response];
      if (response !== 1) throw message;

      console.log(`VerificaPresencaPinPad: ${message}`);
      return sitef.escreverMensagem("Lorem ipsum.");
    })
    .then(response => {
      message =
        response === 0
          ? "Mensagem escrita com sucesso."
          : "Não foi possível escrever a mensagem.";
      console.log(`EscreveMensagemPermanentePinPad: ${message}`);
    })
    .catch(err => console.log(chalk.red(err)));

  console.log(chalk.greenBright("Teste"));

  return promise;
};

// const main = async () => {
//   // Configura o SiTef. Em caso de sucesso deve ser retornado zero
//   let response = await sitef.configurar(config);
//   let message = messages.configuracao[response];
//   console.log(`ConfiguraIntSiTefInterativo: ${message}`);

//   // Não continua caso tenha ocorrido algum erro durante a configuração
//   if (response !== 0) {
//     return;
//   }

//   // Verifica a presença do PinPad
//   response = await sitef.verificarPresenca();
//   message = messages.verificacaoPresenca[response];
//   console.log(`VerificaPresencaPinPad: ${message}`);

//   // Por fim, escreve uma mensagem no PinPad
//   response = await sitef.escreverMensagem("Lorem Ipsum");
//   message =
//     response === 0
//       ? "Mensagem escrita com sucesso."
//       : "Não foi possível escrever a mensagem.";
//   console.log(`EscreveMensagemPermanentePinPad: ${message}`);
// };

main().then(process.exit);
