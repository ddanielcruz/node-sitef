import 'dotenv/config';
import { IParametrosConfiguracao } from '../../../src/types';

const config: IParametrosConfiguracao = {
  ip: process.env.SITEF_IP || '0.0.0.0',
  loja: process.env.SITEF_LOJA || '00000000',
  terminal: process.env.SITEF_TERMINAL || '00000000',
  reservado: process.env.SITEF_RESERVADO || '',
  parametrosAdicionais: process.env.SITEF_RESERVADO || '[79637801000112;70362733000151]',
};

export default config;
