import { roundTo } from 'round-to';
import { Partner, RawItem, Item, VatRate } from 'lib/types';
import getCateringPerTicket from 'lib/lineitem/get-catering-per-ticket';
import getPropertyByTicketType from 'lib/lineitem/get-property-by-ticket-type';

const getDate = (ticket, config) => {
  if (typeof config.dates === 'undefined') return config.date;

  return getPropertyByTicketType(ticket, 'date', config.dates);
};

const getVatRateField = (buyer, isOnlineService) => {
  if (isOnlineService && buyer.isTEHK) {
    return VatRate.TEHK;
  }

  return VatRate.Regular;
};

export default (rawItems: RawItem[], buyer: Partner, eventConfig) => rawItems.reduce((items, ticket) => {
    const {
      price,
      quantity,
      title,
      isOnlineService,
      discount = 0,
    } = ticket;

    if (price === 0) {
      return items;
    }

    const vatRate = getVatRateField(buyer, isOnlineService);
    const date = getDate(title, eventConfig);
    const cateringPartial = getCateringPerTicket(title, eventConfig);
    const ticketPartial = roundTo(price - (cateringPartial * 1.27), 2);

    const discountComment = (discount != 0) ? ` ${discount}% discount included.` : ``;

    const item: Item = {
      label: title,
      quantity,
      unit: 'qt',
      vat: vatRate,
      comment: `Ticket for ${eventConfig.label}, ${date}.${discountComment}`,
    };

    if (vatRate === VatRate.TEHK) {
      item.netUnitPrice = ticketPartial;
      item.grossValue = item.netValue = (ticketPartial * quantity);
    } else {
      item.grossUnitPrice = ticketPartial; // calculates gross and net values from per item net
    }

		items.push(item);

    if (cateringPartial !== 0) {
      const cateringItem: Item = {
        label: 'Mediated services',
        comment: 'Conference catering fee',
        quantity,
        unit: 'qt',
        vat: vatRate,
      };

      if (vatRate === VatRate.TEHK) {
        cateringItem.netUnitPrice = roundTo(cateringPartial * 1.27, 2);
        cateringItem.grossValue = cateringItem.netValue = (roundTo(cateringPartial * 1.27, 2) * quantity);
      } else {
        cateringItem.grossUnitPrice = roundTo(cateringPartial * 1.27, 2); // calculates gross and net values from per item net
      }

      items.push(cateringItem);
    }

    return items;
  }, []);
