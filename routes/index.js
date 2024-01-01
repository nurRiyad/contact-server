const express = require('express');
const contract = require('./Contract.route');
const { getAllContracts } = require('../controllers/contracts');

const router = express.Router();

router.get('/contracts', getAllContracts);
router.use('/contract', contract);

module.exports = router;
