

import getPropertyByTicketType from './get-property-by-ticket-type';

const data = [
  {
    'ticket-name-contains': '*',
    'net-price': 90,
  },
  {
    'ticket-name-contains': 'Double',
    'net-price': 180,
  },
  {
    'ticket-name-contains': 'Online',
    'net-price': 0,
  },
];

describe('get-property-by-ticket-type', () => {
  test('get any', () => {
    const ticketName = 'Early Bird';
    const prop = 'net-price';

    const result = getPropertyByTicketType(ticketName, prop, data);
    expect(result).toBe(90);
  });

  test('get match', () => {
    const ticketName = 'Double Bird';
    const prop = 'net-price';

    const result = getPropertyByTicketType(ticketName, prop, data);
    expect(result).toBe(180);
  });

  test('get zero', () => {
    const ticketName = 'Admission Online Bird';
    const prop = 'net-price';

    const result = getPropertyByTicketType(ticketName, prop, data);
    expect(result).toBe(0);
  });

  test('case insensitive', () => {
    const ticketName = 'double bird';
    const prop = 'net-price';

    const result = getPropertyByTicketType(ticketName, prop, data);
    expect(result).toBe(180);
  });
});
