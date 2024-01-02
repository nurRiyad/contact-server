const express = require('express');
const contract = require('./Contract.route');

const router = express.Router();

router.use('/contract', contract);

module.exports = router;
