import Boom from '@hapi/boom';

const { TITO_WEBHOOK_TOKEN } = process.env;

export default function validateRequest (req) {
  if (req.method !== 'POST' && req.method !== 'HEAD') {
    throw Boom.notFound();
  }

  const {
    query: {
      token,
    },
  } = req;

  if (!token || token !== TITO_WEBHOOK_TOKEN) {
    throw Boom.notFound();
  }
}
