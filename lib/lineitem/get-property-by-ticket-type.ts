export default function getPropByType(ticketName: string, prop: string, data: object[]) {
  let resultObj = data.find(obj => ticketName.toLowerCase().includes(obj['ticket-name-contains'].toLowerCase()));

  if (typeof resultObj === 'undefined') {
    resultObj = data.find(obj => obj['ticket-name-contains'] === '*');
  }

  return resultObj[prop];
};
