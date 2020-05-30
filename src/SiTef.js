const bindings = require('bindings');
const library = bindings('node-sitef');

// Helper function to wrap SiTef C++ functions which are sync
const createPromise = (handler) => {
  return new Promise((resolve, reject) => {
    try {
      const value = handler();
      resolve(value);
    } catch (error) {
      reject(error);
    }
  });
};

// This class is basically a wrapper of C++ module. The entire portability of the DLLs are in lib folder.
class SiTef {
  constructor(path) {
    if (!path) {
      throw new Error('Informe o caminho para as DLLs do SiTef.');
    }

    library.carregarDLL(path);
  }

  configurar({ ip, loja, terminal, reservado }) {
    return createPromise(() => {
      return library.configuraIntSiTefInterativo(ip, loja, terminal, reservado);
    });
  }

  verificarPresenca() {
    return createPromise(() => {
      return library.verificaPresencaPinPad();
    });
  }

  escreverMensagem(mensagem = '') {
    return createPromise(() =>
      library.escreveMensagemPermanentePinPad(mensagem)
    );
  }

  iniciarFuncao({
    funcao,
    valor = '',
    cupomFiscal,
    dataFiscal,
    horaFiscal,
    operador,
    parametros = '',
  }) {
    return createPromise(() => {
      return library.iniciaFuncaoSiTefInterativo(
        funcao,
        valor,
        cupomFiscal,
        dataFiscal,
        horaFiscal,
        operador,
        parametros
      );
    });
  }

  continuarFuncao({
    comando,
    tipoCampo,
    tamMinimo,
    tamMaximo,
    buffer,
    tamBuffer,
    continua,
  }) {
    return createPromise(() => {
      return library.continuaFuncaoSiTefInterativo(
        comando,
        tipoCampo,
        tamMinimo,
        tamMaximo,
        buffer,
        tamBuffer,
        continua
      );
    });
  }

  finalizarFuncao({
    confirma,
    cupomFiscal,
    dataFiscal,
    horaFiscal,
    parametros,
  }) {
    return createPromise(() => {
      return library.finalizaFuncaoSiTefInterativo(
        confirma,
        cupomFiscal,
        dataFiscal,
        horaFiscal,
        parametros
      );
    });
  }

  leSimNaoPinPad(mensagem) {
    return createPromise(() => {
      return library.leSimNaoPinPad(mensagem);
    });
  }
}

module.exports = SiTef;
