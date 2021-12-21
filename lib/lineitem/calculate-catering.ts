import getCateringPerTicket from './get-catering-per-ticket';

export default (data, eventConfig) => data.map((order) => {
  const catering = Object
    .values(order.quantities)
    .map((ticket: any) => getCateringPerTicket(ticket.release, eventConfig));
      return { ...order, catering };
    });
