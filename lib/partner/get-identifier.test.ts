import { RawPartner } from 'lib/types';
import deepClone from 'lib/deepclone';

import getBuyerIdentifier from './get-identifier';

const partner: Partial<RawPartner> = {
  email: 'john.doe23@gm-ail.com',
  companyName: 'Teszt-Co. GMBH',
  taxNumber: '123456789',
};

describe('get buyer identifier', () => {
  test('buyer with vat number', async () => {
    const order = deepClone(partner);
      const identifier = await getBuyerIdentifier(order);
      expect(identifier).toBe('123456789');
  });

  test('buyer with formatted vat number', async () => {
    const order = deepClone(partner);
    order.taxNumber = '123456-7-89';

    const identifier = await getBuyerIdentifier(order);
    expect(identifier).toBe('123456789');
  });

  test('buyer with EUR vat number', async () => {
    const order = deepClone(partner);
    order.taxNumber = 'de123456789';

    const identifier = await getBuyerIdentifier(order);
    expect(identifier).toBe('DE123456789');
  });

  test('buyer with company name, no vat', async () => {
    const order = deepClone(partner);

    delete order.taxNumber;

    const identifier = await getBuyerIdentifier(order);
    expect(identifier).toBe('TESZT-CO_GMBH');
  });

  test('buyer with email, no company, no vat', async () => {
    const order = deepClone(partner);

    delete order.taxNumber;
    delete order.companyName;

    const identifier = await getBuyerIdentifier(order);
    expect(identifier).toBe('JOHN_DOE23_GM-AIL_COM');
  });
});
