const express = require('express');
const path = require('path');
const router = express.Router();

// Router que nos lleva a corterRoute.

const corteRouter = require(path.join(__dirname, '../routes/', 'corteRoute.js'));

router.use('/corte', corteRouter);

module.exports = router;