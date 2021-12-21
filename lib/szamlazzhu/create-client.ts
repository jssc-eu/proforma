import szamlazz from '@jssc/szamlazz.js';

export default (config: any, authToken: string) => new szamlazz.Client({
  authToken,
  eInvoice: config.invoice['e-invoice'],
});
