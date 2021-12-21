import sendMail from 'lib/api/send-mail';
import createErrorMessage from 'lib/api/create-error-email';

export default async (message, error, request = null) => {
  console.log(error);

  if (process.env.NODE_ENV !== 'production') return;

  await sendMail(
    message,
    request ? createErrorMessage(request.body, error) : error
  );
};
