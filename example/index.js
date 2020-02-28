const path = require("path");

const CliSiTef = require("../src/cli-sitef");
const config = require("./config");

// Cria o objeto do SiTef
const dllPath = path.resolve(__dirname, "bin", "libclisitef.so");
const sitef = new CliSiTef(dllPath);

const main = async () => {
  // Configura o SiTef. Em caso de sucesso deve ser retornado zero
  let response = await sitef.configurar(config);
  console.log(`ConfiguraIntSiTefInterativo: ${response}`);

  // Não continua caso tenha ocorrido algum erro durante a configuração
  if (response !== 0) {
    return;
  }

  // Verifica a presença do PinPad
  response = await sitef.verificarPresenca();
  console.log(`VerificaPresencaPinPad: ${response}`);

  // Por fim, escreve uma mensagem no PinPad
  response = await sitef.escreverMensagem("I'm watching you");
  console.log(`EscreveMensagemPermanentePinPad: ${response}`);
};

main().then(process.exit);
