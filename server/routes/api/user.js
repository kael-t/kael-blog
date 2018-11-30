const express = require('express');
const router = express.Router();
const user = require('../../controllers').UserController;

router
  .get('/login', user.githubLogin)
  .get('/callback', user.callback)

module.exports = router