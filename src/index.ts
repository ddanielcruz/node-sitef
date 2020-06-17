import bindings from 'bindings';

import {
  ILibrary,
  IParametrosConfiguracao,
  IParametrosIniciarFuncao,
  IParametrosContinuarFuncao,
  IParametrosFinalizarFuncao,
  IResultadoContinuarFuncao,
} from './types';
import { createPromise } from './utils';

const library: ILibrary = bindings('node-sitef');

export default class SiTef {
  constructor(path: string) {
    if (!path) {
      throw new Error('Informe o caminho para as DLLs do SiTef.');
    }

    const result = library.carregarDLL(path);
    if (!result) {
      throw new Error('Não foi possível carregar as DLLs do SiTef.');
    }
  }

  configurar(parametros: IParametrosConfiguracao): Promise<number> {
    const { ip, loja, terminal, reservado } = parametros;

    return createPromise<number>(() => {
      return library.configuraIntSiTefInterativo(
        ip,
        loja,
        terminal,
        reservado || ''
      );
    });
  }

  verificarPresenca(): Promise<number> {
    return createPromise<number>(() => {
      return library.verificaPresencaPinPad();
    });
  }

  escreverMensagem(mensagem: string): Promise<number> {
    return createPromise<number>(() => {
      return library.escreveMensagemPermanentePinPad(mensagem);
    });
  }

  leSimNaoPinPad(mensagem: string): Promise<number> {
    return createPromise<number>(() => {
      return library.leSimNaoPinPad(mensagem);
    });
  }

  iniciarFuncao(parametros: IParametrosIniciarFuncao): Promise<number> {
    return createPromise<number>(() => {
      return library.iniciaFuncaoSiTefInterativo(
        parametros.funcao,
        parametros.valor || '',
        parametros.cupomFiscal,
        parametros.dataFiscal,
        parametros.horaFiscal,
        parametros.operador,
        parametros.parametros || ''
      );
    });
  }

  continuarFuncao(
    parametros: IParametrosContinuarFuncao
  ): Promise<IResultadoContinuarFuncao> {
    return createPromise<IResultadoContinuarFuncao>(() => {
      return library.continuaFuncaoSiTefInterativo(
        parametros.comando,
        parametros.tipoCampo,
        parametros.tamMinimo,
        parametros.tamMaximo,
        parametros.buffer,
        parametros.tamanhoBuffer,
        parametros.continua
      );
    });
  }

  finalizarFuncao(parametros: IParametrosFinalizarFuncao): Promise<boolean> {
    return createPromise<boolean>(() => {
      return library.finalizaFuncaoSiTefInterativo(
        parametros.confirma,
        parametros.cupomFiscal,
        parametros.dataFiscal,
        parametros.horaFiscal,
        parametros.parametros
      );
    });
  }
}
