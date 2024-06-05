const client = require('prom-client');

const register = client.register;

client.collectDefaultMetrics();

async function webMetrics(req, res) {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
}

module.exports = {
  webMetrics,
};
