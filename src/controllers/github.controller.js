const { request } = require('undici');
require('dotenv').config();

exports.authenticate = (req, res) => {
  res.writeHead(301, { Location: process.env.GITHUB_OAUTH_URL });
  res.end();
};

exports.callback = async ({ query }, res) => {
  if (!query.code || query.error) {
    return res.redirect(`${process.env.FRONTEND_URL}/login`);
  }

  const { code } = query;
  const body = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
    redirect_uri: process.env.GITHUB_REDIRECT_URL,
    accept: 'json',
  }).toString();

  const tokenResponseData = await request(process.env.GITHUB_TOKEN_URL, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
  });
  const oauthData = await tokenResponseData.body.json();
  const params = {
    method: 'GET',
    headers: {
      'User-Agent': 'lardon-services',
      Authorization: `token ${oauthData.access_token}`,
    },
  };
  const userResult = await request(`${process.env.GITHUB_USER_URL}`, params);
  const emailsResult = await request(
    `${process.env.GITHUB_USER_URL}/emails`,
    params
  );
  const { id, login } = await userResult.body.json();
  const emails = await emailsResult.body.json();
  const primaryEmail = emails.find((e) => e.primary)?.email || emails[0].email;

  res.redirect(
    `${process.env.FRONTEND_URL}/github-auth-success?email=${primaryEmail}&username=${login}&id=${id}`
  );
};
