import { RawPartner } from 'lib/types';

export default function getPartnerFromOrder(order): RawPartner {
  const {
    reference = '',
    name = '',
    email = '',
    company_name: companyName = '',
    billing_address: {
      vat_number: taxNumber,
      address,
      city,
      zip_postal_code: zip = '',
      country: countryCode,
      state_province_region: state = '',
    },
  } = order;

  return {
    reference,
    taxNumber,
    name,
    email,
    companyName,
    address,
    city,
    zip,
    countryCode,
    state,
  };
}
