process.env.TITO_TOKEN_RF = 'abcd1234';

import validateTitoPayload from './payload';
import crypto from 'crypto';

const payloadEvent = { foo: 'bar', event: { slug: 'reinforce2020' } };

describe('tito payload validation', () => {
  test('validate event payload with hash mismatch', () => {
    expect(() => {
      validateTitoPayload({
        headers: { 'tito-signature': 'foo' },
        body: payloadEvent,
        rawBody: JSON.stringify(payloadEvent),
      },
      {
        'tito-token': process.env.TITO_TOKEN_RF,
      });
    }).toThrow('Not Acceptable');
  });


  test('validate event payload with proper hash', () => {
    const hmac = crypto
      .createHmac('sha256', process.env.TITO_TOKEN_RF)
      .update(JSON.stringify(payloadEvent))
      .digest('base64');

    expect(() => {
      validateTitoPayload({
        headers: { 'tito-signature': hmac },
        body: payloadEvent,
        rawBody: JSON.stringify(payloadEvent),
      },
      {
        'tito-token': process.env.TITO_TOKEN_RF,
      });
    }).not.toThrow('Not Acceptable');
  });
});
