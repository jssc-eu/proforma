import authApi from 'lib/api/auth';
import { tickets as titoTickets } from 'lib/tito';

export default async function callback(req, res) {
  try {
    await authApi(req, res);

    const { accountId, eventId } = req.query;
    const ticketsReq = await titoTickets(accountId, eventId);

    const data = await ticketsReq.json();
    const response = data.releases
      .filter(d => (!d.secret && !d.sold_out && !d.off_sale))
      .map(d => ({
          title: d.title,
          price: d.price,
        }), {});

    res.status(200).end(JSON.stringify(response));
  } catch (e) {
    const err = e.output.payload;
    res.status(err.statusCode).end(err.error);
  }
}
