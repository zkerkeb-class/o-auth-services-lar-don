const express = require('express');
const router = express.Router();

const discordController = require('../controllers/discord.controller');

router.get(
  '/callback',
  discordController.callback
);
router.get('/', discordController.authenticate);

module.exports = router;
