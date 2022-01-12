import Boom from '@hapi/boom';

export async function sendTitoRequest (url: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Token token=${process.env.TITO_API_TOKEN}`,
      Accept: `application/json`,
    },
  });

  if (res.status !== 200) {
    console.error(`
    An error occured with Tito:
    ${url}
    ${await res.text()}
    `);
    throw Boom.notFound();
  }

  return res;
}

export async function accounts () {
  return sendTitoRequest('https://api.tito.io/v3/hello');
}

export async function events (accountId) {
  return sendTitoRequest(`https://api.tito.io/v3/${accountId}/events`);
}

export async function tickets(accountId, eventId) {
  return sendTitoRequest(`https://api.tito.io/v3/${accountId}/${eventId}/releases`);
}

export async function order(accountId, eventId, orderId) {
  return sendTitoRequest(`https://api.tito.io/v3/${accountId}/${eventId}/registrations/${orderId}?view=extended`);
}
