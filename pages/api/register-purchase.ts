
import validateRequest from 'lib/api/validate/request'
import validatePayload from 'lib/api/validate/payload'
import readConfig from 'lib/api/read-config'

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
    const eventsConfig = await readConfig();

    const order = await getTitoOrder(req.body, process.env.TITO_API_TOKEN);
    const invoice = await createInvoice(order, eventsConfig.events);

    if (process.env.NODE_ENV !== 'production') {
      res.status(200).end(JSON.stringify(invoice));
      return
    }

    const result = await sendInvoice(
      invoice,
      createClient(eventsConfig.events, process.env.SZAMLAZZ_TOKEN)
    );
    res.status(200).end(result);
  } catch (e) {
    const err = e.output.payload
    res.status(err.statusCode).end(err.error)
  }
}
