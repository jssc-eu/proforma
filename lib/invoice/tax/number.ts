import { RawPartner } from 'lib/types';

export default function getTaxNumber (raw: Partial<RawPartner>) {
  const {
    taxNumber,
  } = raw;

  if (typeof taxNumber === 'undefined') {
    return '';
  }

  if (taxNumber !== '0') {
    return taxNumber;
  }

  return '';
};
