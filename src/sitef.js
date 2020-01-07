const sitef = require("bindings")("sitef");

const createPromise = handler =>
  new Promise((resolve, reject) => {
    try {
      const value = handler();
      resolve(value);
    } catch (error) {
      reject(error);
    }
  });

module.exports = class Sitef {
  constructor(caminhoDLL) {
    if (!caminhoDLL) {
      throw new Error("Informe a DLL do Sitef.");
    }

    sitef.carregarDLL(caminhoDLL);
  }

  configurar({ ip, idLoja, idTerminal, reservado }) {
    return createPromise(() =>
      sitef.configuraIntSiTefInterativo(ip, idLoja, idTerminal, reservado)
    );
  }

  verificarPresenca() {
    return createPromise(() => sitef.verificaPresencaPinPad());
  }

  escreverMensagem(mensagem) {
    return createPromise(() =>
      sitef.escreveMensagemPermanentePinPad(mensagem || "")
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
      sitef.iniciaFuncaoSiTefInterativo(
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
      sitef.continuaFuncaoSiTefInterativo(
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
      sitef.finalizaFuncaoSiTefInterativo(
        confirma,
        cupomFiscal,
        dataFiscal,
        horaFiscal,
        parametros
      )
    );
  }

  leSimNaoPinPad(mensagem) {
    return createPromise(() => sitef.leSimNaoPinPad(mensagem));
  }
};
