process.env.TITO_WEBHOOK_TOKEN = 'abcd1234';

import validateRequest from './request';

describe('request validation', () => {
  afterAll(() => {
    process.env.TITO_WEBHOOK_TOKEN = null;
    delete process.env.TITO_WEBHOOK_TOKEN;
  });

  test('reject request methods', () => {
    expect(() => {
      validateRequest({ method: 'GET', query: {} });
    }).toThrow('Not Found');
    expect(() => {
      validateRequest({ method: 'PUT', query: {} });
    }).toThrow('Not Found');
  });

  test('validate missing token', () => {
    expect(() => {
      validateRequest({ query: {} });
    }).toThrow('Not Found');
  });

  test('validate wrong token', () => {
    expect(() => {
      validateRequest({ query: { token: 'asd' } });
    }).toThrow('Not Found');
  });

  test('validate proper token', () => {
    expect(() => {
      validateRequest({ method: 'POST', query: { token: 'abcd1234' } });
    }).not.toThrow();
  });
});
