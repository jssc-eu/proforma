import React from 'react'

export const ProformaContext = React.createContext({
  company: {},
  setCompany: (company: Object) => {},
  tickets: [],
  setTickets: (tickets: Array<Object>) => {},
  lineItems: [],
  setLineItems: (tickets: Array<Object>) => {},
  discount: 0,
  setDiscount: (discount: number) => {},
});
