import { RawPartner, VatRate } from 'lib/types';
import deepClone from 'lib/deepclone';
import getVatRate from 'lib/tax/rate';

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

describe('get vat rate', () => {
  test('hu individual / non vat subject', () => {
      const order = deepClone(partner);

      order.companyName = '';
      order.taxNumber = '0';
      order.countryCode = 'HU';

      const vatRate = getVatRate(order);
      expect(vatRate).toBe(VatRate.Regular);
  });

  test('hu vat subject', () => {
    const order = deepClone(partner);

    order.companyName = 'HU Company Kft';
    order.countryCode = 'HU';
    order.taxNumber = '12312412';

    const vatRate = getVatRate(order);
    expect(vatRate).toBe(VatRate.Regular);
  });

  test('eu individual / non vat subject', () => {
    const order = deepClone(partner);
    order.companyName = '';
    order.taxNumber = '0';
    order.countryCode = 'DE';

    const vatRate = getVatRate(order);
    expect(vatRate).toBe(VatRate.Regular);
  });

  test('eu vat subject', () => {
    const order = deepClone(partner);

    order.companyName = 'EU Company Gmbh';
    order.taxNumber = '123112';
    order.countryCode = 'DE';

    const vatRate = getVatRate(order);
    expect(vatRate).toBe(VatRate.TEHK);
  });

  test('non-eu individual / non vat subject', () => {
    const order = deepClone(partner);

    order.companyName = '';
    order.taxNumber = '0';
    order.countryCode = 'US';

    const vatRate = getVatRate(order);
    expect(vatRate).toBe(VatRate.Regular);
  });

  test('non-eu vat subject', () => {
    const order = deepClone(partner);

    order.companyName = 'NonEu Company Ltd';
    order.taxNumber = '12312412';
    order.countryCode = 'US';

    const vatRate = getVatRate(order);
    expect(vatRate).toBe(VatRate.TEHK);
  });
});
