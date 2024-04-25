import client from'prom-client';
const register = client.register;

client.collectDefaultMetrics();

export async function webMetrics(req, res) {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
}
