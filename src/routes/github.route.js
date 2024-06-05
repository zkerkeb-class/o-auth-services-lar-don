const express = require('express');
const router = express.Router();

const githubController = require('../controllers/github.controller');

router.get(
  '/callback',
  githubController.callback
);
router.get('/', githubController.authenticate);

module.exports = router;
