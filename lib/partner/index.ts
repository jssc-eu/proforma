import { Partner, RawPartner } from 'lib/types';
import getTaxSubject from 'lib/tax/subject';
import getTaxNumber from 'lib/tax/number';
import getPartnerIdentifier from 'lib/partner/get-identifier';
import countryCodes from 'lib/countrycodes';
import checkVIES from 'lib/api/check-vies';
import sendMail from 'lib/api/send-mail';

export default async function getPartner(raw: RawPartner): Promise<Partner> {
  const {
    reference,
    name,
    email = '',
    companyName,
    address,
    city,
    zip = '',
    countryCode,
    state = '',
  } = raw;

  const identifier = getPartnerIdentifier(raw);
  const taxNumber = getTaxNumber(raw);
  const isEU = countryCodes(countryCode).isEuropean();

  const buyerName = companyName || name;
  const addressWithState = `${address.replace(/[\r]?\n/g, ' ')} ${state}`;
  let isTEHK = false;

  if (companyName && taxNumber && isEU) {
    isTEHK = true;
    try {
      isTEHK = await checkVIES(countryCode, taxNumber);
    } catch (e) {
      sendMail(`VIES check failed for ${reference}`, `The VIES status for order ${reference} could not be validated: ${e.message}. Make sure the invoice is correct.`);

      console.warn('VIES check failed');
      console.warn(e);
    }
  }

  const data : Partner = {
    name: buyerName,
    email,
    sendEmail: (email != '') ? true : false,
    country: countryCode,
    taxNumber,
    taxSubject: getTaxSubject(raw),
    zip,
    city,
    address: addressWithState,
    postAddress: {
      name: buyerName,
      zip,
      city,
      address: addressWithState,
    },
    identifier,
    phone: '',
    issuerName: name,
    isTEHK,
  };

  return data;
};
