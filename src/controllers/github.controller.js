const url = require('url');
require('dotenv').config();

exports.authenticate = (req, res) => {
  res.writeHead(301, { Location: process.env.DISCORD_OAUTH_URL });
  res.end();
};

exports.callback = async (req, res) => {
  let q = url.parse(req.url, true).query;
  const { tokens } = await oauth2Client.getToken(q.code);
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
    `${process.env.FRONTEND_URL}/discord-auth-success?email=${email}&username=${username}&id=${id}`
  );
};
