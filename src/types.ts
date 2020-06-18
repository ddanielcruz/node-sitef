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
  iniciaFuncaoSiTefInterativo: (
    funcao: number,
    valor: string,
    cupomFiscal: string,
    dataFiscal: string,
    horaFiscal: string,
    operador: string,
    parametros: string
  ) => number;
  continuaFuncaoSiTefInterativo: (
    comando: number,
    tipoCampo: number,
    tamMinimo: number,
    tamMaximo: number,
    buffer: string,
    tamBuffer: number,
    continua: number
  ) => IResultadoContinuarFuncao;
  finalizaFuncaoSiTefInterativo: (
    confirma: number,
    cupomFiscal: string,
    dataFiscal: string,
    horaFiscal: string,
    parametros: string
  ) => boolean;
}

export interface IParametrosConfiguracao {
  ip: string;
  loja: string;
  terminal: string;
  reservado?: string;
}

export interface IParametrosIniciarFuncao {
  funcao: number;
  valor?: string;
  cupomFiscal: string;
  dataFiscal: string;
  horaFiscal: string;
  operador: string;
  parametros?: string;
}

export interface IParametrosContinuarFuncao
  extends Omit<IResultadoContinuarFuncao, 'retorno'> {
  tamanhoBuffer: number;
  continua: number;
}

export interface IResultadoContinuarFuncao {
  retorno: number;
  comando: number;
  tipoCampo: number;
  tamMinimo: number;
  tamMaximo: number;
  buffer: string;
}

export interface IParametrosFinalizarFuncao {
  confirma: number;
  cupomFiscal: string;
  dataFiscal: string;
  horaFiscal: string;
  parametros: string;
}
