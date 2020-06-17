import bindings from 'bindings';
import {
  ILibrary,
  IParametrosConfiguracao,
  IParametrosIniciarFuncao,
  IParametrosContinuarFuncao,
  IParametrosFinalizarFuncao,
  IResultadoContinuarFuncao,
} from './types';

export default class SiTef {
  private library: ILibrary = bindings('node-sitef');

  constructor(path: string) {
    if (!path) {
      throw new Error('Informe o caminho para as DLLs do SiTef.');
    }

    const result = this.library.carregarDLL(path);
    if (!result) {
      throw new Error('Não foi possível carregar as DLLs do SiTef.');
    }
  }

  configurar = (parametros: IParametrosConfiguracao): Promise<number> => {
    const { ip, loja, terminal, reservado } = parametros;

    return this.criarPromise<number>(() => {
      return this.library.configuraIntSiTefInterativo(
        ip,
        loja,
        terminal,
        reservado || ''
      );
    });
  };

  verificarPresenca = (): Promise<number> => {
    return this.criarPromise<number>(() => {
      return this.library.verificaPresencaPinPad();
    });
  };

  escreverMensagem = (mensagem: string): Promise<number> => {
    return this.criarPromise<number>(() => {
      return this.library.escreveMensagemPermanentePinPad(mensagem);
    });
  };

  leSimNaoPinPad = (mensagem: string): Promise<number> => {
    return this.criarPromise<number>(() => {
      return this.library.leSimNaoPinPad(mensagem);
    });
  };

  iniciarFuncao = (parametros: IParametrosIniciarFuncao): Promise<number> => {
    return this.criarPromise<number>(() => {
      return this.library.iniciaFuncaoSiTefInterativo(
        parametros.funcao,
        parametros.valor || '',
        parametros.cupomFiscal,
        parametros.dataFiscal,
        parametros.horaFiscal,
        parametros.operador,
        parametros.parametros || ''
      );
    });
  };

  continuarFuncao = (
    parametros: IParametrosContinuarFuncao
  ): Promise<IResultadoContinuarFuncao> => {
    return this.criarPromise<IResultadoContinuarFuncao>(() => {
      return this.library.continuaFuncaoSiTefInterativo(
        parametros.comando,
        parametros.tipoCampo,
        parametros.tamMinimo,
        parametros.tamMaximo,
        parametros.buffer,
        parametros.tamanhoBuffer,
        parametros.continua
      );
    });
  };

  finalizarFuncao = (
    parametros: IParametrosFinalizarFuncao
  ): Promise<boolean> => {
    return this.criarPromise<boolean>(() => {
      return this.library.finalizaFuncaoSiTefInterativo(
        parametros.confirma,
        parametros.cupomFiscal,
        parametros.dataFiscal,
        parametros.horaFiscal,
        parametros.parametros
      );
    });
  };

  private criarPromise<T = void>(handler: Function) {
    return new Promise<T>((resolve, reject) => {
      try {
        const value = handler();
        resolve(value);
      } catch (error) {
        reject(error);
      }
    });
  }
}
