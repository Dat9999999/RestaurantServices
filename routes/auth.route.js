var express = require('express');
var authController = require('../controllers/auth.controllers')
var router = express.Router();
/* GET users listing. */
router.use('/login', authController.login);
module.exports = router;