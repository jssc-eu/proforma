const configTemplate = require('./config-tpl')
const deepClone = data => JSON.parse(JSON.stringify(data));

const cateringTypes = {
  ["single"]: [
    {
      'ticket-name-contains': 'online',
      'net-price': 0,
    },
    {
      'ticket-name-contains': '*',
      'net-price': 90.3,
    },
  ],
  ["workshop"]: [
    {
      'ticket-name-contains': '*',
      'net-price': 90.3,
    },
    {
      'ticket-name-contains': 'Workshop',
      'net-price': 20,
    },
  ],
  ["no-catering-workshop"]: [
    {
      'ticket-name-contains': '*',
      'net-price': 90.3,
    },
    {
      'ticket-name-contains': 'Workshop',
      'net-price': 0,
    },
  ],
}

const dateTypes = {
  ["single"]: "September 23, 2020",
  ["single-match"]: [
    {
      'ticket-name-contains': '*',
      date: 'September 23, 2020',
    },
  ],
  ["workshop"]: [
    {
      'ticket-name-contains': 'Workshop',
      date: 'April 8, 2020',
    },
    {
      'ticket-name-contains': '*',
      date: 'April 6-7, 2020',
    },
  ],
}


module.exports = (cateringType, dateType) => {
  if (!cateringTypes[cateringType] || !dateTypes[dateType]) throw Error(`No mock data for ${cateringType} and ${dateType}`);

  const config = deepClone(configTemplate)

  config.catering = deepClone(cateringTypes[cateringType])
  if (dateTypes[dateType] instanceof Array) {
    config.dates = deepClone(dateTypes[dateType])
  } else {
    config.date = deepClone(dateTypes[dateType])
  }

  return config
}
