import React from 'react'

export const ProformaContext = React.createContext({
  company: {},
  setCompany: () => {},
  tickets: [],
  setTickets: () => {},
  lineItems: [],
  setLineItems: () => {},
});
