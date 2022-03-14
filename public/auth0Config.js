const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.base_URL,
  clientID: process.env.client_ID,
  issuerBaseURL: process.env.issuer_BaseURL,
  secret: process.env.secretKey,
};

module.exports = {
  config,
};
