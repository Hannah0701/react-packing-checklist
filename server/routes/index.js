const express = require("express");
const router = express.Router();

// different model routers
router.use('/holidays', require('./holidays'));
router.use('/holidayMakers', require('./holidayMakers'));

module.exports = router;
