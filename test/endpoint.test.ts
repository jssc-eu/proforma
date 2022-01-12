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
      slug: 'integration-test-event-2022',
    },
    slug: 'orderId',
    receipt: {
      payment_provider: 'creditcard',
    }
  }
}

jest.mock('body-parser', () => {
  return { raw: () => (req, res, fn) => {
    req.body = Buffer.from(JSON.stringify(req.body))
    fn()
  }}
});

const mocks = [
  jest.fn().mockResolvedValue({ json: () => (["order"])}),
  jest.fn(),
  jest.fn().mockResolvedValue('["invoice"]'),
  jest.fn().mockResolvedValue('sent')
]

beforeEach(async () => {
  resEnd.mockClear()
  resStatus.mockClear()
  mocks.forEach(mock => mock.mockClear())
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
      }
    })

    const rawBody = JSON.stringify(request.body)

    const eventsConfig = await readConfig();
    const eventConfig = eventsConfig.events['integration-test-event-2022'];

    const hmac = crypto
      .createHmac('sha256', eventConfig['tito-token'])
      .update(rawBody)
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
