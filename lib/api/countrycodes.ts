const EUCountryCodes = [
  'BE',
  'BG',
  'CZ',
  'DK',
  'DE',
  'EE',
  'IE',
  'EL',
  'GR',
  'ES',
  'FR',
  'HR',
  'IT',
  'CY',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'AT',
  'PL',
  'PT',
  'RO',
  'SI',
  'SK',
  'FI',
  'SE',
  'UK',
];

export interface CountryCode {
  isHungarian(): boolean;
  isEuropean(): boolean;
}

export default (countryCode: string): CountryCode => ({
    isHungarian: () => countryCode === 'HU',
    isEuropean: () => EUCountryCodes.includes(countryCode),
  });
