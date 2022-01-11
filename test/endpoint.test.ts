import MockDate from 'mockdate'
import crypto from 'crypto'
import readConfig from 'lib/api/read-config';
import handler from 'pages/api/register-purchase'

const { TITO_WEBHOOK_TOKEN } = process.env;

const resEnd = jest.fn()
const resStatus = jest.fn()
resStatus.mockReturnValue({ end: resEnd })

const res = {
  status: resStatus
}
const req = {
  method: 'POST',
  headers: {},
  query: {
    token: TITO_WEBHOOK_TOKEN
  },
  body: {
    event: {
      account_slug: 'accountId',
      slug: 'integration-test-event-2020',
    },
    slug: 'orderId',
    receipt: {
      payment_provider: 'creditcard',
    }
  }
}

const mocks = [
  jest.fn().mockResolvedValue('order'),
  jest.fn(),
  jest.fn().mockResolvedValue('invoice'),
  jest.fn().mockResolvedValue('sent'),
]

beforeEach(async () => {
  MockDate.set('2020-11-22')
  resEnd.mockClear()
  resStatus.mockClear()

  mocks.forEach(mock => mock.mockClear())
});

afterEach(() => {
  MockDate.reset();

});

describe('register-purchase', () => {

  test('proper POST should be ok', async () => {
    const request = Object.assign({}, req, {
      method: 'POST',
      headers: {
        'tito-signature': ''
      },
      query: {
        token: TITO_WEBHOOK_TOKEN
      },
      rawBody: ''
    })



    request.rawBody = JSON.stringify(request.body)

    const eventsConfig = await readConfig();
    const eventConfig = eventsConfig.events['integration-test-event-2020'];

    const hmac = crypto
      .createHmac('sha256', eventConfig['tito-token'])
      .update(request.rawBody)
      .digest('base64');

    request.headers['tito-signature'] = hmac




    await handler(request, res, ...mocks)
    expect(resStatus).toBeCalledWith(200)
    expect(resEnd).toBeCalledWith('sent')
  })

  test('proper HEAD should be ok', async () => {
    const request = Object.assign({}, req, {
      method: 'HEAD',
    })
    await handler(request, res, ...mocks)
    expect(resStatus).toBeCalledWith(200)
    expect(resEnd).toBeCalledWith('ok')
  })

})
