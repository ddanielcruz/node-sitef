import bindings from 'bindings';
import { ILibrary, IParametrosConfiguracao } from './types';

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
