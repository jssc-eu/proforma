import crypto from 'crypto';
import Boom from '@hapi/boom';

export default function validatePayload (request, eventConfig) {
  const signature = request.headers['tito-signature'];

  const hmac = crypto
    .createHmac('sha256', eventConfig['tito-token'])
    .update(request.rawBody)
    .digest('base64');

  if (signature !== hmac) {
    console.error(`Tito signature STILL CANNOT BE VERIFIED "${signature}"`);
    console.error('hmac', hmac);
    console.error('raw body', request.rawBody);
    throw Boom.notAcceptable();
  }
};
