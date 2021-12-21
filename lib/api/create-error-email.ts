import yaml from 'yaml';
import dedent from 'dedent';

const safeLog = (error) => {
  const message = yaml.stringify(JSON.parse(JSON.stringify(error)));
  return message.replace(/token=.*$/gm, 'REDACTED');
};

export default (body, error) => {
  const message = dedent`
    API call error: ${error.isAxiosError}
    Error: ${error.message}

    Webhook logs:
    https://api.tito.io/${body.event.account_slug}/${body.event.slug}/webhooks

    Event: ${body.event.slug}
    Reference: ${body.reference}
    Created at: ${body.created_at}

    Billing info:
     - ${body.billing_address.company_name}
     - ${body.billing_address.vat_number}
     - ${body.billing_address.address}
     - ${body.billing_address.city}
     - ${body.billing_address.country_name}

    Total: ${body.total}

    -------------------------------------------------------------

    Complete error log:

    ${safeLog(error)}
  `;

  return message;
};
