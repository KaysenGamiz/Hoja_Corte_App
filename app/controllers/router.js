const express = require('express');
const path = require('path');
const router = express.Router();

// Router que nos lleva a corterRoute.

const corteRouter = require(path.join(__dirname, '../routes/', 'corteRoute.js'));
const employeesRouter = require(path.join(__dirname, '../routes/', 'employeesRoute.js'));
const adminRouter = require(path.join(__dirname, '../routes/', 'adminRoute.js'));

router.use('/corte', corteRouter);
router.use('/employees', employeesRouter);
router.use('/admin-routes', adminRouter);

module.exports = router;