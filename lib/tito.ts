import Boom from '@hapi/boom'

export async function sendTitoRequest (url: string) {
  const res = await fetch(
    url, {
    headers: {
      Authorization: `Token token=${process.env.TITO_TOKEN}`,
      Accept: `application/json`
    }
  })

  if (res.status !== 200) {
    throw new Boom.Boom("An error occured with Tito", {
      statusCode: res.status
    })
  }

  return res
}

export async function accounts () {
  return sendTitoRequest('https://api.tito.io/v3/hello')
}

export async function events (accountId) {
  return sendTitoRequest(`https://api.tito.io/v3/${accountId}/events`)
}

export async function tickets(accountId, eventId) {
  return sendTitoRequest(`https://api.tito.io/v3/${accountId}/${eventId}/releases`)
}
