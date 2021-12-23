import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  secret: process.env.AUTH0_SECRET,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  routes: {
    callback:
      process.env.AUTH0_REDIRECT_URI,
    postLogoutRedirect:
      process.env.AUTH0_LOGOUT_REDIRECT_URI,
  },
  authorizationParams: {
    response_type: 'code',
    scope: process.env.AUTH0_SCOPE,
  },
  session: {
    absoluteDuration: parseInt(process.env.SESSION_COOKIE_LIFETIME, 10),
  },
});
