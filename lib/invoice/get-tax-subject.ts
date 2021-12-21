import szamlazz from '@jssc/szamlazz.js';
import countryCodes from 'lib/api/countrycodes';

export default (order) => {
  const {
    billing_address: {
      company_name,
      country: countryCode,
      vat_number,
    },
  } = order;

  if (!company_name && vat_number === '0') {
    return szamlazz.TaxSubject.NoTaxID;
  }

  if (company_name && countryCodes(countryCode).isHungarian()) {
    return szamlazz.TaxSubject.HungarianTaxID;
  }

  if (company_name && countryCodes(countryCode).isEuropean()) {
    return szamlazz.TaxSubject.EUCompany;
  }

  if (company_name) {
    return szamlazz.TaxSubject.NonEUCompany;
  }

  return szamlazz.TaxSubject.Unknown;
};
