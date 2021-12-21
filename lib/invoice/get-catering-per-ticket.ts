import getPropertyByTicketType from './get-property-by-ticket-type';

export default (ticketName, eventConfig) => {
  if (typeof eventConfig.catering === 'undefined') return 0;

  return getPropertyByTicketType(ticketName, 'net-price', eventConfig.catering);
};
