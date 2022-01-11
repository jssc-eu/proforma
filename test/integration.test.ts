import MockDate from 'mockdate'
import createInvoice from 'lib/invoice/create'
import createClient from 'lib/szamlazzhu/create-client'

import mockOrder from './mocks/createOrder'
import mockConfig from './mocks/createConfig'


const token = 'ABCDEFGHIJK'

beforeEach(() => {
  MockDate.set('2020-11-22')
});

afterEach(() => {
  MockDate.reset();
});

describe('vat entries', () => {

  test('HU company', async () => {
    const order = mockOrder("hu-company", "tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('HU person', async () => {
    const order = mockOrder("hu-person", "tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('EU company', async () => {
    const order = mockOrder("eu-company", "tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('EU person', async () => {
    const order = mockOrder("eu-person", "tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('Non-EU company', async () => {
    const order = mockOrder("non-eu-company", "tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('Non-EU person', async () => {
    const order = mockOrder("non-eu-person", "tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

})


describe('vat entries for online services', () => {

  test('HU company', async () => {
    const order = mockOrder("hu-company", "online-tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('HU person', async () => {
    const order = mockOrder("hu-person", "online-tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('EU company', async () => {
    const order = mockOrder("eu-company", "online-tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);

    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('EU person', async () => {
    const order = mockOrder("eu-person", "online-tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('Non-EU company', async () => {
    const order = mockOrder("non-eu-company", "online-tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('Non-EU person', async () => {
    const order = mockOrder("non-eu-person", "online-tickets")
    const config = mockConfig("single", "single")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

})

//

describe('date and catering matchers', () => {

  test('HU company with single match date', async () => {
    const order = mockOrder("hu-company", "tickets")
    const config = mockConfig("single", "single-match")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('EU company with  single match date', async () => {
    const order = mockOrder("eu-company", "tickets")
    const config = mockConfig("single", "single-match")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  //
  test('HU company with workshops', async () => {
    const order = mockOrder("hu-company", "workshops-tickets")
    const config = mockConfig("workshop", "workshop")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('EU company with workshops', async () => {
    const order = mockOrder("eu-company", "workshops-tickets")
    const config = mockConfig("workshop", "workshop")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('HU company with workshops without catering', async () => {
    const order = mockOrder("hu-company", "workshops-tickets")
    const config = mockConfig("no-catering-workshop", "workshop")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

  test('EU company with workshops without catering', async () => {
    const order = mockOrder("eu-company", "workshops-tickets")
    const config = mockConfig("no-catering-workshop", "workshop")

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

})

