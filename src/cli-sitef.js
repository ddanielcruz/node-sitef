const sitefLib = require("bindings")("nodesitef");

const createPromise = handler => {
  return new Promise((resolve, reject) => {
    try {
      const value = handler();
      resolve(value);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = class CliSiTef {
  constructor(path) {
    if (!path) {
      throw new Error("Informe o caminho absoluto para a DLL do SiTef.");
    }

    sitefLib.carregarDLL(path);
  }

  teste({ ip, loja, terminal, reservado }) {
    return sitefLib.teste(ip, loja, terminal, reservado)
  }

  configurar({ ip, loja, terminal, reservado }) {
    return createPromise(() =>
      sitefLib.configuraIntSiTefInterativo(ip, loja, terminal, reservado)
    );
  }

  verificarPresenca() {
    return createPromise(() => sitefLib.verificaPresencaPinPad());
  }

  escreverMensagem(mensagem) {
    return createPromise(() =>
      sitefLib.escreveMensagemPermanentePinPad(mensagem || "")
    );
  }

  iniciarFuncao({
    funcao,
    valor,
    cupomFiscal,
    dataFiscal,
    horaFiscal,
    operador,
    parametros
  }) {
    return createPromise(() =>
      sitefLib.iniciaFuncaoSiTefInterativo(
        funcao,
        valor || "",
        cupomFiscal,
        dataFiscal,
        horaFiscal,
        operador,
        parametros || ""
      )
    );
  }

  continuarFuncao({
    comando,
    tipoCampo,
    tamMinimo,
    tamMaximo,
    buffer,
    tamBuffer,
    continua
  }) {
    return createPromise(() =>
      sitefLib.continuaFuncaoSiTefInterativo(
        comando,
        tipoCampo,
        tamMinimo,
        tamMaximo,
        buffer,
        tamBuffer,
        continua
      )
    );
  }

  finalizarFuncao({
    confirma,
    cupomFiscal,
    dataFiscal,
    horaFiscal,
    parametros
  }) {
    return createPromise(() =>
      sitefLib.finalizaFuncaoSiTefInterativo(
        confirma,
        cupomFiscal,
        dataFiscal,
        horaFiscal,
        parametros
      )
    );
  }

  leSimNaoPinPad(mensagem) {
    return createPromise(() => sitefLib.leSimNaoPinPad(mensagem));
  }
};
