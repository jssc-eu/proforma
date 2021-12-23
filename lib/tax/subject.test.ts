import { RawPartner } from 'lib/types';
import szamlazz from '@jssc/szamlazz.js';
import getTaxSubject from 'lib/tax/subject';

const partner: RawPartner = {
  reference: 'K0DF',
  name: 'Szabolcs Szabolcsi-Toth',
  address: 'Andrássy út 39\r\nUSTREAM Magyarország Kft',
  city: 'Budapest',
  state: 'Budapest',
  zip: '1061',
  countryCode: 'DE',
  taxNumber: '234536',
  companyName: 'Teszt Company GMBH',
};

describe('get tax subject', () => {
  test('not a tax subject', () => {
      const order: RawPartner = JSON.parse(JSON.stringify(partner));

      order.companyName = '';
      order.countryCode = 'HU';
      order.taxNumber = '0';

      const taxSubject = getTaxSubject(order);
      expect(taxSubject).toBe(szamlazz.TaxSubject.NoTaxID);
  });

  test('eu vat subject', () => {
    const order: RawPartner = JSON.parse(JSON.stringify(partner));

    order.companyName = 'EU Company';
    order.countryCode = 'EE';
    order.taxNumber = '12312412';

    const taxSubject = getTaxSubject(order);
    expect(taxSubject).toBe(szamlazz.TaxSubject.EUCompany);
  });

  test('hungarian vat subject', () => {
    const order: RawPartner = JSON.parse(JSON.stringify(partner));
    order.companyName = 'Hungarian Company';
    order.countryCode = 'HU';

    const taxSubject = getTaxSubject(order);
    expect(taxSubject).toBe(szamlazz.TaxSubject.HungarianTaxID);
  });

  test('non eu vat subject', () => {
    const order: RawPartner = JSON.parse(JSON.stringify(partner));

    order.companyName = 'USA Company';
    order.countryCode = 'US';
    order.taxNumber = '123112';

    const taxSubject = getTaxSubject(order);
    expect(taxSubject).toBe(szamlazz.TaxSubject.NonEUCompany);
  });

  test('unknown vat subject status', () => {
    const order: RawPartner = JSON.parse(JSON.stringify(partner));
    order.companyName = '';
    order.countryCode = 'EE';
    order.taxNumber = '12312412';

    const taxSubject = getTaxSubject(order);
    expect(taxSubject).toBe(szamlazz.TaxSubject.Unknown);
  });
});
