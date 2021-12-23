import { RawItem } from 'lib/types';

const getOnlineService = (release) => {
  if (release && release.metadata) {
    return release.metadata['online-service'] ?? false;
  }

  return false;
};

export default function getPartnerFromOrder(order): RawItem[] {
  const {
    line_items,
  } = order;

  return line_items.map(item => ({
    price: item.price,
    quantity: item.quantity,
    title: item.release_title,
    isOnlineService: getOnlineService(item.release),
  }));
}
