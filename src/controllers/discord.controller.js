const { request } = require('undici');
require('dotenv').config();

exports.authenticate = (req, res) => {
  res.writeHead(301, { Location: process.env.DISCORD_OAUTH_URL });
  res.end();
};

exports.callback = async ({ query }, res) => {
  if (!query.code || query.error) {
    return res.redirect(`${process.env.FRONTEND_URL}/login`);
  }

  const { code } = query;
  const tokenResponseData = await request(
    'https://discord.com/api/oauth2/token',
    {
      method: 'POST',
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.DISCORD_REDIRECT_URL,
        scope: 'identify,email',
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  const oauthData = await tokenResponseData.body.json();
  const userResult = await request('https://discord.com/api/users/@me', {
    headers: {
      authorization: `${oauthData.token_type} ${oauthData.access_token}`,
    },
  });
  const { email, id, username } = await userResult.body.json();

  res.redirect(
    `${process.env.FRONTEND_URL}/discord-auth-success?email=${email}&username=${username}&id=${id}`
  );
};
