import { accounts as titoAccounts } from 'lib/tito';
import authApi from 'lib/api/auth';

export default async function callback(req, res) {
  try {
    await authApi(req, res);

    const accountsReq = await titoAccounts();

    const data = await accountsReq.json();
    res.status(200).end(JSON.stringify(data.accounts));
  } catch (e) {
    const err = e.output.payload;
    res.status(err.statusCode).end(err.error);
  }
}
