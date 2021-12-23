import szamlazz from '@jssc/szamlazz.js';
import { RawPartner } from 'lib/types';
import countryCodes from 'lib/countrycodes';

export default function getTaxSubject(raw: Partial<RawPartner>):szamlazz.TaxSubject {
  const {
    companyName,
    countryCode,
    taxNumber,
  } = raw;

  if (companyName === '' && taxNumber === '0') {
    return szamlazz.TaxSubject.NoTaxID;
  }

  if (companyName && countryCodes(countryCode).isHungarian()) {
    return szamlazz.TaxSubject.HungarianTaxID;
  }

  if (companyName && countryCodes(countryCode).isEuropean()) {
    return szamlazz.TaxSubject.EUCompany;
  }

  if (companyName) {
    return szamlazz.TaxSubject.NonEUCompany;
  }

  return szamlazz.TaxSubject.Unknown;
};
