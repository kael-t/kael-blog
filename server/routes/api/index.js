const express = require('express');
const router = express.Router();

router.use('/user', require('./user'))

router.use('/blogger', require('./blogger'))

module.exports = router