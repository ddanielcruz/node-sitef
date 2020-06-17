require('dotenv/config');

module.exports = {
  ip: process.env.SITEF_IP || '0.0.0.0',
  loja: process.env.SITEF_LOJA || '00000000',
  terminal: process.env.SITEF_TERMINAL || '00000000',
  reservado: process.env.SITEF_RESERVADO || '',
};
