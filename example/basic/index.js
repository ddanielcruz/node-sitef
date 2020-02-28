const path = require("path");

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

const main = async () => {
  // Configura o SiTef. Em caso de sucesso deve ser retornado zero
  let response = await sitef.configurar(config);
  let message = messages.configuracao[response];
  console.log(`ConfiguraIntSiTefInterativo: ${message}`);

  // Não continua caso tenha ocorrido algum erro durante a configuração
  if (response !== 0) {
    return;
  }

  // Verifica a presença do PinPad
  response = await sitef.verificarPresenca();
  message = messages.verificacaoPresenca[response];
  console.log(`VerificaPresencaPinPad: ${message}`);

  // Por fim, escreve uma mensagem no PinPad
  response = await sitef.escreverMensagem("Lorem Ipsum");
  message =
    response === 0
      ? "Mensagem escrita com sucesso."
      : "Não foi possível escrever a mensagem.";
  console.log(`EscreveMensagemPermanentePinPad: ${message}`);
};

main().then(process.exit);
