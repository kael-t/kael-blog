const express = require('express');
const router = express.Router();

router.use('/user', require('./user'))

router.use('/blogger', require('./blogger'))

router.use('/article', require('./article'))

module.exports = router