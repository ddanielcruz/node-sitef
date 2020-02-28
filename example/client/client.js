const path = require("path");
const chalk = require("chalk");
const moment = require("moment");
const CliSiTef = require("../../src/cli-sitef");

const config = require("../shared/config");
const { messages, askQuestion, handleError } = require("../shared/utils");

// Cria o objeto do SiTef
const dllPath = path.resolve(
  __dirname,
  "..",
  "shared",
  "bin",
  "libclisitef.so"
);
const sitef = new CliSiTef(dllPath);

// Funções auxiliares utilizadas para escrever no console
moment.locale("pt-BR");
const now = () => chalk.green(`[${moment().format("LTS")}]`);

// Função de configuração do SiTef (ConfiguraIntSiTefInterativo)
module.exports.configurar = async () => {
  console.log(`\n${now()} Configurando o SiTef...`);

  try {
    const response = await sitef.configurar(config);
    const message = messages.configuracao[response];
    console.log(now(), message, "\n");
  } catch (error) {
    handleError(error);
  }
};

// Função de verificação de presença do SiTef (VerificaPresencaPinPad)
module.exports.verificarPresenca = async () => {
  console.log(`\n${now()} Verificando a presença do PinPad...`);

  try {
    const response = await sitef.verificarPresenca();
    const message = messages.verificacaoPresenca[response];
    console.log(now(), message, "\n");
  } catch (error) {
    handleError(error);
  }
};

// Função de escrita de mensagem (EscreveMensagemPermanentePinPad)
module.exports.escreverMensagem = async () => {
  try {
    // Lê a mensagem que será escrita no PinPad
    const question = "Qual mensagem deseja escrever (max. 30 letras): ";
    let message = await askQuestion(chalk.yellow(question));

    // Escreve a mensagem e processa o retorno
    const response = await sitef.escreverMensagem(message);
    message =
      response === 0
        ? "Mensagem escrita com sucesso."
        : "Não foi possível escrever a mensagem.";

    console.log(`\n${now()}`, message, "\n");
  } catch (error) {
    handleError(error);
  }
};
