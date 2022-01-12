import bodyParser from 'body-parser';
import validateRequest from 'lib/api/validate/request';
import validatePayload from 'lib/api/validate/payload';
import readConfig from 'lib/api/read-config';
import { order as getOrder } from 'lib/tito';
import attachTitoReleaseMetaData from 'lib/tito/attach-release-metadata';
import invoice from 'lib/invoice/create';
import createClient from 'lib/szamlazzhu/create-client';
import sendInvoice from 'lib/szamlazzhu/send-invoice';


export function runMiddleware(req, res, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: Object) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
};


export default async function callback(
  req,
  res,
  getTitoOrder = getOrder,
  addMetadata = attachTitoReleaseMetaData,
  createInvoice = invoice,
  send = sendInvoice
) {
  try {
    // set up rawBody as Buffer, for payload validation
    await runMiddleware(req, res, bodyParser.raw({ type: 'application/json' }))
    req.rawBody = req.body;
    req.body = JSON.parse(req.body.toString());

    if (process.env.DEBUG) {
      console.log({
        url: req.url,
        method: req.method,
        query: req.query,
        body: req.rawBody.toString(),
        headers: req.headers,
      })
    }

    validateRequest(req);

    if (req.method === 'HEAD') {
      res.status(200).end('ok');
      return;
    }

    const {
      receipt: {
        payment_provider,
      },
    } = req.body;

    if (!payment_provider) {
      res.status(200).end('No payment, no invoice');
      return;
    }

    const registrationData = req.body;
    const {
      event: {
        account_slug: accountId,
        slug: eventId,
      },
      slug: orderId,
    } = registrationData;

    const eventsConfig = await readConfig();
    const eventConfig = eventsConfig.events[eventId];

    if (typeof eventConfig == 'undefined') {
      res.status(400).end();
      return;
    }

    validatePayload(req, eventConfig);

    const rawOrder = await getTitoOrder(accountId, eventId, orderId);
    const orderData = await rawOrder.json()
    const order = addMetadata(registrationData, orderData);
    const invoice = await createInvoice(order, eventConfig);

    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
      res.status(200).end(JSON.stringify(invoice));
      return;
    }

    const result = await send(
      invoice,
      createClient(eventConfig, process.env.SZAMLAZZ_TOKEN)
    );
    res.status(200).end(result);
  } catch (e) {
    console.log(e)

    const err = e?.output?.payload || { statusCode: 404, error: 'Not found'};
    res.status(err.statusCode).end(err.error);
  }
}
