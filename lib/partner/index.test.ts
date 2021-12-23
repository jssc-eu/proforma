
import { RawPartner } from 'lib/types';
import deepClone from 'lib/deepclone';
import getPartner from '.';

const partner:RawPartner = {
  name: 'Szabolcs Szabolcsi-Toth',
  email: 'neccccc@gmail.com',
  address: 'Andrássy út 39\r\nUSTREAM Magyarország Kft',
  city: 'Budapest',
  state: 'Budapest',
  zip: '1061',
  countryCode: 'DE',
  taxNumber: '234536',
  companyName: 'Teszt Company GMBH',
};

describe('get buyer', () => {
  test('buyer with vat number', async () => {
      const buyer = await getPartner(partner);
      expect(buyer.taxNumber).toBe('234536');
  });

  test('buyer without vat number', async () => {
    const order2 = { ...partner };
    order2.taxNumber = '0';

    const buyer = await getPartner(order2);
    expect(buyer.taxNumber).toBe('');
  });
});


describe('buyer VAT TEHK type', () => {
  test('HU without VAT', async () => {
    const orderData = deepClone(partner);

    orderData.companyName = '';
    orderData.countryCode = 'HU';
    orderData.taxNumber = '0';

    const buyer = await getPartner(orderData);

    expect(buyer.isTEHK).toBe(false);
  });

  test('HU with VAT', async () => {
    const orderData = deepClone(partner);

    orderData.companyName = 'Cegnev KFt';
    orderData.countryCode = 'HU';
    orderData.taxNumber = 'HU12345678';

    const buyer = await getPartner(orderData);

    expect(buyer.isTEHK).toBe(false);
  });

  test('EU without VAT', async () => {
    const orderData = deepClone(partner);

    orderData.companyName = '';
    orderData.countryCode = 'DE';
    orderData.taxNumber = '0';

    const buyer = await getPartner(orderData);

    expect(buyer.isTEHK).toBe(false);
  });

  test('EU with VAT', async () => {
    const orderData = deepClone(partner);

    orderData.companyName = 'SinnerSchrader Deutschland GmbH';
    orderData.countryCode = 'DE';
    orderData.taxNumber = 'DE812160091';

    const buyer = await getPartner(orderData);

    expect(buyer.isTEHK).toBe(true);
  });

  test('outside EU without VAT', async () => {
    const orderData = deepClone(partner);

    orderData.companyName = '';
    orderData.countryCode = 'US';
    orderData.taxNumber = '0';

    const buyer = await getPartner(orderData);

    expect(buyer.isTEHK).toBe(false);
  });

  test('outside EU with VAT', async () => {
    const orderData = deepClone(partner);

    orderData.companyName = 'Company Ltd';
    orderData.countryCode = 'US';
    orderData.taxNumber = '13245345';

    const buyer = await getPartner(orderData);

    expect(buyer.isTEHK).toBe(false);
  });
});
