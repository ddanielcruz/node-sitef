export interface ILibrary {
  carregarDLL: (path: string) => boolean;
  configuraIntSiTefInterativo: (
    ip: string,
    loja: string,
    terminal: string,
    reservado: string
  ) => number;
  verificaPresencaPinPad: () => number;
  leSimNaoPinPad: (mensagem: string) => number;
  escreveMensagemPermanentePinPad: (mensagem: string) => number;
  iniciaFuncaoSiTefInterativo: () => {};
  continuaFuncaoSiTefInterativo: () => {};
  finalizaFuncaoSiTefInterativo: () => {};
}

export interface IParametrosConfiguracao {
  ip: string;
  loja: string;
  terminal: string;
  reservado?: string;
}
