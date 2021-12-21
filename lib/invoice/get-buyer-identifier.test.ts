import getBuyerIdentifier from './get-buyer-identifier';

const orderData = {
  email: 'john.doe23@gm-ail.com',
  company_name: 'Teszt-Co. GMBH',
  billing_address: {
    vat_number: '123456789',
    company_name: 'Teszt-Co. GMBH',
  },
};

const deepClone = data => JSON.parse(JSON.stringify(data));

describe('get buyer identifier', () => {
  test('buyer with vat number', async () => {
    const order = deepClone(orderData);
      const identifier = await getBuyerIdentifier(order);
      expect(identifier).toBe('123456789');
  });

  test('buyer with formatted vat number', async () => {
    const order = deepClone(orderData);
    order.billing_address.vat_number = '123456-7-89';

    const identifier = await getBuyerIdentifier(order);
    expect(identifier).toBe('123456789');
  });

  test('buyer with EUR vat number', async () => {
    const order = deepClone(orderData);
    order.billing_address.vat_number = 'de123456789';

    const identifier = await getBuyerIdentifier(order);
    expect(identifier).toBe('DE123456789');
  });

  test('buyer with company name, no vat', async () => {
    const order = deepClone(orderData);

    delete order.billing_address.vat_number;

    const identifier = await getBuyerIdentifier(order);
    expect(identifier).toBe('TESZT-CO_GMBH');
  });

  test('buyer with email, no company, no vat', async () => {
    const order = deepClone(orderData);

    delete order.billing_address.vat_number;
    delete order.billing_address.company_name;
    delete order.company_name;

    const identifier = await getBuyerIdentifier(order);
    expect(identifier).toBe('JOHN_DOE23_GM-AIL_COM');
  });
});
