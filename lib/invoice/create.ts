import yaml from 'yaml';
import szamlazz from '@jssc/szamlazz.js';
import getPartnerFromOrder from 'lib/tito/partner-from-order';
import getItemsFromOrder from 'lib/tito/items-from-order';
import getPartner from 'lib/partner';
import getSeller from 'lib/seller';
import getItems from 'lib/lineitem';
import getPaymentMethod from './get-payment-method';
import getTaxComment from 'lib/tax/comment';

export default async function create (
  order: any,
  config: any,
  Seller: any = szamlazz.Seller,
  Buyer: any = szamlazz.Buyer,
  Item: any = szamlazz.Item,
  Invoice: any = szamlazz.Invoice
) {
  const seller = getSeller(config);
  const rawPartner = getPartnerFromOrder(order);
  const partner = await getPartner(rawPartner);
  const rawItems = getItemsFromOrder(order);
  const items = getItems(rawItems, partner, config);

  if (process.env.DEBUG) {
    console.warn(yaml.stringify(order));
  }

  const currency = config.invoice.currency;
  const orderNumber = order.reference;
  const invoiceIdPrefix = config.invoice['id-prefix'];
  const logoImage = config.invoice['logo-image'];
  const comment = getTaxComment(partner, items) + '\n' + config.invoice.comment;

  const szamlazzItems = items.map(item => new Item(item));
  return new Invoice({
    paymentMethod: getPaymentMethod(order),
    currency: szamlazz.Currency[currency],
    language: szamlazz.Language.English,
    invoiceIdPrefix,
    logoImage,
    comment,
    orderNumber,
    seller: new Seller(seller),
    buyer: new Buyer(partner),
    items: szamlazzItems,
    paid: true,
  });
};
