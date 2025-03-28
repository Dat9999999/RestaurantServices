var express = require('express');
var router = express.Router();
var authRoute = require('./auth.route')
var tablesRoute = require('./table.route')
var dishesRoute = require('./dishes.route')
var orderRoute = require('./orders.route')
var invoicesRoute = require('./invoices.route')


/* GET users listing. */
router.use('/auth', authRoute);
router.use('/tables', tablesRoute);
router.use('/dishes', dishesRoute);
router.use('/orders', orderRoute);
router.use('/invoices', invoicesRoute);

module.exports = router;