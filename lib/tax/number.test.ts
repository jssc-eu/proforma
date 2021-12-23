import getTaxNumber from 'lib/tax/number';

const partner = {
  orderReference: 'K0DF',
  companyName: 'Teszt Company GMBH',
  name: 'Szabolcs Szabolcsi-Toth',
  address: 'Andrássy út 39\r\nIBM Magyarország Kft',
  city: 'Budapest',
  state: 'Budapest',
  zip: '1061',
  countryCode: 'DE',
  taxNumber: '234536',
};


describe('get tax number', () => {
  test('no tax id', () => {
      const order = JSON.parse(JSON.stringify(partner));

      order.taxNumber = null;
      delete order.taxNumber;

      const taxNumber = getTaxNumber(order);
      expect(taxNumber).toBe('');
  });

  test('zero tax id', () => {
    const order = JSON.parse(JSON.stringify(partner));

    order.taxNumber = '0';

    const taxNumber = getTaxNumber(order);
    expect(taxNumber).toBe('');
  });

  test('provided tax id', () => {
    const order = JSON.parse(JSON.stringify(partner));

    order.taxNumber = 'HU21343647';

    const taxNumber = getTaxNumber(order);
    expect(taxNumber).toBe('HU21343647');
  });
});
