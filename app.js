const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { webMetrics } = require('./webMetrics.js');
const oauthRouter = require('./src/routes/index.js');

const app = express();

app.use(cors());

app.use('/auth', oauthRouter);
app.get('/metrics', webMetrics);

const PORT = process.env.PORT;
app.listen(PORT, () => console.info(`[O AUTH] Server running on port ${PORT}`));
