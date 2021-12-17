import authApi from 'lib/authApi';
import { events as titoEvents } from 'lib/tito'

export default async function callback(req, res) {
  try {
    await authApi(req, res)

    const { accountId } = req.query
    const eventsReq = await titoEvents(accountId)

    const data = await eventsReq.json()
    const response = data.events.reduce((obj, d) => {
      return Object.assign(obj, {
        [d.slug]: d.title
      })
    }, {})

    res
      .status(200)
      .end(JSON.stringify(response))
  } catch (e) {
    const err = e.output.payload
    res
      .status(err.statusCode)
      .end(err.error)
  }
}
