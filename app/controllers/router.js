const express = require('express');
const path = require('path');
const router = express.Router();

// Router que nos lleva a corterRoute.

const corteRouter = require(path.join(__dirname, '../routes/', 'corteRoute.js'));
const employeesRouter = require(path.join(__dirname, '../routes/', 'employeesRoute.js'));

router.use('/corte', corteRouter);
router.use('/employees', employeesRouter);

module.exports = router;