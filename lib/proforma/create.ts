import szamlazz from '@jssc/szamlazz.js';
import getPartner from 'lib/partner';
import getSeller from 'lib/seller';
import getItems from 'lib/lineitem';
import invoiceComment from 'lib/invoice/comment';

export default async function create (
  order: any,
  config: any,
  Seller: any = szamlazz.Seller,
  Buyer: any = szamlazz.Buyer,
  Item: any = szamlazz.Item,
  Invoice: any = szamlazz.Invoice
) {
  const seller = getSeller(config);

  const partner = await getPartner(order.partner);
  const items = getItems(order.lineItems, partner, config);

  const currency = config.invoice.currency;
  const orderNumber = (Math.random() * 1000).toString(32).replace('.', '').toUpperCase();
  const invoiceIdPrefix = config.invoice['id-prefix'];
  const logoImage = config.invoice['logo-image'];
  const comment = invoiceComment(partner, items, false, config);
  const szamlazzItems = items.map(item => new Item(item));
  const { dueDays = 8 } = order.partner
  const dueDate = new Date(+new Date() + 1000 * 60 * 60 * 24 * dueDays);
  return new Invoice({
    paymentMethod: szamlazz.PaymentMethod.BankTransfer,
    currency: szamlazz.Currency[currency],
    language: szamlazz.Language.English,
    invoiceIdPrefix,
    logoImage,
    comment,
    dueDate,
    fulfillmentDate: dueDate,
    orderNumber,
    seller: new Seller(seller),
    buyer: new Buyer(partner),
    items: szamlazzItems,
    proforma: true,
    paid: false,
  });
}
