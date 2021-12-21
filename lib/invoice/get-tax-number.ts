export default function getTaxNumber (order) {
  const {
    billing_address: {
      vat_number,
    },
  } = order;

  if (typeof vat_number === 'undefined') {
    return '';
  }

  if (vat_number !== '0') {
    return vat_number;
  }

  return '';
};
