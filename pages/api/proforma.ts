import authApi from 'lib/api/auth';
import readConfig from 'lib/api/read-config';
import createProforma from 'lib/proforma/create';
import createClient from 'lib/szamlazzhu/create-client';
import sendInvoice from 'lib/szamlazzhu/send-invoice';


export default async function callback(req, res) {
  try {
    await authApi(req, res, 'POST');

    const data = JSON.parse(req.body);
    const eventId = data.event.slug;

    const eventsConfig = await readConfig();
    const eventConfig = eventsConfig.events[eventId];

    if (typeof eventConfig == 'undefined') {
      res.status(400).end();
      return;
    }

    const proforma = await createProforma(data, eventConfig);

    if (process.env.NODE_ENV !== 'production') {
      console.log(proforma)

      res
        .setHeader('Content-Type', 'application/json')
        .status(200)
        .end('D-JSCBP-38');
      return;
    }

    const result = await sendInvoice(
      proforma,
      createClient(eventConfig, process.env.SZAMLAZZ_TOKEN)
    );
    res.status(200).end(result);
  } catch (e) {
    console.error(e);
    const err = e?.output?.payload || e.toString();
    res.status(err?.statusCode || 500).end(err?.error || 'Internal error occured');
  }
}
