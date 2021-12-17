import Boom from '@hapi/boom'
import auth0 from 'lib/auth0'

export default async function (req, res) {

  if (req.method !== 'GET') {
    throw Boom.notFound();
  }

  const session = await auth0.getSession(req, res)
  if (!session || !session.user) {
    throw Boom.notFound();
  }
}
