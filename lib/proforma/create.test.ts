import { promisify } from 'util';
import fs from 'fs';
import yaml from 'yaml';
import szamlazz from '@jssc/szamlazz.js';
import create from './create';

jest.mock('@jssc/szamlazz.js');

const readFile = promisify(fs.readFile);
const order = {

  partner: {
    name: 'Szabolcs Szabolcsi-Toth',
    email: 'neccccc@gmail.com',
    address: 'Andrássy út 39\r\nUSTREAM Magyarország Kft',
    city: 'Budapest',
    state: 'Budapest',
    zip: '1061',
    countryCode: 'DE',
    taxNumber: '234536',
    companyName: 'Teszt Company GMBH',
  },
  lineItems: [
    {
      quantity: 2,
      price: 205.0,
      title: 'Early Bird',
      isOnlineService: false,
    },
    {
      quantity: 1,
      price: 0,
      title: 'Free ticket',
      isOnlineService: false,
    },
    {
      quantity: 1,
      price: 300,
      title: 'Early Workshop ticket',
      isOnlineService: false,
    },
    {
      quantity: 1,
      price: 450,
      title: 'Early Double ticket',
      isOnlineService: false,
    },
    {
      quantity: 1,
      price: 150,
      title: 'Online admission ticket',
      isOnlineService: true,
    },
  ],
};


describe('create proforma', () => {
  test('szamlazz proforma invoked with proper params', async () => {
      const file = await readFile('./test-config.yaml', 'utf8');
      const config = (yaml.parse(file)).events['integration-test-event-2022'];

      await create(
        order,
        config,
        szamlazz.Seller,
        szamlazz.Buyer,
        szamlazz.Item,
        szamlazz.Invoice
      );

      const invoice = szamlazz.Invoice.mock.calls[0][0];

      expect(invoice.paymentMethod.value).toBe('Átutalás');
      expect(invoice.currency.value).toBe('EUR');
      expect(invoice.language.value).toBe('en');
      expect(invoice.proforma).toBe(true);
      expect(invoice.paid).toBe(false);
  });
});
