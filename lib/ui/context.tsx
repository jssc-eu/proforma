import React from 'react';

export const ProformaContext = React.createContext({
  event: {},
  setEvent: (d) => {},
  company: {},
  setCompany: (d) => {},
  tickets: [],
  setTickets: (d) => {},
  lineItems: [],
  setLineItems: (d) => {},
  discount: 0,
  setDiscount: (d) => {},
});
