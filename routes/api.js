var express = require('express');
var router = express.Router();
var authRoute = require('./auth.route')
var tablesRoute = require('./table.route')
var dishesRoute = require('./dishes.route')
/* GET users listing. */
router.use('/auth', authRoute);
router.use('/tables', tablesRoute);
router.use('/dishes', dishesRoute);

module.exports = router;