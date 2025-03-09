var express = require('express');
var router = express.Router();
var authRoute = require('./auth.route')
/* GET users listing. */
router.use('/auth', authRoute);
module.exports = router;