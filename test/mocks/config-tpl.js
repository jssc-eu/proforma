const { mainModule } = require("process");

const dedent = require('dedent')

module.exports = {
  label: 'JSConf Budapest 2021',
  date: 'September 23, 2020',
  catering: [
    {
      'ticket-name-contains': '*',
      'net-price': 90.3,
    },
  ],
  invoice: {
    "id-prefix": "JSSC",
    "logo-image": "JS-szamlazzhu.png",
    comment: dedent`
        The invoice includes mediated services.
        Paid in full.
        This document was issued electronically and is therefore valid without signature.`,
    "e-invoice": true,
    currency: "EUR",
  },
  bank: {
    name: 'Raiffeisen Bank, SWIFT: UBRTHUHB',
    accountNumber: 'HU73-1201-0659-0160-2199-0040-0002'
  }
};
