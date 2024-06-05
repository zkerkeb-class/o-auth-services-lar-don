const express = require('express');
const router = express.Router();

const googleRouter = require('./google.route');
const discordRouter = require('./discord.route');
const githubRouter = require('./github.route');

router.use('/google', googleRouter);
router.use('/discord', discordRouter);
router.use('/github', githubRouter);

module.exports = router;
