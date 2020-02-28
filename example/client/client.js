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
    let message = await askQuestion(question);

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

const criaObjetoFuncao = (funcao, valor) => ({
  funcao: parseInt(funcao),
  valor: parseFloat(valor)
    .toFixed(2)
    .replace(".", ","),
  cupomFiscal: "12345678",
  dataFiscal: moment().format("YYYYMMDD"),
  horaFiscal: moment().format("HHmm"),
  operador: "Teste",
  parametros: "[10;11;12;13;14;19;20;28;29;31;32;33;34;35;36]"
});

module.exports.simularFuncao = async () => {
  let bufferRetorno = "";

  try {
    // Lê a função e o valor da função
    const funcao = await askQuestion("Qual a função? ");
    const valor = await askQuestion("Qual o valor? ");

    // Inicia a função
    console.log(`\n${now()} Iniciando a função...\n`);

    // Envia o objeto contendo os dados da função. Esses dados são específicos do SiTef que estou utilizando,
    // então fique a vontade para alterar os parâmetros
    const objFuncao = criaObjetoFuncao(funcao, valor);
    let retorno = await sitef.iniciarFuncao(objFuncao);

    // Objeto contendo os retornos do SiTef que devem ser passados para função de continuação
    let tefMessage = {
      comando: 0,
      tipoCampo: 0,
      tamMinimo: 0,
      tamMaximo: 0,
      buffer: "",
      tamBuffer: 0,
      continua: 0
    };

    // Inicia o ciclo da função, conforme descrito na documentação
    while (retorno === 10000) {
      // Chama a função de continuação da função e finaliza o ciclo caso o retorno seja inválido
      const continua = await sitef.continuarFuncao(tefMessage);
      if (!continua) break;

      const { comando: cmd, buffer, retorno: ret } = continua;
      retorno = ret;

      // Escreve as mensagens de retorno e de buffer, caso retornado alguma
      console.log(
        now(),
        messages.funcao[ret] || `Retorno desconhecido (${ret})`,
        buffer ? "" : "\n"
      );
      if (buffer) console.log(now(), buffer, "\n");

      // Limpa ou escreve no buffer, dependendo do comando
      if ([20, 21].includes(cmd) || (cmd >= 30 && cmd <= 35) || cmd === 42) {
        bufferRetorno = await askQuestion("Retorno: ");
        console.log();
      } else {
        bufferRetorno = "";
      }

      // Por fim, atualiza os parâmetros da continuação para continuar o ciclo
      tefMessage = {
        ...tefMessage,
        ...continua,
        buffer: bufferRetorno,
        tamBuffer: bufferRetorno.length
      };
    }

    // Por fim, finaliza a função
    const objFinalizacao = {
      ...objFuncao,
      confirma: 1,
      parametros: ""
    };
    await sitef.finalizarFuncao(objFinalizacao);

    const message = messages.funcao[retorno];
    console.log(now(), message, "\n");
  } catch (error) {
    handleError(error);
  }
};
