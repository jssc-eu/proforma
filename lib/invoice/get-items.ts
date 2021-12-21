import { roundTo } from 'round-to';
import { Partner, Item, VatRate } from 'lib/types';
import getCateringPerTicket from 'lib/invoice/get-catering-per-ticket';
import getPropertyByTicketType from 'lib/invoice/get-property-by-ticket-type';

const getDate = (ticket, config) => {
  if (typeof config.dates === 'undefined') return config.date;

  return getPropertyByTicketType(ticket, 'date', config.dates);
};

const getVatRateField = (buyer, isOnlineService) => {
  if (isOnlineService && buyer.isTEHK) {
    return VatRate.TEHK
  }

  return VatRate.Regular
}

export default (order, buyer: Partner, eventConfig) => order.line_items.reduce((items, ticket) => {
    const {
      price,
      quantity,
      release_title: title,
      release = {}
    } = ticket;

    if (price === 0) {
      return items;
    }

    const {
      metadata: release_metadata = {}
    } = release;

    const onlineService = release_metadata?.['online-service'] ?? false;

    const vatRate = getVatRateField(buyer, onlineService);
    const date = getDate(title, eventConfig);
    const cateringPartial = getCateringPerTicket(title, eventConfig);
    const ticketPartial = roundTo(price - (cateringPartial * 1.27), 2);

    const item: Item = {
      label: title,
      quantity,
      unit: 'qt',
      vat: vatRate,
      comment: `Ticket for ${eventConfig.label}, ${date}`,
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
