export default (order) : string => {
  const {
    email,
    company_name,
    billing_address: {
      vat_number,
    },
  } = order;

  if (typeof vat_number !== 'undefined' && vat_number !== '0' && vat_number !== '') {
    return vat_number.replace(/[-_\s]/g, '').toUpperCase();
  } else if (typeof company_name !== 'undefined' && company_name !== '') {
    return company_name.replace(/[\s.]/g, '_').replace(/_+/g, '_').toUpperCase();
  }

  return email.replace(/[\s.@]/g, '_').replace(/_+/g, '_').toUpperCase();
};
