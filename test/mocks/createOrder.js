const orderTemplate = require('./order-tpl')
const deepClone = data => JSON.parse(JSON.stringify(data));

const ticketTypes = {
  ["tickets"]: [
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
    }
  ],
  ["workshops-tickets"]: [
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
    },
    {
      _type: 'line_item',
      id: 6540964,
      title: 'Some Workshop',
      created_at: '2019-12-08T21:08:04.000+01:00',
      updated_at: '2019-12-08T21:08:04.000+01:00',
      quantity: 2,
      price: 80.0,
      test_mode: true,
      release_id: 1219124,
      release_slug: 'qqtuetcorjg',
      release_title: 'Some Workshop',
    }
  ],
  ["online-tickets"]: [
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

    },
    {
      _type: 'line_item',
      id: 6540964,
      title: 'Online seat',
      created_at: '2019-12-08T21:08:04.000+01:00',
      updated_at: '2019-12-08T21:08:04.000+01:00',
      quantity: 2,
      price: 80.0,
      test_mode: true,
      release_id: 1219124,
      release_slug: 'qqtuetcorjg',
      release_title: 'Online seat',
      release: {
        metadata: {
           "online-service": true
        }
      },
    }
  ],
}

const buyerTypes = {
  ["hu-company"]: {
    address: 'Andrássy út 39',
    city: 'Budapest',
    state_province_region: 'Budapest',
    zip_postal_code: '1061',
    country: 'HU',
    country_name: 'Hungary',
    vat_number: 'HU25966330',
    company_name: 'Teszt Kft',
  },
  ["hu-person"]: {
    address: 'Kiraly u 56',
    city: 'Budapest',
    state_province_region: 'Budapest',
    zip_postal_code: '1061',
    country: 'HU',
    country_name: 'Hungary',
    vat_number: '0',
    company_name: '',
  },
  ["eu-company"]: {
    address: 'Völckersstr. 38',
    city: 'Hamburg',
    state_province_region: 'Hamburg',
    zip_postal_code: '22765',
    country: 'DE',
    country_name: 'Germany',
    vat_number: 'DE812160091',
    company_name: 'SinnerSchrader Deutschland GmbH',
  },
  ["eu-person"]: {
    address: 'Boxhanager str 38',
    city: 'Berlin',
    state_province_region: 'Berlin',
    zip_postal_code: '22765',
    country: 'DE',
    country_name: 'Germany',
    vat_number: '0',
    company_name: '',
  },
  ["non-eu-company"]: {
    address: '239 Causeway St Fl 2',
    city: 'Boston',
    state_province_region: 'MA',
    zip_postal_code: '02114',
    country: 'US',
    country_name: 'United States',
    vat_number: '123456789',
    company_name: 'Bocoup LLC',
  },
  ["non-eu-person"]: {
    address: '239 Causeway St Fl 2',
    city: 'San Francisco',
    state_province_region: 'CA',
    zip_postal_code: '02114',
    country: 'US',
    country_name: 'United States',
    vat_number: '',
    company_name: '',
  },
}


module.exports = (buyerType, ticketType) => {
  if (!buyerTypes[buyerType] || !ticketTypes[ticketType]) throw Error(`No mock data for ${buyerType} and ${ticketType}`);

  const order = deepClone(orderTemplate)

  order.billing_address = deepClone(buyerTypes[buyerType])
  order.company_name = order.billing_address.company_name;
  order.line_items = deepClone(ticketTypes[ticketType])

  return order
}
