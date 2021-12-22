
import validateRequest from 'lib/api/validate/request'
import validatePayload from 'lib/api/validate/payload'
import readConfig from 'lib/api/read-config'
import { order as getOrder } from 'lib/tito'
import attachReleaseMetaData from 'lib/tito/attach-release-metadata'
import createInvoice from 'lib/invoice/create'
import createClient from 'lib/szamlazzhu/create-client'
import sendInvoice from 'lib/szamlazzhu/send-invoice'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '3mb',
    },
  },
}

export default async function callback(req, res) {
  try {
    validateRequest(req)

    if (req.method === 'HEAD') {
      res.status(200).end('ok')
      return
    }

    validatePayload(req)

    const {
      receipt: {
        payment_provider,
      },
    } = req.body;

    if (!payment_provider) {
      res.status(200).end('No payment, no invoice')
      return;
    }

    const registrationData = req.body
    const {
      event: {
        account_slug: accountId,
        slug: eventId,
      },
      slug: orderId,
    } = registrationData;

    const eventsConfig = await readConfig();
    const eventConfig = eventsConfig.events[eventId]

    if (typeof eventConfig == 'undefined') {
      res.status(400).end();
      return;
    }

    const rawOrder = await getOrder(accountId, eventId, orderId);
    const order = attachReleaseMetaData(registrationData, rawOrder)
    const invoice = await createInvoice(order, eventConfig);

    if (process.env.NODE_ENV !== 'production') {
      res.status(200).end(JSON.stringify(invoice));
      return
    }

    const result = await sendInvoice(
      invoice,
      createClient(eventConfig, process.env.SZAMLAZZ_TOKEN)
    );
    res.status(200).end(result);
  } catch (e) {
    const err = e.output.payload
    res.status(err.statusCode).end(err.error)
  }
}
