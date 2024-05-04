const { google } = require('googleapis');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

exports.authenticate = (req, res) => {
  const authorizationUrl = oauth2Client.generateAuthUrl({
    scope: ['profile', 'email'],
  });

  res.writeHead(301, { Location: authorizationUrl });
  res.end();
};

exports.callback = async ({ query }, res) => {
  if (!query.code || query.error) {
    return res.redirect(`${process.env.FRONTEND_URL}/login`);
  }

  const { tokens } = await oauth2Client.getToken(query.code);
  oauth2Client.setCredentials(tokens);
  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2',
  });

  const { data } = await oauth2.userinfo.get();
  const username = data.name;
  const email = data.email;
  const id = data.id;

  res.redirect(
    `${process.env.FRONTEND_URL}/google-auth-success?email=${email}&username=${username}&id=${id}`
  );
};
