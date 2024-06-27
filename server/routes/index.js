const express = require("express");
const router = express.Router();

// different model routers
router.use('/holidays', require('./holiday'));
router.use('/holidayMakers', require('./holidayMaker'));

module.exports = router;
