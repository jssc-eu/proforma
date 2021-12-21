import { Buyer } from 'lib/types';
import getItemizedCosts from './get-items';

const orderData = {
  id: 6050550,
  text: 'Test Usaer registered a ticket',
  event: {
    id: 1087445,
    title: 'Integration Test Event 2020',
    url: 'https://ti.to/jsconf-bp/integration-test-event-2020',
    account_slug: 'jsconf-bp',
    slug: 'integration-test-event-2020',
    start_date: null,
    end_date: null,
    metadata: null,
  },
  slug: 'pwNGuU9LWgsHaysSe7qrvOQ',
  reference: 'K0DF',
  currency: 'EUR',
  total: '133.00',
  total_less_tax: '133.00',
  name: 'Szabolcs Szabolcsi-Toth',
  first_name: 'Szabolcs',
  last_name: 'Szabolcsi-Toth',
  email: 'neccccc@gmail.com',
  phone_number: '',
  company_name: 'Teszt Company GMBH',
  discount_code: null,
  payment_reference: null,
  created_at: '2019-12-18T07:52:21.000Z',
  created_date: '2019-12-18',
  completed_at: '2019-12-18T07:52:35.665Z',
  completed_date: '2019-12-18',
  custom: '',
  metadata: null,
  updated_at: '2019-12-18T07:52:35.750Z',
  paid: true,
  line_items: [],
  quantities: {
    qqtuetcorjg: {
      release: 'Early Bird',
      quantity: 1,
    },
  },
  tickets: [
  ],
  payment: {
    reference: null,
    type: 'redirect',
  },
  receipt: {
    number: '0000041',
    total: '133.00',
    tax: 0,
    total_less_tax: '133.00',
    payment_provider: 'PayPal',
    payment_reference: null,
    paid: true,
  },
  billing_address: {
    address: 'Andrássy út 39\r\nUSTREAM Magyarország Kft',
    city: 'Budapest',
    state_province_region: 'Budapest',
    zip_postal_code: '1061',
    country: 'DE',
    country_name: 'Germany',
    vat_number: '234536',
    company_name: 'Teszt Company GMBH',
  },
};

const tickets = [
  {
    _type: 'line_item',
    id: 6540964,
    title: 'Early Bird',
    created_at: '2019-12-08T21:08:04.000+01:00',
    updated_at: '2019-12-08T21:08:04.000+01:00',
    quantity: 2,
    price: 205.0,
    test_mode: true,
    release_id: 1219124,
    release_slug: 'qqtuetcorjg',
    release_title: 'Early Bird',
    release: {
      metadata: {
         "online-service": false
      }
    },
  },
  {
    _type: 'line_item',
    id: 6540964,
    title: 'Free ticket',
    created_at: '2019-12-08T21:08:04.000+01:00',
    updated_at: '2019-12-08T21:08:04.000+01:00',
    quantity: 1,
    price: 0,
    test_mode: true,
    release_id: 1219124,
    release_slug: 'qqtuetcorjg',
    release_title: 'Free ticket',
    release: {
      metadata: {
         "online-service": false
      }
    },
  },
  {
    _type: 'line_item',
    id: 6540964,
    title: 'Early Workshop ticket',
    created_at: '2019-12-08T21:08:04.000+01:00',
    updated_at: '2019-12-08T21:08:04.000+01:00',
    quantity: 1,
    price: 300,
    test_mode: true,
    release_id: 1219124,
    release_slug: 'qqtuetcorjg',
    release_title: 'Early Workshop ticket',
    release: {
      metadata: {
         "online-service": false
      }
    },
  },
  {
    _type: 'line_item',
    id: 6540964,
    title: 'Early Double ticket',
    created_at: '2019-12-08T21:08:04.000+01:00',
    updated_at: '2019-12-08T21:08:04.000+01:00',
    quantity: 1,
    price: 450,
    test_mode: true,
    release_id: 1219124,
    release_slug: 'qqtuetcorjg',
    release_title: 'Early Double ticket',
    release: {
      metadata: {
         "online-service": false
      }
    },
  },
  {
    _type: 'line_item',
    id: 6540964,
    title: 'Online admission',
    created_at: '2019-12-08T21:08:04.000+01:00',
    updated_at: '2019-12-08T21:08:04.000+01:00',
    quantity: 1,
    price: 150,
    test_mode: true,
    release_id: 1219124,
    release_slug: 'qqtuetcorjg',
    release_title: 'Online admission ticket',
    release: {
      metadata: {
         "online-service": true
      }
    },
  },
];

const testEvents = {
  fixDateSingleCatering: {
    label: 'JSConf Budapest 2021',
    date: 'September 23, 2020',
    catering: [
      {
        'ticket-name-contains': '*',
        'net-price': 90.3,
      },
    ],
  },
  multipleDatesSingleCatering: {
    label: 'JSConf Budapest 2021',
    dates: [
      {
        'ticket-name-contains': 'Workshop',
        date: 'April 8, 2020',
      },
      {
        'ticket-name-contains': '*',
        date: 'April 6-7, 2020',
      },
    ],
    catering: [
      {
        'ticket-name-contains': '*',
        'net-price': 90,
      },
    ],
  },
  fixDateMultipleCatering: {
    label: 'JSConf Budapest 2021',
    dates: [
      {
        'ticket-name-contains': '*',
        date: 'April 6-7, 2020',
      },
    ],
    catering: [
      {
        'ticket-name-contains': '*',
        'net-price': 90,
      },
      {
        'ticket-name-contains': 'Double',
        'net-price': 180,
      },
    ],
  },
  multipleDateMultipleCatering: {
    label: 'JSConf Budapest 2021',
    dates: [
      {
        'ticket-name-contains': 'Workshop',
        date: 'April 8, 2020',
      },
      {
        'ticket-name-contains': '*',
        date: 'April 6-7, 2020',
      },
    ],
    catering: [
      {
        'ticket-name-contains': '*',
        'net-price': 90,
      },
      {
        'ticket-name-contains': 'Double',
        'net-price': 180,
      },
      {
        'ticket-name-contains': 'Workshop',
        'net-price': 45,
      },
      {
        'ticket-name-contains': 'Online',
        'net-price': 0,
      },
    ],
  },
  multipleDateFreeCatering: {
    label: 'JSConf Budapest 2021',
    dates: [
      {
        'ticket-name-contains': 'Workshop',
        date: 'April 8, 2020',
      },
      {
        'ticket-name-contains': '*',
        date: 'April 6-7, 2020',
      },
    ],
    catering: [
      {
        'ticket-name-contains': '*',
        'net-price': 90,
      },
      {
        'ticket-name-contains': 'Double',
        'net-price': 180,
      },
      {
        'ticket-name-contains': 'Online',
        'net-price': 0,
      },
    ],
  },
  fixDateFreeCatering: {
    label: 'JSConf Budapest 2021',
    dates: [
      {
        'ticket-name-contains': '*',
        date: 'April 6-7, 2020',
      },
    ],
    catering: [
      {
        'ticket-name-contains': '*',
        'net-price': 90,
      },
      {
        'ticket-name-contains': 'Double',
        'net-price': 180,
      },
      {
        'ticket-name-contains': 'Online',
        'net-price': 0,
      },
    ],
  },
};


const buyerData: Buyer = {
  name: 'buyerName',
  email: 'email',
  sendEmail: true,
  country: 'HU',
  taxNumber: '1324',
  taxSubject: 7,
  zip: '123',
  city: 'City',
  address: 'addressWithState',
  postAddress: {
    name: 'buyerName',
    zip: '123',
    city: 'City',
    address: 'addressWithState',
  },
  identifier: "1",
  phone: '',
  issuerName: 'name',
  isTEHK: false,
};

const deepClone = data => JSON.parse(JSON.stringify(data));

describe('catering', () => {
  test('create 2 items or every ticket type', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[0]];

    const items = getItemizedCosts(order, buyerData, testEvents.fixDateSingleCatering);
    expect(items).toHaveLength(2);
  });

  test('item names and comments are correct', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[0]];

    const items = getItemizedCosts(order, buyerData, testEvents.fixDateSingleCatering);
    expect(items[0].label).toBe('Early Bird');
    expect(items[0].comment).toBe('Ticket for JSConf Budapest 2021, September 23, 2020');
    expect(items[1].label).toBe('Mediated services');
    expect(items[1].comment).toBe('Conference catering fee');
  });

  test('rounds prices to 2 digits', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[0]];

    const items = getItemizedCosts(order, buyerData, testEvents.fixDateSingleCatering);

    expect(items[0].grossUnitPrice.toString().split('.')[1].length).toBeLessThanOrEqual(2);
    expect(items[1].grossUnitPrice.toString().split('.')[1].length).toBeLessThanOrEqual(2);
  });

  test('rounding without errors', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[0]];

    const items = getItemizedCosts(order, buyerData, testEvents.fixDateSingleCatering);

    expect((items[0].grossUnitPrice + items[1].grossUnitPrice)).toBe(205);
  });

  test('skip catering item if its free', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[0], tickets[4]];

    const items = getItemizedCosts(order, buyerData, testEvents.fixDateFreeCatering);

    expect(items).toHaveLength(3);
    expect(items[2].grossUnitPrice).toBe(150);
  });

  test('skip items if they are free', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[1], tickets[4]];

    const items = getItemizedCosts(order, buyerData, testEvents.fixDateFreeCatering);

    expect(items).toHaveLength(1);
    expect(items[0].grossUnitPrice).toBe(150);
  });

  test('multiple orders with different catering', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[0], tickets[3]];

    const items = getItemizedCosts(order, buyerData, testEvents.fixDateMultipleCatering);

    expect((items[0].grossUnitPrice + items[1].grossUnitPrice)).toBe(205);
    expect((items[2].grossUnitPrice + items[3].grossUnitPrice)).toBe(450);
  });
});

describe('event date', () => {
  test('determines date according to ticket name', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[2]];

    const items = getItemizedCosts(order, buyerData, testEvents.fixDateSingleCatering);

    expect(items).toHaveLength(2);
    expect(items[0].label).toBe('Early Workshop ticket');
    expect(items[0].comment).toBe('Ticket for JSConf Budapest 2021, September 23, 2020');
    expect(items[1].label).toBe('Mediated services');
    expect(items[1].comment).toBe('Conference catering fee');
  });

  test('multiple orders with different date', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[0], tickets[2]];

    const items = getItemizedCosts(order, buyerData, testEvents.multipleDateMultipleCatering);

    expect(items).toHaveLength(4);
    expect(items[0].comment).toBe('Ticket for JSConf Budapest 2021, April 6-7, 2020');
    expect(items[2].comment).toBe('Ticket for JSConf Budapest 2021, April 8, 2020');
  });
});

describe('VAT TEHK type', () => {
  test('HU without VAT', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[0]];

    const buyer = deepClone(buyerData);

    buyer.isTEHK = false;

    const items = getItemizedCosts(order, buyer, testEvents.fixDateSingleCatering);

    expect(items[0].vat).toBe(27);
    expect(items[1].vat).toBe(27);
  });

  test('HU with VAT', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[0], tickets[2]];

    const buyer = deepClone(buyerData);

    buyer.isTEHK = false;

    const items = getItemizedCosts(order, buyer, testEvents.multipleDateMultipleCatering);

    expect(items[0].vat).toBe(27);
    expect(items[1].vat).toBe(27);
  });

  test('EU without VAT', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[0], tickets[2]];

    const buyer = deepClone(buyerData);

    buyer.isTEHK = false;

    const items = getItemizedCosts(order, buyer, testEvents.multipleDateMultipleCatering);

    expect(items[0].vat).toBe(27);
    expect(items[1].vat).toBe(27);
  });

  test('EU with VAT', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[0], tickets[2]];

    const buyer = deepClone(buyerData);

    buyer.isTEHK = true;

    const items = getItemizedCosts(order, buyer, testEvents.multipleDateMultipleCatering);

    expect(items[0].vat).toBe(27);
    expect(items[1].vat).toBe(27);
    expect(items[2].vat).toBe(27);
    expect(items[3].vat).toBe(27);
  });

  test('EU Online Service with VAT', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[0], tickets[2], tickets[4]];

    const buyer = deepClone(buyerData);

    buyer.isTEHK = true;

    const items = getItemizedCosts(order, buyer, testEvents.multipleDateMultipleCatering);

    expect(items[0].vat).toBe(27);
    expect(items[1].vat).toBe(27);
    expect(items[2].vat).toBe(27);
    expect(items[3].vat).toBe(27);
    expect(items[4].vat).toBe('TEHK');
  });

  test('outside EU without VAT', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[0], tickets[2]];

    const buyer = deepClone(buyerData);

    buyer.isTEHK = false;

    const items = getItemizedCosts(order, buyer, testEvents.multipleDateMultipleCatering);

    expect(items[0].vat).toBe(27);
    expect(items[1].vat).toBe(27);
  });

  test('outside EU with VAT', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[0], tickets[2]];

    const buyer = deepClone(buyerData);

    buyer.isTEHK = false;

    const items = getItemizedCosts(order, buyer, testEvents.multipleDateMultipleCatering);

    expect(items[0].vat).toBe(27);
    expect(items[1].vat).toBe(27);
  });

  test('outside EU Online Service with VAT', () => {
    const order = deepClone(orderData);
    order.line_items = [tickets[0], tickets[4]];

    const buyer = deepClone(buyerData);

    buyer.isTEHK = false;

    const items = getItemizedCosts(order, buyer, testEvents.multipleDateMultipleCatering);

    expect(items[0].vat).toBe(27);
    expect(items[1].vat).toBe(27);
    expect(items[2].vat).toBe(27);

  });
});


