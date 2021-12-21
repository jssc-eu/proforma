export default (ticketName, prop, data) => {
  let resultObj = data.find(obj => ticketName.toLowerCase().includes(obj['ticket-name-contains'].toLowerCase()));

  if (typeof resultObj === 'undefined') {
    resultObj = data.find(obj => obj['ticket-name-contains'] === '*');
  }

  return resultObj[prop];
};
