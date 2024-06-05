const express = require('express');
const router = express.Router();

const googleController = require('../controllers/google.controller');

router.get(
  '/callback',
  googleController.callback
);
router.get('/', googleController.authenticate);

module.exports = router;
