import mailgun from 'mailgun-js';

const {
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  ERROR_EMAIL_ADDRESS,
} = process.env;


export default (subject, text) => {
  const mailgunInstance = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });
  const data = {
    from: `TISZA proxy <${ERROR_EMAIL_ADDRESS}>`,
    to: ERROR_EMAIL_ADDRESS,
    subject,
    text,
  };

  mailgunInstance.messages().send(data, (error, body) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log(body);
  });
};
